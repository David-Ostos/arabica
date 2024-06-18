import type { User } from "~/interfaces/Users"

export const useUserStore = defineStore('user', () => {

  const dataUser = ref({} as User)
  const logged = ref(false)

  const fetchDataUser = async () => {

    if (localStorage.getItem('dataUser') !== null) {
      const dataUserSaved = await JSON.parse(localStorage.getItem('dataUser') ?? '{}')
  
      try {
        const peticionUser = await fetch(
          `${import.meta.env.VITE_URL_API}/api/content/item/usuarios?filter={email:'${dataUserSaved.email}'}`,
          {
            cache: 'no-cache'
          }
        )
  
        const dataUserFetch = await peticionUser.json()
  
        if (dataUserFetch === undefined) return
        if (dataUserFetch?.email != undefined) {
          logged.value = true
          const {
            _id,
            nombre,
            apellido,
            email,
            password,
            tipoUser,
            tipoLogin,
            picture,
          } = await dataUserFetch
  
          dataUser.value = {
            ...dataUserFetch 
          }
          // console.log(dataUser.value);
        }
      } catch (error) {
        console.log(error)
      }
    }else{
      /**
       * 
       * // todo:
       * aqui se puede agrergar logica si se quiere mostrar una informacion cuando el usuario inicie en la app 
       * 
       */

      // console.log('nay');
    }
  }

  return {
    dataUser,
    logged,
    fetchDataUser
  }

})