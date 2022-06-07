<template>
  <div class="admin-homes">
    <div id="addHome" class="app-section">
      <div class="app-wrapper">
        <div class="split">
          <div class="property-title">Add a Home</div>
          <div class="property-location">
            Want to be a host? Add your home today
          </div>
        </div>
      </div>
    </div>
    <div class="app-section images">
      <div class="app-wrapper">
        <div class="app-masonry">
          <div
            v-for="(image, index) in home.images"
            :key="index"
            class="individual-image"
            :style="`background-image: url(${image})`"
          >
            <img
              src="/images/upload-image.svg"
              v-if="!image"
              class="upload-image"
            />
            <div class="upload-input">
              <ImageUploader @file-uploaded="imageUpdated($event, index)" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="app-section">
      <div class="app-wrapper">
        <form @submit.prevent="onSubmit">
          <div class="form">
            <div class="left-form">
              <input
                v-model="home.title"
                required
                type="text"
                placeholder="Title"
              />
              <textarea
                v-model="home.description"
                type="text"
                placeholder="Description"
                required
              ></textarea>
              <input
                type="text"
                ref="locationSelector"
                autocomplete="off"
                placeholder="Select a location"
                @changed="changed"
              />
              <input
                v-model="home.location.address"
                type="text"
                placeholder="Address"
                required
              />
              <div class="double-input">
                <input
                  v-model="home.location.city"
                  type="text"
                  placeholder="City"
                  required
                />
                <input
                  v-model="home.location.state"
                  type="text"
                  placeholder="State"
                  required
                />

                <input
                  v-model="home.location.postalCode"
                  type="number"
                  placeholder="Postal Code"
                />
                <input
                  v-model="home.location.country"
                  type="text"
                  placeholder="Country"
                  required
                />
              </div>

              <div class="quad-input">
                <input
                  v-model="home.guests"
                  type="number"
                  placeholder="Guests"
                  required
                />
                <input
                  v-model="home.bedrooms"
                  type="number"
                  placeholder="Rooms"
                  required
                />

                <input
                  v-model="home.beds"
                  type="number"
                  placeholder="Beds"
                  required
                />
                <input
                  v-model="home.bathrooms"
                  type="number"
                  placeholder="Baths"
                  required
                />
              </div>
            </div>
            <div class="right-form">
              <div class="feature-title">Features</div>
              <div class="feature-description">
                Select features that apply to your home
              </div>

              <div class="features">
                <span
                  class="feat"
                  v-for="feature in feature_list"
                  :key="feature"
                  @click="toggleFeature(feature)"
                  >{{ feature }}</span
                >
              </div>
              <div>
                <date-picker
                  v-for="(range, index) in home.availabilityRanges"
                  :key="index"
                  :popover="{ placement: 'bottom', visibility: 'click' }"
                  v-model="home.availabilityRanges[index]"
                  is-range
                  timezone="UTC"
                  class="double-input"
                  :modelConfig="{ timeAdjust: '00:00:00' }"
                  ><template v-slot="{ inputValue, inputEvents }">
                    <input
                      :value="inputValue.start"
                      placeholder="Available from?"
                      v-on="inputEvents.start"
                      required />

                    <input
                      :value="inputValue.end"
                      v-on="inputEvents.end"
                      placeholder="Till?"
                      required /></template
                ></date-picker>
              </div>
              <input
                v-model="home.pricePerNight"
                type="number"
                placeholder="Price per Night in $"
                required
              />
            </div>
          </div>
          <button class="add-home">Add Home</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import index from "../index.vue";
import Cookie from "js-cookie";
import ImageUploader from "../../components/ImageUploader.vue";
import { unWrap } from "../../utils/fetchUtils";
import { throws } from "assert";
export default {
  components: { index, ImageUploader },
  asyncData({ $config, redirect }) {
    if (!Cookie.get($config.auth.cookieName)) {
      redirect("/no-access/");
      return;
    }
  },
  data() {
    return {
      home: {
        title: "",
        description: "",
        note: "",
        pricePerNight: "",
        guests: "",
        bedrooms: "",
        beds: "",
        bathrooms: "",
        features: [],
        location: {
          address: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
        },
        _geoloc: {
          lat: "",
          lng: "",
        },
        images: ["", "", "", "", ""],
        availabilityRanges: [{ start: "", end: "" }],
      },
      feature_list: [
        "Air conditioning",
        "Balcony",
        "Bathtub",
        "Cable TV",
        "Coffee maker",
        "Dishwasher",
        "Double bed",
        "Essentials",
        "Hangers",
        "Iron",
        "Kettle",
        "Workspace",
        "Shampoo",
        "Smoke detector",
        "Stereo",
        "TV",
        "Washer",
        "Wifi",
        "King-sized bed",
        "Microwave",
        "Refrigerator",
        "Dining table",
        "Stove",
        "Gym",
        "Water Heater",
        "Oven",
      ],
    };
  },
  mounted() {
    this.$maps.makeAutoComplete(this.$refs.locationSelector, ["address"]);
    window.scrollTo({
      top: document.getElementById("addHome").offsetTop,
      behavior: "smooth",
    });
  },
  methods: {
    imageUpdated(imageUrl, index) {
      this.home.images.splice(index, 1, imageUrl);
    },
    changed(event) {
      const addressParts = event.detail.address_components;
      const street =
        this.getAddressPart(addressParts, "street_number")?.short_name || "";
      const route =
        this.getAddressPart(addressParts, "route")?.short_name || "";
      this.home.location.address = street + " " + route;
      this.home.location.city =
        this.getAddressPart(addressParts, "locality")?.short_name || "";
      this.home.location.state =
        this.getAddressPart(addressParts, "administrative_area_level_1")
          ?.long_name || "";
      this.home.location.postalCode =
        this.getAddressPart(addressParts, "postal_code")?.short_name || "";
      this.home.location.country =
        this.getAddressPart(addressParts, "country")?.short_name || "";

      const geo = event.detail.geometry.location;
      this.home._geoloc.lat = geo.lat();
      this.home._geoloc.lng = geo.lng();
    },
    getAddressPart(parts, type) {
      return parts.find((part) => part.types.includes(type));
    },
    toggleFeature(feature) {
      if (!event.target.classList.contains("active")) {
        this.home.features.unshift(feature);
        event.target.classList.add("active");
      } else {
        this.home.features.splice(this.home.features.indexOf(feature), 1);
        event.target.classList.remove("active");
      }
    },
    async onSubmit() {
      const response = await unWrap(
        await fetch("/api/homes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.home),
        })
      );
      this.$store.dispatch("homes/setHome", this.home);
      this.$router.push({
        name: "admin",
      }),
        setTimeout(location.reload(), 5000);
    },
  },
};
</script>
