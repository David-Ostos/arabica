import type { localStoreDataUser } from '~/interfaces/localStore.dataUser';


export default defineNuxtRouteMiddleware(async(to, from) => {
  const useModals = useShowModalsStore()

  if (localStorage.getItem('dataUser') !== null) {
    const dataUserSaved: localStoreDataUser = await JSON.parse(localStorage.getItem('dataUser') ?? '{}')


    if (dataUserSaved.tipoUser !== 'comprador'){
      return navigateTo('/')
    }

    if(!dataUserSaved.perfilBase && to.fullPath === '/dashboard/comprador/usuario/informacionComercial'){
      useModals.textoModalNotidicaciones = 'Debes registrarte e introducir todos los datos requeridos para poder acceder a "Información Comercial".'
      useModals.openModalNotificacion = true
    return navigateTo(from.fullPath)

  }


    if (dataUserSaved.tipoUser === 'comprador' && !dataUserSaved.perfilBase && to.fullPath !== '/dashboard/comprador'){
      useModals.textoModalNotidicaciones = `Debes registrarte e introducir todos los datos requeridos para poder acceder a esta sección.`
      useModals.openModalNotificacion = true
      return navigateTo('/dashboard/comprador')
    }
  }else{
    return navigateTo('/')
  }
})
