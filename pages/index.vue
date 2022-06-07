<template>
  <div class="index">
    <div class="container grid content-center">
      <div class="welcome">
        Need <span class="bold">accommodation</span> for your next
        <span class="bold">trip?</span><br />We've got you
        <span class="bold">covered!</span>
        <search-bar :isHome="true" />
      </div>
    </div>

    <premium-listings />

    <featured-listings :homes="featuredHomes" />

    <foot />
  </div>
</template>

<script>
import Foot from "~/components/Foot";
import PremiumListings from "~/components/PremiumListings";
import SearchBar from "~/components/SearchBar";
import FeaturedListings from "../components/FeaturedListings.vue";

export default {
  components: {
    SearchBar,
    Foot,
    PremiumListings,
    FeaturedListings,
  },
  head() {
    return {
      title: "Homepage",
    };
  },
  async asyncData({ $dataApi }) {
    const data = await $dataApi.getFeaturedHomes();
    return {
      featuredHomes: data.json.hits,
    };
  },

  layout: "transparent",
};
</script>

<style scoped></style>
