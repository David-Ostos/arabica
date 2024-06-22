import { useUserStore } from '../stores/user';

const useUser = useUserStore()

export const capitalizeFirstLetter = (string:string) => {
  return string.replace(/\b\w/g, char => char.toUpperCase());
}

export const fetchDataUser = async () => {

  if (localStorage.getItem('dataUser') != null) {
    const dataUserSaved = await JSON.parse(localStorage.getItem('dataUser') ?? '{}')

    try {
      console.log(`${import.meta.env.VITE_URL_API}/api/content/items/usuarios?filter={email:'${dataUserSaved.email}'}`);
      const peticionUser = await fetch(
        `${import.meta.env.VITE_URL_API}/api/content/items/usuarios?filter={email:'${dataUserSaved.email}'}`,
        {
          cache: 'no-cache'
        }
      )

      const dataUserFetch = await peticionUser.json()

      console.log(dataUserFetch)
      if (dataUserFetch === undefined) return
      if (dataUserFetch?.correoAsociado != undefined) {
        useUser.logged = true
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

        useUser.dataUser = {
          ...dataUserFetch 
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}