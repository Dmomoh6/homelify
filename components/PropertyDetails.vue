<template>
  <div class="app-wrapper">
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
      const start = this.range.start.getTime() / 1000;
      const end = this.range.end.getTime() / 1000;
      this.$stripe.checkout(this.home.objectID, start, end);
    },
  },
  mounted() {
    if (this.$route.query.result == "success") {
      alert("Payment successful! Your reservation has been made");
    }
  },
};
</script>

<style scoped>
.feat {
  @apply mr-2 border border-grey p-3 rounded inline-block mb-3;
}

.features {
  @apply mt-5 mb-7 font-normal text-grey;
}

.description {
  @apply text-grey leading-relaxed;
}

.specifications {
  @apply text-grey font-normal flex;
}

.specifications > div {
  @apply mb-2 pr-8;
}

.specifications img {
  @apply inline-block mr-1;
}

.col-1 {
  width: 70%;
  float: left;
}

.col-2 {
  @apply grid place-content-center pt-12;
  width: 30%;
}

.price {
  @apply font-medium text-4xl text-black;
}

.pricetag {
  @apply font-normal text-grey text-center mb-5;

  font-size: 27.5px;
}

@media (max-width: 825px) {
  .feat {
    @apply p-1.5 -mt-10;
  }

  .description {
    @apply -mt-5;
  }
  .col-1 {
    width: 100%;
    float: left;
  }
  .col-2 {
    @apply grid place-content-center;
    width: 100%;
  }

  .specifications img {
    width: 20px;
  }

  .price {
    @apply font-medium text-4xl text-black;
  }

  .pricetag {
    @apply font-normal text-grey text-center -mt-5 mb-5;

    font-size: 27.5px;
  }

  input {
    width: unset;
  }

  input::placeholder,
  .app-big-button,
  .feat,
  .description,
  .specifications {
    font-size: 13px;
  }

  .app-big-button {
    @apply mb-5;
  }
}

.app-big-button {
  cursor: pointer;
}
</style>
