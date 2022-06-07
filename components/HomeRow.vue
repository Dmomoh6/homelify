<template>
  <div class="home-container">
    <div class="image">
      <img :src="home.images[0]" style="" />
    </div>
    <div class="details">
      <h3><short-text :text="title" :target="30" :address="true" /></h3>
      <span> <short-text :text="address" :target="45" :address="true" /> </span>
      <div class="specifications">
        <div>
          <img src="/images/person.svg" width="20" />
          {{ pluralize(home.guests, "guest") }}
        </div>
        <div>
          <img src="/images/rooms.svg" width="20" />{{
            pluralize(home.bedrooms, "room")
          }}
        </div>
        <div>
          <img src="/images/bath.svg" width="20" />
          {{ pluralize(home.bathrooms, "bath") }}
        </div>
        <div>
          <img src="/images/bed.svg" width="20" />{{
            pluralize(home.beds, "bed")
          }}
        </div>
      </div>
      <div class="additional-information">
        <div class="reviews">
          <img src="/images/star.svg" width="20" />{{ home.reviewValue }}
          <span class="review-count">({{ home.reviewCount }} reviews)</span>
        </div>

        <div class="pricetag">
          <span class="value">${{ home.pricePerNight }}</span> /night
        </div>
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
      address: `${this.home.location.address}, ${this.home.location.city},
        ${this.home.location.state}`,
      title: `${this.home.title}`,
    };
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
