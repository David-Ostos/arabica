import { useUserStore } from '../stores/user';


export default defineNuxtRouteMiddleware(async (to, from) => {

  if (localStorage.getItem('dataUser') !== null) {
    const dataUserSaved = await JSON.parse(localStorage.getItem('dataUser') ?? '{}')

    console.log(dataUserSaved);
  
  }

  const useUser = useUserStore()
  // isAuthenticated() is an example method verifying if a user is authenticated
  console.log(  useUser.dataUser.tipoUser);

  if (useUser.dataUser.tipoUser !== 'productor'){
    return navigateTo('/')
  }
})
