<template>
  <div>
    <my-homes :homes="homeList" />
    <nuxt-child />
    <foot />
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { unWrap } from "~/utils/fetchUtils";
export default {
  asyncData({ $config, redirect }) {
    if (!Cookie.get($config.auth.cookieName)) {
      redirect("/no-access/");
      return;
    }
  },
  data() {
    return { homeList: [] };
  },
  methods: {
    async setHomesList() {
      this.homeList = (await unWrap(await fetch("/api/homes/user/"))).json;
      this.$store.dispatch("homes/setHome", this.homeList);
    },
  },
  mounted() {
    this.setHomesList();
  },
};
</script>
