import { useUserStore } from '../stores/user';


export default defineNuxtRouteMiddleware(async(to, from) => {
  
  const useUser = await useUserStore()
  // isAuthenticated() is an example method verifying if a user is authenticated
  console.log(  useUser.dataUser.tipoUser);
  if (useUser.dataUser.tipoUser !== 'comprador' ) {
    return navigateTo('/')
  }
})
