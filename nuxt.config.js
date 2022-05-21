export default {
  components: true,
  head: {
    titleTemplate: "Homelify: %s",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      {
        charset: "utf-8",
      },
    ],
  },
  router: {
    prefetchLinks: false,
  },
  plugins: [
    "~/plugins/maps.client",
    "~/plugins/dataApi",
    "~/plugins/auth.client",
    "~/plugins/vCalender.client",
    "~/plugins/stripe.client",
    "~/plugins/clickOutside",
  ],
  modules: [
    "~/modules/auth",
    "~/modules/algolia",
    "~/modules/cloudinary",
    "@nuxtjs/cloudinary",
    "~/modules/stripe",
  ],
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUDNAME,
  },
  image: {
    cloudinary: {
      baseURL: "https://res.cloudinary.com/dmomoh6/image/upload/",
    },
  },
  buildModules: ["@nuxtjs/tailwindcss", "@nuxt/image"],
  serverMiddleware: [
    function (req, res, next) {
      next();
    },
  ],
  css: ["~/assets/css/font.css", "~/assets/sass/app.scss"],
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    },
  },
  publicRuntimeConfig: {
    auth: {
      cookieName: "idToken",
      clientId: process.env.AUTH_CLIENT_ID,
    },
    algolia: {
      appId: process.env.ALGOLIA_APP_ID,
      key: process.env.ALGOLIA_PUBLIC_KEY,
    },
    cloudinary: {
      apiKey: process.env.CLOUDINARY_APIKEY,
    },
    stripe: {
      key: process.env.STRIPE_KEY,
    },
    googleMaps: { key: process.env.GOOGLEMAPS_KEY },
  },
  privateRuntimeConfig: {
    algolia: {
      key: process.env.ALGOLIA_KEY,
      appId: process.env.ALGOLIA_APP_ID,
    },
    cloudinary: {
      apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
    },
  },
};
