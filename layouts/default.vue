<template>
  <div class="default">
    <header class="app-header">
      <div class="app-logo">
        <nuxt-link to="/"
          ><img v-if="!mobileWidth" src="/images/logo.svg" /><img
            v-else
            src="/images/icon.svg"
          />
        </nuxt-link>
      </div>
      <div class="app-user-menu">
        <template v-if="isLoggedIn">
          <nuxt-link to="/admin/homes">
            <span v-if="!mobileWidth" class="name">Become a Host</span>
            <img class="add-home" v-else src="/images/add-home.svg"
          /></nuxt-link>

          <img :src="user.profileUrl" class="avatar" @click="toggleDropdown" />
        </template>
        <nuxt-link to="/"
          ><div v-show="!isLoggedIn" id="googleButton"></div>
        </nuxt-link>
      </div>
      <div v-click-outside="removeDropdown" class="not-active dropdown">
        <ul>
          <li @click="toAdmin">My Homes</li>

          <li @click="logout">Log out</li>
        </ul>
      </div>
    </header>
    <nuxt />
  </div>
</template>

<script>
import Foot from "../components/Foot.vue";
export default {
  components: { Foot },
  data() {
    return {
      width: 1000,
    };
  },
  methods: {
    resize() {
      if (process.client) {
        this.width = window.innerWidth;
      }
    },
    test() {
      this.$store.dispatch("counterUp");
    },
    toggleDropdown() {
      document.querySelector(".dropdown").classList.toggle("not-active");
    },
    removeDropdown() {
      if (!event.target.classList.contains("avatar")) {
        document.querySelector(".dropdown").classList.add("not-active");
      }
    },
    toAdmin() {
      document.querySelector(".dropdown").classList.add("not-active");

      this.$router.push("/admin");
    },
    logout() {
      document.querySelector(".dropdown").classList.add("not-active");
      this.$auth.signOut();
    },
  },
  created() {
    if (process.client) {
      window.addEventListener("resize", this.resize);
    }
  },
  mounted() {
    this.resize();
    this.$auth.init();
  },
  computed: {
    mobileWidth() {
      return this.width <= 825;
    },
    user() {
      return this.$store.state.auth.user;
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
  },
};
</script>
