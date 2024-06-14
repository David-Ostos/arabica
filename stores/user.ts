import type { User } from "~/interfaces/Users"

export const useUserStore = defineStore('user', () => {

  const dataUser = ref({} as User)
  const logged = ref(false)

  const fetchDataUser = async () => {

    if (localStorage.getItem('dataUser') != null) {
      const dataUserSaved = await JSON.parse(localStorage.getItem('dataUser') ?? '{}')
  
      try {
        const peticionUser = await fetch(
          `https://cockpit.arabicagc.com/api/content/items/usuarios?filter={email:'${dataUserSaved.email}'}`,
          {
            cache: 'no-cache'
          }
        )
  
        const dataUserFetch = await peticionUser.json()
  
        console.log(dataUserFetch)
        if (dataUserFetch === undefined) return
        if (dataUserFetch?.correoAsociado != undefined) {
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
          console.log(dataUser.value);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return {
    dataUser,
    logged,
    fetchDataUser
  }

})