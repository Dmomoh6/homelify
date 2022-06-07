<template>
  <div class="search-page">
    <div class="search">
      <div class="search-information">
        <div class="search-bar"><search-bar /></div>
        <div class="search-label">Listings in {{ label }}</div>
        <div v-if="homes.length > 0">
          <nuxt-link
            v-for="home in homes"
            :key="home.objectID"
            :to="`/home/${home.objectID}`"
          >
            <home-row
              class="search-homes"
              :home="home"
              @mouseover.native="highlightMarker(home.objectID, true)"
              @mouseout.native="highlightMarker(home.objectID, false)"
            />
          </nuxt-link>
        </div>

        <div v-else class="no-results">No results found</div>
      </div>
      <div class="search-map" ref="map"></div>
    </div>
  </div>
</template>

<script>
import HomeRow from "../components/HomeRow.vue";
import SearchBar from "../components/SearchBar.vue";
export default {
  head() {
    return {
      title: `Homes around ${this.label}`,
    };
  },
  components: { HomeRow, SearchBar },
  async beforeRouteUpdate(to, from, next) {
    const data = await this.$dataApi.getHomesByLocation(
      to.query.lat,
      to.query.lng,
      to.query.start,
      to.query.end
    );
    this.homes = data.json.hits;
    this.label = to.query.label;
    this.lat = to.query.lat;
    this.lng = to.query.lng;
    this.updateMap();
    next();
  },
  mounted() {
    this.updateMap();
    if (process.client) {
      let resizeTimer = 250;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(this.updateMap, 250);
      });
    }
  },
  methods: {
    updateMap() {
      this.$refs.map = document.querySelector(".search-map");
      this.$maps.showMap(
        this.$refs.map,
        this.lat,
        this.lng,
        this.getHomeMarkers()
      );
    },
    getHomeMarkers() {
      if (this.homes.length === 0) return "none";
      return this.homes.map((home) => {
        return {
          ...home._geoloc,
          pricePerNight: home.pricePerNight,
          id: home.objectID,
        };
      });
    },
    highlightMarker(homeId, isHighlighted) {
      document
        .getElementsByClassName(`home-${homeId}`)[0]
        ?.classList?.toggle("marker-highlight", isHighlighted);
    },
  },
  async asyncData({ query, $dataApi }) {
    const data = await $dataApi.getHomesByLocation(
      query.lat,
      query.lng,
      query.start,
      query.end
    );
    return {
      label: query.label,
      lat: query.lat,
      lng: query.lng,
      homes: data.json.hits,
    };
  },
};
</script>
