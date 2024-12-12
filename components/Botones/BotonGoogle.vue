<template>
  <div>
    <GoogleSignInButton
      @success="handleLoginSuccess"
      @error="handleLoginError"
      size="mediun"
      shape="pill"
      text="Iniciar Sesión con Google"
      width="300"
      auto-select="false"
      type="icon"
    ></GoogleSignInButton>
  </div>
</template>

<script setup lang="ts">
import {GoogleSignInButton, type CredentialResponse} from "vue3-google-signin";
import {useUserStore} from "@/stores/user";
import {useShowModalsStore} from "@/stores/showModals";
import type {User} from "~/interfaces/Users";

const props = defineProps({
  tipoUser: String,
});

const toast = useToast();
const router = useRouter();
const ShowModalsStore = useShowModalsStore();
const useUser = useUserStore();

// handle success event
const handleLoginSuccess = (response: CredentialResponse) => {
  const {credential} = response;
  login(credential);
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};

function jwt_decode(token: any) {
  try {
    const payload = JSON.parse(window.atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    console.warn("Error al decodificar el token");
    return null;
  }
}

async function login(response: any) {
  try {
    const responsePayload = await jwt_decode(response);
    const {sub, name, given_name, family_name, picture, email} =
      responsePayload;

    await verificarEmail({
      sub,
      name,
      given_name,
      family_name,
      picture,
      email,
    });
  } catch (error) {
    console.log(error);
  }
}

async function verificarEmail(data: any) {
  //AQUI HACES UN FETCH PARA VERIFICAR EL EMAIL

  try {
    const correoVerificado = await fetch(
      `${
        import.meta.env.VITE_URL_API
      }/api/content/item/usuarios?filter={email:'${data.email}'}`,
      {
        cache: "no-cache",
        headers: {
          "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
        },
      }
    );
    if (correoVerificado.status === 404) {
      useUser.dataUser = {
        nombre: data.given_name,
        apellido: data.family_name,
        email: data.email,
        picture: data.picture,
        tipoLogin: ["google"],
        verificado: false,
        perfilCompleto: false,
        perfilBase: false
      };
      ShowModalsStore.showModalTipoGoogle = true;
      return;
    }else{
      const dataUserFetch: User = await correoVerificado.json();
  
      const dataUserSaved = {
        email: dataUserFetch?.email
      };
  
      localStorage.clear();
      localStorage.setItem("dataUser", JSON.stringify(dataUserSaved));
  
      await useUser.fetchDataUser().then(() => router.push(`/dashboard/${dataUserFetch.tipoUser}`));
    }
  } catch (error) {
    console.log(error);
  }
}
</script>
<style scoped></style>