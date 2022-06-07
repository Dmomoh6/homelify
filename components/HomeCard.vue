<template>
  <div>
    <img :src="home.images[0]" class="home-card-images" /><br />
    {{ home.title }}<br />
    {{ home.location.address }} {{ home.location.city }} {{ home.location.state
    }}<br />
    {{ home.guests }} guests <br />
    {{ home.pricePerNight }} /night
  </div>
</template>

<script>
export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
};
</script>
