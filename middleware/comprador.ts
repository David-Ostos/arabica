import { useUserStore } from '../stores/user';


export default defineNuxtRouteMiddleware(async(to, from) => {
  if (localStorage.getItem('dataUser') !== null) {
    const dataUserSaved = await JSON.parse(localStorage.getItem('dataUser') ?? '{}')

    console.log(dataUserSaved.tipoUser);
    if (dataUserSaved.tipoUser !== 'comprador'){
      return navigateTo('/')
    }
  }else{
    return navigateTo('/')
  }
})
