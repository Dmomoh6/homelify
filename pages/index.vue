<template>
  <div>
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
    <!--   <div
      v-for="home in homes"
      :key="home.objectID"
      style="float: left; margin: 10px"
    >
      <nuxt-link :to="`/home/${home.objectID}`">
        <home-card :home="home" />
      </nuxt-link>
    </div> -->
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

<style scoped>
.container {
  background-image: url(/images/bg.png);
  background-size: cover !important;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 90vh;
  position: relative;
  top: -90px;
  min-width: 100vw;
}

.welcome {
  width: 100vw !important;
}

.bold {
  @apply font-bold;
}

.welcome {
  @apply text-4xl text-white leading-normal text-center;
}

@media screen and (max-width: 825px) {
  .welcome {
    @apply text-2xl px-10;
  }
}
</style>
