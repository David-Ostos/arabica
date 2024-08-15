import type { localStoreDataUser } from "~/interfaces/localStore.dataUser"


export default defineNuxtRouteMiddleware(async (to, from) => {


  if (localStorage.getItem('dataUser') !== null) {
    const dataUserSaved: localStoreDataUser = await JSON.parse(localStorage.getItem('dataUser') ?? '{}')

    if (dataUserSaved.tipoUser !== 'productor'){
      return navigateTo('/')
    }
    if (dataUserSaved.tipoUser === 'productor' && !dataUserSaved.perfilBase && to.fullPath !== '/dashboard/productor'){
      return navigateTo('/dashboard/productor')
    }
  }else{
    return navigateTo('/')
  }
})
