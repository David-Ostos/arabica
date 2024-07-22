import { defineStore } from 'pinia'
import type { Lotes } from '~/interfaces/Lotes'
import type { PerfilProductor } from '~/interfaces/PerfilProductor'

export const useProductorStore = defineStore('productor', () =>{
  const lotes = ref({} as Lotes)
  const perfilProductor = ref({} as PerfilProductor)

  return{
    lotes,
    perfilProductor,
  }
})