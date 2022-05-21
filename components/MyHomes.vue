<template>
  <div class="app-section">
    <div class="app-wrapper">
      <div class="title">My Homes</div>

      <div class="listings">
        <div v-for="home in homes" :key="home.objectID" class="house">
          <div
            class="image"
            :style="`background-image: url(${home.images[0]})`"
          ></div>
          <div class="information">
            <div class="property-review">
              <img src="/images/star.svg" width="20" />{{ home.reviewValue }}
              <span class="review-count">({{ home.reviewCount }} reviews)</span>
            </div>
            <div class="property-title">
              <nuxt-link :to="`/home/${home.objectID}`">{{
                home.title
              }}</nuxt-link>
            </div>
            <div class="specifications">
              {{ pluralize(home.guests, "guest") }}
              {{ pluralize(home.bedrooms, "room") }}·
              {{ pluralize(home.bathrooms, "bath") }}·
              {{ pluralize(home.beds, "bed") }}
            </div>
            <div class="pricetag">
              <span class="value">${{ home.pricePerNight }}</span> /night
            </div>
            <div class="delete_home" @click="deleteHome(home.objectID)">
              Delete Home
            </div>
          </div>
        </div>
        <template @click="navigation">
          <div @click="navigation" class="house new-home">
            <div class="add-home">Add a home +</div>
          </div></template
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    homes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    navigation() {
      if (this.$router.currentRoute.path !== "/admin/homes") {
        this.$router.push("/admin/homes");
      }
      setTimeout(() => {
        window.scrollTo({
          top: document.getElementById("addHome").offsetTop,
          behavior: "smooth",
        });
      }, 50);
    },
    pluralize(number, singularWord) {
      const text = `${number} ${singularWord}`;
      if (number == 1) return "  " + text;
      return "  " + text + "s";
    },
    async deleteHome(homeId) {
      await fetch(`/api/homes/${homeId}`, {
        method: "DELETE",
      });
      const index = this.$store.getters["homes/getHomes"].findIndex(
        (obj) => obj.objectID == homeId
      );
      this.$store.dispatch("homes/deleteHome", index);
      setTimeout(location.reload(), 5000);
    },
  },
};
</script>

<style scoped>
.new-home {
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 340px;
}

.new-home:hover {
  @apply bg-homelify text-white;
}
.add-home {
  @apply font-semibold;
  font-size: 25px;
}
.title {
  @apply font-semibold;
  font-size: 33.5px;
  margin-bottom: 50px;
  margin-top: 50px;
}

.listings {
  @apply grid grid-cols-3 gap-6;
}

.listings > div {
  @apply rounded-3xl flex flex-col;
  width: 100%;
  min-height: 340px;
  position: relative;
  overflow: hidden;
}

.house {
  @apply shadow;
}

.image {
  width: 100%;
  height: 60%;
  background-size: cover !important;
  background-position: center bottom;
  background-repeat: no-repeat;
}

.app-section {
  margin-bottom: 50px;
}

.property-review {
  @apply font-semibold;
}
.property-review > img {
  @apply float-left mr-1 relative mt-0.5;
  top: -1px;
}

.review-count {
  @apply font-normal text-grey;
}

.information {
  @apply m-3;
}

.property-title {
  @apply font-semibold text-xl my-1;
}

.specifications {
  @apply text-grey  font-normal -mt-1;
}

.pricetag {
  @apply float-right text-grey font-medium;
}

.pricetag > .value {
  @apply font-medium text-black text-2xl relative top-0.5;
}
@media (max-width: 1024px) {
  .listings {
    @apply grid grid-cols-2 gap-6;
  }

  .title {
    @apply font-semibold;
    font-size: 26.5px;
  }
}

@media (max-width: 825px) {
  .listings {
    @apply grid grid-cols-1;
    margin-top: -30px;
  }
}

.delete_home {
  color: red;
  font-weight: 500;
  font-size: 15px;
  margin-top: 5px;
  cursor: pointer;
}
</style>
