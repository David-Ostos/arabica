import { toast } from "vue3-toastify"
import type { localStoreDataUser } from "~/interfaces/localStore.dataUser"


export default defineNuxtRouteMiddleware(async (to, from) => {
  const useModals = useShowModalsStore()


  if (localStorage.getItem('dataUser') !== null) {
    const dataUserSaved: localStoreDataUser = await JSON.parse(localStorage.getItem('dataUser') ?? '{}')

    if (dataUserSaved.tipoUser !== 'productor'){
      return navigateTo('/')
    }

    console.log(to.fullPath === '/dashboard/productor/usuario/informacionComercial');
    console.log(dataUserSaved.tipoUser);

    if(!dataUserSaved.perfilBase && to.fullPath === '/dashboard/productor/usuario/informacionComercial'){
        useModals.textoModalNotidicaciones = 'Debes registrarte e introducir todos los datos requeridos para poder acceder a "Información Comercial".'
        useModals.openModalNotificacion = true
      return navigateTo(from.fullPath)

    }

    
    if(!dataUserSaved.perfilBase && to.fullPath !== '/dashboard/productor' && to.fullPath !== '/dashboard/productor/lotes' && !to.fullPath.includes('/dashboard/productor/usuario')){
      if(to.fullPath === '/dashboard/productor/perfil'){
        useModals.textoModalNotidicaciones = 'Debes registrarte e introducir todos los datos requeridos para poder acceder al perfil.'
        useModals.openModalNotificacion = true
      }
      return navigateTo('/dashboard/productor')
    }
  }else{
    return navigateTo('/')
  }
})
