
export const useShowModalsStore = defineStore('showModals', () => {

  const showModalTipoGoogle = ref(false) 

  const showModalProductorPerfilCompleto = ref(false)
  const showModalCompradorPerfilCompleto = ref(false)
  const productorMuestraImg = ref(false)

  return {
    showModalTipoGoogle,
    showModalProductorPerfilCompleto,
    showModalCompradorPerfilCompleto,
    productorMuestraImg
  }
})
