<template>
  <div class="app-section">
    <div class="app-wrapper">
      <div class="title">Featured Listings</div>

      <div class="listings">
        <nuxt-link
          v-for="home in homes"
          :key="home.objectID"
          :to="`/home/${home.objectID}`"
        >
          <div class="house">
            <div
              class="image"
              :style="`background-image: url(${home.images[0]})`"
            ></div>
            <div class="information">
              <div class="property-review">
                <img src="/images/star.svg" width="20" />{{ home.reviewValue }}
                <span class="review-count"
                  >({{ home.reviewCount }} reviews)</span
                >
              </div>
              <div class="property-title">
                {{ home.title }}
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
            </div>
          </div>
        </nuxt-link>
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
    pluralize(number, singularWord) {
      const text = `${number} ${singularWord}`;
      if (number == 1) return "  " + text;
      return "  " + text + "s";
    },
  },
};
</script>

<style scoped>
.title {
  @apply font-semibold;
  font-size: 33.5px;
  margin-bottom: 50px;
  margin-top: 120px;
}

.listings {
  @apply grid grid-cols-3 gap-6;
}

.listings > a,
.house {
  @apply rounded-3xl flex flex-col shadow;
  width: 100%;
  min-height: 340px;
  position: relative;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 60%;
  background-size: cover !important;
  background-position: center bottom;
  background-repeat: no-repeat;
}

.app-section {
  margin-bottom: 50px;
}

.property-review {
  @apply font-semibold;
}
.property-review > img {
  @apply float-left mr-1 relative mt-0.5;
  top: -1px;
}

.review-count {
  @apply font-normal text-grey;
}

.information {
  @apply m-3;
}

.property-title {
  @apply font-semibold text-xl my-1;
}

.specifications {
  @apply text-grey  font-normal -mt-1;
}

.pricetag {
  @apply float-right text-grey font-medium;
}

.pricetag > .value {
  @apply font-medium text-black text-2xl relative top-0.5;
}
@media (max-width: 1024px) {
  .listings {
    @apply grid grid-cols-2 gap-6;
    position: relative;
    top: -100px;
    margin-bottom: -150px;
  }

  .title {
    @apply font-semibold;
    font-size: 26.5px;
    top: -100px;

    position: relative;
  }
}

@media (max-width: 825px) {
  .listings {
    @apply grid grid-cols-1;
  }

  .title {
    @apply text-center;
  }
}
</style>
