<template>
  <div class="search-bar-component">
    <div class="search" v-if="!isHome">
      <input
        class="location"
        type="text"
        placeholder="Where are you going?"
        @changed="changed"
        ref="citySearch"
      />
      <button
        type="button"
        @click="search('small')"
        class="search-icon"
      ></button>
    </div>

    <div v-else class="search-home">
      <input
        class="location"
        type="text"
        placeholder="Where are you going?"
        @changed="changed"
        ref="citySearch"
      />
      <client-only>
        <date-picker
          :popover="{ placement: 'bottom', visibility: 'click' }"
          v-model="range"
          is-range
          timezone="UTC"
          class="date_picker"
          :modelConfig="{ timeAdjust: '00:00:00' }"
          ><template v-slot="{ inputValue, inputEvents }">
            <input
              :value="inputValue.start"
              placeholder="Check in"
              class="check-in"
              v-on="inputEvents.start" />

            <input
              :value="inputValue.end"
              v-on="inputEvents.end"
              class="check-out"
              placeholder="Check out" /></template
        ></date-picker>
      </client-only>
      <button
        type="button"
        @click="search('large')"
        class="search-icon"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isHome: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      location: {
        lat: 0,
        lng: 0,
        label: "",
      },
      range: {
        start: new Date(),
        end: new Date(),
      },
    };
  },
  computed: {
    start() {
      let day = new Date();
      day = day.setHours(1, 0, 0, 0);
      return day / 1000;
    },
  },
  mounted() {
    this.$maps.makeAutoComplete(this.$refs.citySearch);
  },
  methods: {
    search(a) {
      if (!this.location.label) return;
      if (a === "small") {
        this.$router.push({
          name: "search",
          query: {
            ...this.location,
            start: new Date().setHours(1, 0, 0, 0) / 1000,
            end: new Date().setHours(1, 0, 0, 0) / 1000,
          },
        });
      } else {
        this.$router.push({
          name: "search",
          query: {
            ...this.location,
            start: this.range.start.getTime() / 1000,
            end: this.range.end.getTime() / 1000,
          },
        });
      }
    },
    changed(event) {
      const place = event.detail;
      if (!place.geometry) return;
      this.location.lat = place.geometry.location.lat();
      this.location.lng = place.geometry.location.lng();
      this.location.label = this.$refs.citySearch.value;
    },
  },
};
</script>
