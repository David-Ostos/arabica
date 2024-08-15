import type { localStoreDataUser } from '~/interfaces/localStore.dataUser';
import { useUserStore } from '../stores/user';


export default defineNuxtRouteMiddleware(async(to, from) => {

  if (localStorage.getItem('dataUser') !== null) {
    const dataUserSaved: localStoreDataUser = await JSON.parse(localStorage.getItem('dataUser') ?? '{}')

    if (dataUserSaved.tipoUser !== 'comprador'){
      return navigateTo('/')
    }/* 
    if (dataUserSaved.tipoUser === 'comprador' && !dataUserSaved.perfilBase && to.fullPath !== '/dashboard/comprador'){
      return navigateTo('/dashboard/comprador')
    } */
  }else{
    return navigateTo('/')
  }
})
