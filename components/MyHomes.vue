<template>
  <div class="app-section my-homes">
    <div class="app-wrapper">
      <div class="title">My Homes</div>

      <div class="listings">
        <div v-for="home in homes" :key="home.objectID" class="house">
          <div
            class="image"
            :style="`background-image: url(${home.images[0]})`"
          ></div>
          <div class="information">
            <div class="property-review">
              <img src="/images/star.svg" width="20" />{{ home.reviewValue }}
              <span class="review-count">({{ home.reviewCount }} reviews)</span>
            </div>
            <div class="property-title">
              <nuxt-link :to="`/home/${home.objectID}`">{{
                home.title
              }}</nuxt-link>
            </div>
            <div class="specifications">
              {{ pluralize(home.guests, "guest") }}
              {{ pluralize(home.bedrooms, "room") }}·
              {{ pluralize(home.bathrooms, "bath") }}·
              {{ pluralize(home.beds, "bed") }}
            </div>
            <div class="pricetag">
              <span class="value">${{ home.pricePerNight }}</span> /night
            </div>
            <div class="delete_home" @click="deleteHome(home.objectID)">
              Delete Home
            </div>
          </div>
        </div>
        <template @click="navigation">
          <div @click="navigation" class="house new-home">
            <div class="add-home">Add a home +</div>
          </div></template
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    homes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    navigation() {
      if (this.$router.currentRoute.path !== "/admin/homes") {
        this.$router.push("/admin/homes");
      }
      setTimeout(() => {
        window.scrollTo({
          top: document.getElementById("addHome").offsetTop,
          behavior: "smooth",
        });
      }, 50);
    },
    pluralize(number, singularWord) {
      const text = `${number} ${singularWord}`;
      if (number == 1) return "  " + text;
      return "  " + text + "s";
    },
    async deleteHome(homeId) {
      await fetch(`/api/homes/${homeId}`, {
        method: "DELETE",
      });
      const index = this.$store.getters["homes/getHomes"].findIndex(
        (obj) => obj.objectID == homeId
      );
      this.$store.dispatch("homes/deleteHome", index);
      setTimeout(location.reload(), 5000);
    },
  },
};
</script>
