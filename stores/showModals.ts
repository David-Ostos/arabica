
export const useShowModalsStore = defineStore('showModals', () => {

  const showModalTipoGoogle = ref(false) 

  const showModalProductorPerfilCompleto = ref(false)
  const showModalCompradorPerfilCompleto = ref(false)
  const productorMuestraImg = ref(false)
  const openModalNotificacion = ref(false)
  const textoModalNotidicaciones = ref('')

  return {
    showModalTipoGoogle,
    showModalProductorPerfilCompleto,
    showModalCompradorPerfilCompleto,
    productorMuestraImg,
    openModalNotificacion,
    textoModalNotidicaciones 
  }
})
