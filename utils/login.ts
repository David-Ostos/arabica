import type { User } from "~/interfaces/Users";

const toast = useToast();
const router = useRouter();
const useUser = useUserStore();

export default async function verificarEmail(data: any) {
  //AQUI HACES UN FETCH PARA VERIFICAR EL EMAIL


  try {
    const correoVerificado = await fetch(
      `${import.meta.env.VITE_URL_API}/api/content/items/usuarios?filter={email:'${data.email}'}`,
      {
        headers: {
          "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
        },
        cache: "no-cache",
      }
    );

    const dataUserFetch: User = await correoVerificado.json();


    if (dataUserFetch?.email != undefined) {
      const dataUserSaved = {
        email: dataUserFetch?.email,
        picture: data.picture,
      };

      localStorage.clear();
      localStorage.setItem("dataUser", JSON.stringify(dataUserSaved));

      // await fetchDataUser()
      if (dataUserFetch.tipoUser === "comprador")
        router.push("/compradores/perfil");
      }else if (dataUserFetch.tipoUser === "productor") {
        router.push("/productores/perfil"); 
        }
    else {
      router.push("/auth/registro")

      
        toast.add({
          id: 'Usuario no registrado',
          title: 'No estas registrado',
          color: 'yellow',
          description: 'registrate para que seas parte de nuestra red.',
          icon: 'i-heroicons-exclamation-circle-16-solid',
          timeout: 5000,
          // actions: [{
          //   label: 'Restart',
          //   click: () => {
      
          //   }
          // }]
        })
    }
  } catch (error) {
    console.log(error);
  }
}
