
export const useShowModalsStore = defineStore('showModals', () => {

  const showModalTipoGoogle = ref(false) 

  const showModalProductorPerfilCompleto = ref(false)

  return {
    showModalTipoGoogle,
    showModalProductorPerfilCompleto
  }
})
