import { defineStore } from 'pinia'
import type { Lotes } from '~/interfaces/Lotes'
import type { Equipo, PerfilProductor, Premios ,Certificaciones} from '~/interfaces/PerfilProductor'

export const useProductorStore = defineStore('productor', () =>{
  const lotes = ref({} as Lotes)
  const perfilProductor = ref({} as PerfilProductor)
  const editPerfil = ref({} as PerfilProductor)
  const equipoUpdate = ref([] as Equipo[])
  const certificacionesUpdate = ref([] as Certificaciones[])
  const premiosUpdate = ref([] as Premios[])

  return{
    lotes,
    perfilProductor,
    editPerfil,
    equipoUpdate,
    certificacionesUpdate,
    premiosUpdate
  }
})