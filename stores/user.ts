import type { User } from "~/interfaces/Users";
import { useProductorStore } from "./productor";
import type { localStoreDataUser } from "~/interfaces/localStore.dataUser";
import type { LotesProductor } from "~/interfaces/PerfilProductor";
import type { Lotes } from "~/interfaces/Lotes";
import { toast } from "vue3-toastify";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const useProductor = useProductorStore();
  const useComprador = useCompradorStore();
  const useLotes = useLotesStore();

  const dataUser = ref({} as User);
  const logged = ref(false);

  const fetchDataUser = async () => {
    if (typeof window !== "undefined" && window.localStorage) {
      // código que usa localStorage
      if (localStorage.getItem("dataUser") !== null) {
        let dataUserSaved: localStoreDataUser = await JSON.parse(
          localStorage.getItem("dataUser") ?? "{}"
        );
        try {
          const peticionUser = await fetch(
            `${
              import.meta.env.VITE_URL_API
            }/api/content/items/usuarios?filter={email:'${
              dataUserSaved.email
            }'}&populate=1&fields={"_state": false,"_modified": false,"_mby": false,"_created": false,"_cby": false,"verificacion": false,}`,
            {
              cache: "no-cache",
              headers: {
                "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
              },
            }
          );

          const dataUserFetch = (await peticionUser.json())[0];
          if (!dataUserFetch) {
            toast.error("Usuario no encontrado", {
              onClose: () => {
                localStorage.clear();
                router.push("/");
              },
            });
          }

          console.log(dataUserFetch);

          dataUserSaved = {
            email: dataUserFetch.email,
            logged: true,
            picture: dataUserFetch.picture,
            tipoUser: dataUserFetch.tipoUser,
            verificado: dataUserFetch.verificado,
            perfilBase: dataUserFetch.perfilBase,
            perfilCompleto: dataUserFetch.perfilCompleto,
          };
          localStorage.clear();
          localStorage.setItem("dataUser", JSON.stringify(dataUserSaved));

          if (dataUserFetch.perfilProductor !== null) {
          }

          if (dataUserFetch === undefined) {
            return false;
          }
          if (
            dataUserFetch?.email !== undefined &&
            dataUserFetch?.perfilProductor
          ) {
            console.log("entro en productor");
            delete dataUserFetch.perfilProductor._state;
            delete dataUserFetch.perfilProductor._modified;
            delete dataUserFetch.perfilProductor._mby;
            delete dataUserFetch.perfilProductor._created;
            delete dataUserFetch.perfilProductor._cby;
            delete dataUserFetch.perfilProductor._model;
            delete dataUserFetch.perfilProductor.idUsuario;
            logged.value = true;
            console.log(dataUserFetch);
            useProductor.perfilProductor = {
              ...dataUserFetch.perfilProductor,
            };

            console.log(useProductor.perfilProductor);
            delete dataUserFetch.perfilProductor;
          }

          if (
            dataUserFetch?.email !== undefined &&
            dataUserFetch?.perfilComprador
          ) {
            delete dataUserFetch.perfilComprador._state;
            delete dataUserFetch.perfilComprador._modified;
            delete dataUserFetch.perfilComprador._mby;
            delete dataUserFetch.perfilComprador._created;
            delete dataUserFetch.perfilComprador._cby;
            delete dataUserFetch.perfilComprador._model;
            delete dataUserFetch.perfilComprador.idUsuario;
            logged.value = true;
            console.log(dataUserFetch);
            useComprador.perfilComprador = {
              ...dataUserFetch.perfilComprador,
            };
            delete dataUserFetch.perfilComprador;
          }

          dataUser.value = {
            ...dataUserFetch,
          };
          console.log(dataUser.value);
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
    useProductor.perfilProductor = {};
    useProductor.lotes = [] as LotesProductor;
    useLotes.lotes = [] as Lotes[];
    localStorage.clear();
    logged.value = false;
    toast.info("Has cerrado seción", {
      onClose: (event) => {
        router.push("/");
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      },
    });
  };

  return {
    dataUser,
    logged,
    fetchDataUser,
    logout,
  };
});
