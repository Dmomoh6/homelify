<template>
  <div class="app-section">
    <div class="app-wrapper">
      <div class="homeAddress">
        {{ home.location.address }}, {{ home.location.city }},
        {{ home.location.state }}, {{ home.location.country }}.
      </div>
      <div class="map" ref="map"></div>
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
  mounted() {
    this.$maps.showMap(
      this.$refs.map,
      this.home._geoloc.lat,
      this.home._geoloc.lng
    );
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 450px;
}

.homeAddress {
  @apply font-medium mb-10 relative text-grey top-8;
}

.app-section {
  clear: both;
}
</style>
