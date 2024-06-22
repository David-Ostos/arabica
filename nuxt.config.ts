// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  ssr: true,
  modules: [
    "@pinia/nuxt",
    "@nuxt/ui",
    "@formkit/auto-animate/nuxt",
    "@nuxt/image",
    [
      "@nuxtjs/google-fonts",
      {
        overwriting: false,
        families: {
          Roboto: true,
          Inter: [400, 700],
          "Josefin+Sans": true,
          Lato: [100, 300],
          Raleway: {
            wght: [100, 400],
            ital: [100],
          },
        },
      },
    ],
    "@vesp/nuxt-fontawesome",
    "@nuxt/fonts",
    'nuxt-vue3-google-signin'
  ],
  googleSignIn: {
    clientId: import.meta.env.VITE_GOOGLE_ID,
  },
  app: {
    head: {
      script: [
        {src: "https://accounts.google.com/gsi/client", async: true},
        {
          src: "https://apis.google.com/js/platform.js?onload=renderButton",
          async: true,
          defer: true,
        },
      ],
      meta: [
        {
          name: "google-signin-scope",
          content: "profile email",
        },
        {
          name: "google-signin-client_id",
          content: import.meta.env.VITE_GOOGLE_ID,
        },
        {property: "og:title", content: import.meta.env.VITE_NOMBRE},
        {property: "og:description", content: import.meta.env.VITE_DESCRIPCION},
        {
          property: "og:image",
          content:
            `${import.meta.env.VITE_URL_API}/storage/uploads/2024/06/07/hero_uid_666361a666682.jpg`,
        },
        {property: "og:url", content: "https://desarrollo.arabicagc.com"},
      ],
    },
  },
  fontawesome: {
    icons: {
      solid: [
        "percent",
        "users",
        "chart-pie",
        "caret-up",
        "sort-down",
        "chart-bar",
        "moon",
        "sun",
        "bars",
        "circle-down",
        "map-marker",
        "briefcase",
        "house",
      ],
      brands: [
        "linkedin",
        "github",
        "whatsapp",
        "square-js",
        "react",
        "facebook",
        "twitter",
        "dribbble",
      ],
      regular: ["file-lines"],
    },
  },
  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
  },
  pinia: {
    storesDirs: ["./stores/**"],
  }
});
