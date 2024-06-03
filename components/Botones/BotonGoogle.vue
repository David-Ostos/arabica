<template>
  <div>
    <GoogleSignInButton 
      class="rounded-md"
      @success="handleLoginSuccess"
      @error="handleLoginError"
    />
  </div>
</template>

<script setup lang="ts">
// import { fetchDataUser } from '@/helpers/functionGlobal';
import { useUserStore } from '@/stores';
import type { User } from '~/interfaces/Users';
const router = useRouter()
const useUser = useUserStore()
/* setTimeout(() => {
  if(useUser.logged === true){
    router.push({ name: 'home'})
  }
},400) */

import {
  GoogleSignInButton,
  type CredentialResponse,
} from "vue3-google-signin";

// handle success event
const handleLoginSuccess = (response: CredentialResponse) => {
  const { credential } = response;
  console.log("Access Token", credential);
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};

function jwt_decode(token: any) {
  try {
    const payload = JSON.parse(window.atob(token.split('.')[1]))
    return payload
  } catch (error) {
    console.warn('Error al decodificar el token')
    return null
  }
}

async function login(response: any) {
  try {
    const responsePayload = await jwt_decode(response.credential)

    const { sub, name, given_name, family_name, picture, email } = responsePayload

    await verificarEmail({
      sub,
      name,
      given_name,
      family_name,
      picture,
      email
    })
  } catch (error) {
    console.log(error)
  }
}

async function verificarEmail(data: any) {
  //AQUI HACES UN FETCH PARA VERIFICAR EL EMAIL

  try {
    const correoVerificado = await fetch(
      `https://cockpit.arabicagc.com/api/content/items/usuarios?filter={email:'${data.email}'}`,
      {
        cache: 'no-cache'
      }
    )

    const dataUserFetch: User = await correoVerificado.json()

    //console.log(dataUser);

    if (dataUserFetch?.email != undefined) {
      const dataUserSaved = {
        email: dataUserFetch?.email,
        picture: data.picture
      }

    localStorage.clear()
    localStorage.setItem('dataUser', JSON.stringify(dataUserSaved))

    // await fetchDataUser()
    if(dataUserFetch.tipoUser === 'comprador')
      router.push('/compradores/perfil')
    }else if (dataUserFetch.tipoUser === 'productor'){
      router.push('/productores/perfil')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
<style scoped >

</style>