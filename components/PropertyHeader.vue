<template>
  <div class="app-section">
    <div class="app-wrapper">
      <div class="search-bar"><search-bar /></div>
      <div class="split">
        <div class="property-title">
          {{ home.title }}
        </div>
        <div class="property-location">
          {{ home.location.state }}, {{ home.location.country }}
        </div>
        <div class="property-review">
          <img src="/images/star.svg" width="20" />{{ home.reviewValue }}
          <span class="review-count">({{ home.reviewCount }} reviews)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
export default {
  components: { SearchBar },
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.search-bar {
  @apply place-self-end mt-5;
}

.split {
  @apply -mt-15;
  width: 65%;
}

.property-review > img {
  @apply float-left mr-1 relative;
  top: -1px;
}

.property-review {
  @apply font-semibold -mt-0.5;
}

.property-title {
  @apply font-semibold;
  font-size: 27.5px;
}

.property-location {
  @apply text-grey text-lg font-medium -mt-1 float-left mr-5;
}

.review-count {
  @apply font-normal text-grey;
}

.app-wrapper {
  @apply mt-8 -mb-8 grid;
}

@media (max-width: 825px) {
  .search-bar {
    @apply place-self-center grid;
    margin: unset;
    margin-bottom: 20px;
  }
  .split {
    width: 100%;
    margin-top: unset;
    margin-bottom: -10px;
  }

  .app-wrapper {
    @apply grid;
  }

  .property-title {
    font-size: 23.5px;
  }
}
</style>
