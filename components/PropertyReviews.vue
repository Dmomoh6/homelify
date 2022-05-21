<template>
  <div class="app-section">
    <div class="app-wrapper">
      <div class="app-review" v-for="review in reviews" :key="review.objectID">
        <img :src="review.reviewer.image" />
        <div class="reviewTitle">
          <div class="reviewName">{{ review.reviewer.name }}</div>
          <div class="reviewDate">{{ formatDate(review.date) }}</div>
        </div>
        <div class="reviewDetails">
          <short-text :text="review.comment" :target="150" :address="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      });
    },
  },
};
</script>

<style scoped>
.app-wrapper {
  @apply grid grid-cols-3 mt-15;
}

@media (max-width: 1024px) {
  .app-wrapper {
    @apply grid grid-cols-2 mt-15;
  }
}

@media (max-width: 825px) {
  .app-wrapper {
    @apply grid grid-cols-1 mt-15;
  }
}

.app-review {
  @apply mt-7;
}

.app-review > img {
  @apply rounded-full my-3 ml-1;
  float: left;
  width: 75px;
  margin-right: 15px;
}

.reviewTitle {
  @apply my-5;
}

.reviewName {
  @apply text-grey font-semibold;
  font-size: 22.5px;
}

.reviewDate {
  @apply text-grey -mt-1.5;
}

.reviewDetails {
  @apply clear-both text-sm text-grey leading-loose mr-5 my-2;
}
</style>
