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
