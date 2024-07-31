import { defineStore } from 'pinia'
import type { Lotes } from '~/interfaces/Lotes'

export const useLotesStore = defineStore('lotes', () => {

const useProductor = useProductorStore();
const useUser = useUserStore()


  const lotes:Ref<Lotes[]> = ref([
    {
      _id: '1',
      nombre: "Fazendas Dutra Organic Natural, 15up, Single Origin, RFA",
      origen: "chavin",
      departamento: "piura",
      variedad: "geisha",
      proceso: "sueves washing",
      score: "80-90+",
      perfil: "floral",
      lotsQuantity: "lotes completos",
      certificaciones: "organic",
      pais: "peru",
      precio: 10.23,
      descripcion: "",
      galeria: ["https://cockpit.arabicagc.com/assets/link/894398f73337377bca00009b","https://cockpit.arabicagc.com/assets/link/89439adf3165302dda000092"],
      productor: {
        _id: useProductor.perfilProductor._id,
        nombre: useProductor.perfilProductor.nombre,
        picture: useUser.dataUser.picture
      },
      pruebaGratis: true,
    },
    {
      _id: '2',
      nombre: "Fazendas Dutra Organic Natural, 15up, Single Origin, RFA",
      origen: "chavin",
      departamento: "piura",
      variedad: "geisha",
      proceso: "sueves washing",
      score: "80-90+",
      perfil: "floral",
      lotsQuantity: "lotes completos",
      certificaciones: "organic",
      pais: "peru",
      precio: 10.23,
      descripcion: "",
      galeria: ["https://cockpit.arabicagc.com/assets/link/89439ae133356380570001cc"],
      productor: {
        _id: useProductor.perfilProductor._id,
        nombre: useProductor.perfilProductor.nombre,
        picture: useUser.dataUser.picture
      },
      pruebaGratis: false,
    },
    {
      _id: '3',
      nombre: "Fazendas Dutra Organic Natural, 15up, Single Origin, RFA",
      origen: "chavin",
      departamento: "piura",
      variedad: "geisha",
      proceso: "sueves washing",
      score: "80-90+",
      perfil: "floral",
      lotsQuantity: "lotes completos",
      certificaciones: "organic",
      pais: "peru",
      precio: 10.23,
      descripcion: "",
      galeria: ["https://cockpit.arabicagc.com/assets/link/8943997b61646385de000184"],
      productor: {
        _id: useProductor.perfilProductor._id,
        nombre: useProductor.perfilProductor.nombre,
        picture: useUser.dataUser.picture
      },
      pruebaGratis: true,
    },
    {
      _id: '4',
      nombre: "Fazendas Dutra Organic Natural, 15up, Single Origin, RFA",
      origen: "chavin",
      departamento: "piura",
      variedad: "geisha",
      proceso: "sueves washing",
      score: "80-90+",
      perfil: "floral",
      lotsQuantity: "lotes completos",
      certificaciones: "organic",
      pais: "peru",
      precio: 10.23,
      descripcion: "",
      galeria: ["https://cockpit.arabicagc.com/assets/link/89439adf3165302dda000092"],
      productor: {
        _id: useProductor.perfilProductor._id,
        nombre: useProductor.perfilProductor.nombre,
        picture: useUser.dataUser.picture
      },
      pruebaGratis: false,
    },
  ]) 

  return{
    lotes
  }
})
