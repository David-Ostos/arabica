
export const useShowModalsStore = defineStore('showModals', () => {

  const showModalTipoGoogle = ref(false) 

  const showModalProductorVerificate = ref(false)

  return {
    showModalTipoGoogle,
    showModalProductorVerificate
  }
})
