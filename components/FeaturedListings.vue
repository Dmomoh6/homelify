<template>
  <div class="app-section featured-listings">
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
