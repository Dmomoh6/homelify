<template>
  <div class="app-wrapper property-details">
    <div class="app-column-split">
      <div class="col-1">
        <div class="specifications">
          <div>
            <img src="/images/person.svg" width="25" />
            {{ pluralize(home.guests, "guest") }}
          </div>
          <div>
            <img src="/images/rooms.svg" width="25" />{{
              pluralize(home.bedrooms, "room")
            }}
          </div>
          <div>
            <img src="/images/bed.svg" width="25" />{{
              pluralize(home.beds, "bed")
            }}
          </div>
          <div>
            <img src="/images/bath.svg" width="25" />
            {{ pluralize(home.bathrooms, "bath") }}
          </div>
        </div>
        <div class="features">
          <span class="feat" v-for="feature in home.features" :key="feature">{{
            feature
          }}</span>
        </div>
        <div class="description">
          {{ home.description }}
        </div>
      </div>
      <div class="col-2">
        <div class="pricetag">
          <span class="price"> ${{ home.pricePerNight }}</span
          >/night
        </div>
        <div class="app-search">
          <client-only>
            <date-picker
              :popover="{ placement: 'bottom', visibility: 'click' }"
              v-model="range"
              is-range
              timezone="UTC"
              :modelConfig="{ timeAdjust: '00:00:00' }"
              ><template v-slot="{ inputValue, inputEvents }">
                <input
                  :value="inputValue.start"
                  placeholder="Check in"
                  class="datepicker"
                  v-on="inputEvents.start" />

                <input
                  :value="inputValue.end"
                  v-on="inputEvents.end"
                  class="datepicker"
                  placeholder="Check out" /></template
            ></date-picker>
          </client-only>
        </div>
        <div @click="checkout" class="app-big-button">Make Reservation</div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { state } from "../store/auth";
export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      range: {
        start: null,
        end: null,
      },
    };
  },
  methods: {
    pluralize(number, singularWord) {
      const text = `${number} ${singularWord}`;
      if (number == 1) return "  " + text;
      return "  " + text + "s";
    },
    checkout() {
      if (!this.$store.getters["auth/isLoggedIn"]) {
        alert("Please sign in to make a reservation");
        return;
      } else {
        if (this.range.start == null || this.range.end == null) {
          alert("Please select a check in and check out date");
          return;
        }
        const start = this.range.start.getTime() / 1000;
        const end = this.range.end.getTime() / 1000;
        this.$stripe.checkout(this.home.objectID, start, end);
      }
    },
  },
  mounted() {
    if (this.$route.query.result == "success") {
      alert("Payment successful! Your reservation has been made");
    }
  },
};
</script>
