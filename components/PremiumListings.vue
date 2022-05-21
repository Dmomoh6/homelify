<template>
  <div class="app-section">
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

<style scoped>
.title {
  @apply font-semibold;
  font-size: 33.5px;
  margin-bottom: 50px;
}

.listings {
  @apply grid grid-cols-4 gap-6;
}

@media (max-width: 1024px) {
  .listings {
    @apply grid grid-cols-2 gap-6;
    position: relative;
    top: -50px;
  }

  .title {
    @apply font-semibold;
    font-size: 26.5px;
    top: -40px;

    position: relative;
  }
}

@media (max-width: 825px) {
  .listings {
    @apply grid grid-cols-1;
  }

  .title {
    @apply text-center;
  }
}

.listings > a > div {
  @apply rounded-3xl;
  width: 100%;
  height: 380px;
  position: relative;
  overflow: hidden;
}

.location {
  position: relative;
  top: 300px;
  margin-left: 25px;
  margin-right: 25px;
}

.location > h3 {
  @apply font-semibold text-3xl;
}

.location > p {
  text-transform: uppercase;
  letter-spacing: 3px;
  line-height: 18px;
  font-size: 17px;
}
</style>
