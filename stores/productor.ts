import { defineStore } from 'pinia'
import type { Lotes } from '~/interfaces/Lotes'
import type { Equipo, PerfilProductor } from '~/interfaces/PerfilProductor'

export const useProductorStore = defineStore('productor', () =>{
  const lotes = ref({} as Lotes)
  const perfilProductor = ref({} as PerfilProductor)
  const editPerfil = ref({} as PerfilProductor)
  const equipoUpdate = ref({} as Equipo)

  return{
    lotes,
    perfilProductor,
    editPerfil,
    equipoUpdate
  }
})