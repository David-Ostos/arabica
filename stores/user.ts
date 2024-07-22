import type {User} from "~/interfaces/Users";
import {useProductorStore} from "./productor";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const useProductor = useProductorStore();

  const dataUser = ref({} as User);
  const logged = ref(false);

  const fetchDataUser = async () => {
    if (typeof window !== "undefined" && window.localStorage) {
      // código que usa localStorage
      if (localStorage.getItem("dataUser") !== null) {
        const dataUserSaved = await JSON.parse(
          localStorage.getItem("dataUser") ?? "{}"
        );
        try {
          const peticionUser = await fetch(
            `${
              import.meta.env.VITE_URL_API
            }/api/content/item/usuarios?filter={email:'${
              dataUserSaved.email
            }'}&populate=1&fields={"_state": false,"_modified": false,"_mby": false,"_created": false,"_cby": false,"verificacion": false,}`,
            {
              cache: "no-cache",
            }
          );

          const dataUserFetch = await peticionUser.json();

          if (dataUserFetch.perfilProductor !== null) {
            delete dataUserFetch.perfilProductor._state;
            delete dataUserFetch.perfilProductor._modified;
            delete dataUserFetch.perfilProductor._mby;
            delete dataUserFetch.perfilProductor._created;
            delete dataUserFetch.perfilProductor._cby;
            delete dataUserFetch.perfilProductor._model;
            delete dataUserFetch.perfilProductor.idUsuario;
          }

          if (dataUserFetch === undefined) {
            return false;
          } else if (dataUserFetch?.email !== undefined) {
            logged.value = true;
            if (dataUserFetch.perfilProductor !== null) {
              useProductor.perfilProductor = {
                ...dataUserFetch.perfilProductor,
              };
              delete dataUserFetch.perfilProductor;
            }

            dataUser.value = {
              ...dataUserFetch,
            };
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("hola");
        /**
         *
         * // todo:
         * aqui se puede agrergar logica si se quiere mostrar una informacion cuando el usuario inicie en la app
         *
         */

        // console.log('nay');
      }
    } else {
      return;
    }
  };

  const logout = () => {
    dataUser.value = {} as User;
    localStorage.clear();
    logged.value = false;
    router.push("/");
  };

  return {
    dataUser,
    logged,
    fetchDataUser,
    logout,
  };
});
