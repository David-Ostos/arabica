<script lang="ts" setup>
import { useFavoritosStore } from "../../../stores/favoritos";
definePageMeta({
  middleware: "comprador",
  layout: "comprador",
});

const useUser = useUserStore();
const favoritos = useFavoritosStore();

</script>

<template>
  <div class="mx-4 md:mx-20 font-roboto mb-10">
    <CompradorDashboardDatosUser />
    <CompradorDashboardVerifiquese v-if="!useUser.dataUser.verificado" />
    <CompradorDashboardVerificado v-if="useUser.dataUser.verificado" />
    <CompradorDashboardNotificaciones />
    <ModalsCompradorRegistroPerfil />
  </div>
</template>

<style scoped></style>
