import { defineStore } from 'pinia'
import type { PerfilComprador } from '../interfaces/PerfilComprador';

export const useCompradorStore = defineStore('comprador', ()=>{

  const perfilComprador = ref({} as PerfilComprador)

  return{
    perfilComprador
  }
})
