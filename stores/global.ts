import axios from "axios";
import type { MyAxiosRequestConfig } from "~/interfaces/axios";

export interface TopLevel {
  name: string;
  dial_code: string;
  code: string;
  emoji: string;
}


export const useGlobalStore = defineStore("global",() => {
  const heightNav = ref();
  const isActiveSelectCodePhone = ref(false)




/*  const codeCountry1 = Object.entries(codeCountry1).map(([code, { name, dial_code, emoji }]) => ({
    code: dial_code,
    bandera: emoji,
    name: name.toLowerCase()
})); */



/* console.log(codeCountry);

  codeCountry.forEach(codigo => {
    console.log({codigo});
    addNewFieldDB("codigoPais", "codigo", {codigo} )
  }) */

  // este codigo esta para modificar los datos de los lotes por si se agrego un nuevo campo a la base de datos
  // addNewFieldDB("codigoPais", "codigo", ); // aqui agregas los valores del modelo, el campo que deseas agregar y el valor
  // async function addNewFieldDB(model: any, dato: string, valor: any) {
  //   try {
  //     await axios
  //       .get(`${import.meta.env.VITE_URL_API}/api/content/items/${model}`, {
  //         headers: {
  //           "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
  //         },
  //         cache: "no-cache",
  //       } as MyAxiosRequestConfig)
  //       .then( async(res) => {
  //       //   console.log(res.data);

  //       //   res.data.forEach(async (model: any) => {
  //       //     const data = { _id: model._id, [dato]: valor };
  //       //     if (model[dato]) {
  //       //       try {
  //       //         await axios({
  //       //           url: `${import.meta.env.VITE_URL_API}/api/content/item/${model}`,
  //       //           method: "POST",
  //       //           mode: "cors",
  //       //           headers: {
  //       //             "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
  //       //           },
  //       //           data: { data }
  //       //         } as MyAxiosRequestConfig)
  //       //           .then((res) => console.log(res))
  //       //           .catch((err) => console.log(err));
  //       //       } catch (error) {
  //       //         console.log(error);
  //       //       }
  //       //     }
  //       //   });
  //       // }else{

  //       // si se esta agregando campos nuevos
  //         /* await axios({
  //           url: `${import.meta.env.VITE_URL_API}/api/content/item/${model}`,
  //           method: "POST",
  //           mode: "cors",
  //           headers: {
  //             "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
  //           },
  //           data: { data: valor }
  //         } as MyAxiosRequestConfig)
  //           .then((res) => console.log(res))
  //           .catch((err) => console.log(err)); */
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return {
    heightNav,
    isActiveSelectCodePhone
  };
});
