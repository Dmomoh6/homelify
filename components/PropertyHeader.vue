<template>
  <div class="app-section property-header">
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
