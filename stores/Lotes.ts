import { defineStore } from 'pinia'
import type { Lotes } from '~/interfaces/Lotes'
import axios from 'axios'

export const useLotesStore = defineStore('lotes', () => {

const useProductor = useProductorStore();
const useUser = useUserStore()


  const lotes:Ref<Lotes[]> = ref([]) 

  async function getDataLotes(){

    try {
      await axios.get(`${import.meta.env.VITE_URL_API}/api/content/items/lotes?fields={"_state": false,"_modified": false,"_mby": false,"_created": false,"_cby": false,"verificacion": false,}`,{
        headers: {
          "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
        },
        
      })
      .then( async (res) =>{
        lotes.value = res.data;

        // este codigo esta para modificar los datos de los lotes por si se agrego un nuevo campo a la base de datos

        // console.log(res.data);

        // lotes.value.forEach( async (lote) =>{
        //   let muestra;
        //   console.log(lote);
        //   if(lote.pruebaGratis){
        //     muestra = {
        //       muestra: true,
        //       muestraGratis: true,
        //       precio: 0,
        //       cantidad: 1
        //     }
        //   }
        //   await axios.post(`${import.meta.env.VITE_URL_API}/api/content/item/lotes`,
        //     // @ts-ignore
        //     {
        //       data:  {"_id": lote._id, "muestra": muestra },
        //     },{
        //       headers: {
        //         "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
        //         "Content-Type": "application/json",
        //       },
        //     }
        //   ).then(res => console.log(res.data)).catch(err => console.log(err))
        // })

        /* lotes.value.forEach( async (lote) => {
          console.log({data: {_id: lote._id, ocultar: false}});
          if(!lote.ocultar){
            await axios.post(`${import.meta.env.VITE_URL_API}/api/content/item/lotes`,
              // @ts-ignore
              {
                data:  {"_id": lote._id, "ocultar": false},
              },{
                headers: {
                  "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
                  "Content-Type": "application/json",
                },
              }
            ).then(res => console.log(res.data)).catch(err => console.log(err))
          }
        }) */
      })
      
    } catch (error) {
      console.log(error);
    }

  }

  return{
    lotes,
    getDataLotes
  }
})
