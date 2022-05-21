import { unWrap, getErrorResponse } from "../utils/fetchUtils";

export default function ({ $config }, inject) {
  const headers = {
    "X-Algolia-API-Key": $config.algolia.key,
    "X-Algolia-Application-Id": $config.algolia.appId,
  };
  inject("dataApi", {
    getHome,
    getReviewsByHomeId,
    getUserByHomeId,
    getHomesByLocation,
    getFeaturedHomes,
  });

  async function getHome(homeId) {
    try {
      return unWrap(
        await fetch(
          `https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/homes/${homeId}`,
          { headers }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getReviewsByHomeId(homeId) {
    try {
      return unWrap(
        await fetch(
          `https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/reviews/query`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              filters: `homeId:${homeId}`,
              hitsPerPage: 6,
              attributesToHighlight: [],
            }),
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getUserByHomeId(homeId) {
    try {
      return unWrap(
        await fetch(
          `https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/users/query`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              filters: `homeId:${homeId}`,
              attributesToHighlight: [],
            }),
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getFeaturedHomes() {
    try {
      return unWrap(
        await fetch(
          `https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/homes/query`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              filters: "featured: true",
              attributesToHighlight: [],
            }),
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getHomesByLocation(
    lat,
    lng,
    start,
    end,
    radiusInMeters = 1500 * 100
  ) {
    try {
      const days = [];
      for (let day = start; day <= end; day += 86400) {
        days.push(`availability:${day}`);
      }
      return unWrap(
        await fetch(
          `https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/homes/query`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              hitsPerPage: 10,
              aroundLatLng: `${lat},${lng}`,
              aroundRadius: radiusInMeters,
              filters: days.join(" AND "),
              attributesToHighlight: [],
            }),
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }
}
