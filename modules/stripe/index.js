import stripeLib from "stripe";
import getApis from "../algolia/apis";
import { rejectHitBadRequest, sendJSON } from "../helpers";
export default function () {
  const algoliaConfig = this.options.privateRuntimeConfig.algolia;
  const apis = getApis(algoliaConfig);
  const secretKey = this.options.privateRuntimeConfig.stripe.secretKey;
  const stripe = stripeLib(secretKey);
  const cloudName = this.options.cloudinary.cloudName;
  const rootUrl = this.options.rootUrl;
  this.nuxt.hook("render:setupMiddleware", (app) => {
    app.use("/api/stripe/create-session", createSession);
  });

  async function createSession(req, res) {
    const body = req.body;
    if (
      !body ||
      !body.homeId ||
      !body.start ||
      !body.end ||
      !body.start >= body.end
    ) {
      return rejectHitBadRequest(res);
    }
    const home = (await apis.homes.get(body.homeId)).json;
    const nights = (body.end - body.start) / 86400;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "USD",
            unit_amount: nights * home.pricePerNight * 100,
            product_data: {
              name: "Reservation for " + home.title,
              images: [`${home.images[0]}`],
            },
          },
        },
      ],
      mode: "payment",
      success_url: `${rootUrl}/home/${body.homeId}?result=success`,
      cancel_url: `${rootUrl}/home/${body.homeId}`,
    });

    sendJSON({ id: session.id }, res);
  }
}
