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

<style scoped>
.details {
  @apply grid place-content-between;
  padding: 20px;
}

.details > h3 {
  @apply font-semibold text-xl;
}

.details > span {
  @apply font-normal text-grey -top-0.5  relative;
}

.home-container {
  @apply flex;
  border-radius: 25px;
  overflow: hidden;
  height: 220px;
}

.image > img {
  max-width: 250px;
  min-height: 220px;
}

@media screen and (max-width: 1024px) {
  .image > img {
    max-width: 350px;
    min-height: 220px;
  }

  .additional-information {
    min-width: calc(100vw - 480px);
  }
}

@media screen and (max-width: 825px) {
  .home-container {
    background-color: white !important;
    display: grid;
    height: unset;
  }

  .additional-information {
    min-width: calc(100vw - 150px);
  }

  .image > img {
    max-width: unset;
    min-width: 100%;
    min-height: unset;
    max-height: 300px;
    display: block;
  }

  details {
    display: block;
  }
}

.specifications {
  @apply text-grey font-normal grid grid-cols-2;
}

.specifications > div {
  @apply mb-2;
}

.specifications img {
  @apply inline-block mr-1;
}

.reviews img {
  @apply inline-block mr-1 relative -top-0.5;
}

.review-count {
  @apply text-grey font-normal;
}

.reviews {
  @apply font-semibold inline;
}

.pricetag {
  @apply float-right relative -top-1.5;
}

.pricetag > .value {
  @apply font-medium text-2xl;
}
.additional-information {
  @apply mt-3;
  width: 365px;
}
</style>
