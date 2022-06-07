<template>
  <div class="app-section premium-listings">
    <div class="app-wrapper">
      <div class="title">Premium Listings</div>

      <div class="listings">
        <nuxt-link
          :to="`search?lat=48.856614&lng=2.3522219&label=Paris,%20France&start=${today}&end=${today}`"
        >
          <div class="city-paris">
            <div class="location">
              <h3>Paris</h3>
              <p>France</p>
            </div>
          </div>
        </nuxt-link>

        <nuxt-link
          :to="`search?lat=40.7127753&lng=-74.0059728&label=New%20York,%20NY,%20USA&start=${today}&end=${today}`"
        >
          <div class="city-new-york">
            <div class="location">
              <h3>New York</h3>
              <p>USA</p>
            </div>
          </div>
        </nuxt-link>

        <nuxt-link
          :to="`search?lat=51.5072178&lng=-0.1275862&label=London,%20UK&start=${today}&end=${today}`"
        >
          <div class="city-london">
            <div class="location">
              <h3>London</h3>
              <p>UNITED KINGDOM</p>
            </div>
          </div>
        </nuxt-link>

        <nuxt-link
          :to="`search?lat=25.2048493&lng=55.2707828&label=Dubai%20-%20United%20Arab%20Emirates&start=${today}&end=${today}`"
        >
          <div class="city-dubai">
            <div class="location">
              <h3>Dubai</h3>
              <p>United Arab Emirates</p>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    today() {
      let day = new Date();
      day = day.setHours(1, 0, 0, 0);
      return day / 1000;
    },
  },
};
</script>
