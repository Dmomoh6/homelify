<template>
  <div>
    <property-header :home="home" />
    <property-gallery :images="home.images" />
    <property-details :home="home" />
    <property-map :home="home" />
    <property-reviews :reviews="reviews" />
    <foot />
  </div>
</template>

<script>
import Foot from "../../components/Foot.vue";
import PropertyDetails from "../../components/PropertyDetails.vue";
import PropertyGallery from "../../components/PropertyGallery.vue";
import PropertyHeader from "../../components/PropertyHeader.vue";
import PropertyMap from "../../components/PropertyMap.vue";
import PropertyReviews from "../../components/PropertyReviews.vue";
import ShortText from "../../components/ShortText.vue";

export default {
  components: {
    ShortText,
    PropertyGallery,
    PropertyDetails,
    PropertyMap,
    PropertyReviews,
    Foot,
    PropertyHeader,
  },
  head() {
    return {
      title: `${this.home.title}`,
    };
  },
  async asyncData({ params, $dataApi, error }) {
    const responses = await Promise.all([
      $dataApi.getHome(params.id),
      $dataApi.getReviewsByHomeId(params.id),
      $dataApi.getUserByHomeId(params.id),
    ]);

    const badResponse = responses.find((response) => !response.ok);
    if (badResponse)
      return error({
        statusCode: badResponse.status,
        message: badResponse.statusText,
      });

    return {
      home: responses[0].json,
      reviews: responses[1].json.hits,
      user: responses[2].json.hits[0],
    };
  },
  layout: "default",
};
</script>
