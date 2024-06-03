// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    '@formkit/auto-animate/nuxt',
    '@nuxt/image',
    ['@nuxtjs/google-fonts',{
      overwriting: true,
      families: {
        Roboto: true,
          Inter: [400, 700],
          'Josefin+Sans': true,
          Lato: [100, 300],
        Raleway: {
          wght: [100, 400],
          ital: [100]
        }
      }
    }],
    "@vesp/nuxt-fontawesome",
    "@nuxt/fonts",
    'nuxt-vue3-google-signin'
  ],
  googleSignIn: {
    clientId: import.meta.env.VITE_GOOGLE_ID,
  },
  app: {
    head:{
      script:[
        {src: "https://accounts.google.com/gsi/client", async: true}
      ],
      meta:[
        {property: "og:title", content: import.meta.env.VITE_NOMBRE},
        {property: "og:description", content: import.meta.env.VITE_DESCRIPCION},
        {property: "og:image", content: "/public/img/arabicagc-1-1024x511.jpg"},
        {property: "og:url", content: "https://davidostos.netlify.app/"}

      ]
    }
  },
  fontawesome: {
    icons: {
      solid: ['percent','users','chart-pie','caret-up','sort-down', 'chart-bar','moon', 'sun', 'bars','circle-down', 'map-marker', 'briefcase','house'],
      brands: ['linkedin', 'github', 'whatsapp','square-js', 'react', 'facebook', 'twitter', 'dribbble'],
      regular: ['file-lines']
    }
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: ''
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
})