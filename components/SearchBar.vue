<template>
  <div>
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

<style scoped>
input {
  @apply px-1;
  background: transparent;
  max-width: 50%;
}

input.location {
  max-width: 200px;
  margin-left: 10px;
  margin-right: 10px;
}

input:focus {
  outline: none;
}

.search {
  border: 1px solid #d4d4d4;
  border-radius: 999px;
  max-height: 40px;
}

input::placeholder {
  @apply font-medium;
  font-size: 12.5px;
  text-align: center;
  color: #808080;
}

.search-icon {
  position: relative;
  width: 30px;
  height: 30px;
  margin: 3.75px;
  padding: 2px;
  background: transparent url(/images/search-icon.svg) no-repeat center;
}

.search-home {
  @apply flex self-center;
  border: 1px solid #d4d4d4;
  border-radius: 999px;
  max-height: 60px;
  width: 50vw;
  margin-left: 25vw;
  margin-top: 35px;
  margin-right: 25vw;
  background-color: #ffffff;
}

.search-home span input:first-child {
  border-left: 1px solid #d4d4d4;
  border-right: 1px solid #d4d4d4;
}

.search-home > input {
  color: #000000;
  max-width: 20%;
  font-size: 14px;
  padding-left: 20px;
  padding-right: 20px;
}

.search-home span > input {
  color: #000000;

  font-size: 14px;
  padding-left: 20px;
  padding-right: 20px;
}

span {
  display: flex;
  max-width: 40%;
}

@media (max-width: 1024px) {
  .search-home > input {
    width: 25% !important;
    max-width: 25% !important;
    font-size: 14px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .search-home > input.location {
    min-width: 45% !important;
  }

  .search-home input::placeholder {
    @apply font-medium;
    font-size: 11px !important;
    text-align: center;
    color: #808080;
  }

  .search-home span > input {
    @apply font-medium;
    font-size: 11px !important;
  }
}

@media (max-width: 825px) {
  .search-home {
    @apply flex self-center;
    border-radius: 999px;
    max-height: 60px;
    width: 80vw;
    margin: auto;
    margin-top: 20px;
  }
  .search-home > input.location {
    min-width: 45% !important;
  }
}

.search-home > input.location {
  color: #000000;
  min-width: 48%;
  max-height: 705px;
}

.search-home input::placeholder {
  @apply font-medium;
  font-size: 14px;
  text-align: center;
  color: #808080;
}

.search-home .search-icon {
  position: relative;
  width: 47.5px;
  height: 47.5px;
  margin-left: auto;
  order: 2;
  background: transparent url(/images/search-icon.svg) no-repeat center;
}

.date_picker {
  @apply flex flex-1;
  width: 48%;
  justify-content: center;
}
.date_picker input {
  @apply flex flex-1;
  text-align: center;
}
</style>
