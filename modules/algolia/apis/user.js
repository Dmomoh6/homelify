import { getHeaders } from "../../helpers";
import fetch from "node-fetch";
import { unWrap, getErrorResponse } from "../../../utils/fetchUtils";

export default (algoliaConfig) => {
  const headers = getHeaders(algoliaConfig);
  return {
    getById: async function (identity) {
      try {
        return unWrap(
          await fetch(
            `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`,
            {
              headers,
            }
          )
        );
      } catch (error) {
        return getErrorResponse(error);
      }
    },
    removeHome: async function (identity, homeId) {
      const payload = (await this.getById(identity)).json;
      const homes = payload.homeId.filter((id) => id != homeId);
      payload.homeId = homes;
      this.create(identity, payload);
    },
    assignHome: async function (identity, homeId) {
      const payload = (await this.getById(identity)).json;
      payload.homeId.push(homeId);
      this.create(identity, payload);
    },

    create: async (identity, payload) => {
      try {
        return unWrap(
          await fetch(
            `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`,
            {
              method: "PUT",
              headers,
              body: JSON.stringify(payload),
            }
          )
        );
      } catch (error) {
        return getErrorResponse(error);
      }
    },
  };
};
