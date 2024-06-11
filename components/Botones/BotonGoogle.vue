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
// import { fetchDataUser } from '@/helpers/functionGlobal';
import {useUserStore} from "@/stores/user";
import type {User} from "~/interfaces/Users";
import {GoogleSignInButton, type CredentialResponse} from "vue3-google-signin";
import verificarEmail from "~/utils/login";


// handle success event
const handleLoginSuccess = (response: CredentialResponse) => {
  const {credential} = response;
  console.log("Access Token", credential);
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
    console.log(responsePayload);

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


</script>
<style scoped></style>
