/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    fontFamily: {
      roboto: "Roboto",
      raleway: "Raleway",
    },
    extend: {
      colors: {
        dark: {
          DEFAULT: "rgb(17 25 40)",
        },
        prim: "#02AC66",
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
