/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        roboto: "Roboto",
        raleway: "Raleway",
      },
      height: {
        "screen-topBar-footer": "calc(100vh - 130px)",
      },
      transitionProperty: {
        width: "width",
        height: "height",
      },
      colors: {
        dark: {
          DEFAULT: "#232933",
        },
        prim: "#02AC66",
        secundary: "#707a89",
      },
      backgroundImage: {
        hero: "url('./public/img/arabicagc-1-1024x511.jpg",
        login: "url('./public/img/login.jpeg",
        registro: "url('./public/img/registro.jpg",
      },
    },
  },
  plugins: [],
};
