<template>
  <div class="app-section property-reviews">
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
