<template>
  <div class="error">
    {{ error.message }}<br />{{ error.statusCode }} <br /><nuxt-link
      to="/"
      class="home-link"
      >Back to Homepage</nuxt-link
    >
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.error {
  @apply flex flex-col justify-center items-center text-center;
  width: 100vw;
  font-weight: 600;
  font-size: 25px;
  height: calc(100vh - 150px);
}

.home-link {
  @apply bg-homelify text-white;
  padding: 10px 20px 10px 20px;
  font-size: 15px;
  margin-top: 20px;
  border-radius: 6px;
}
</style>
