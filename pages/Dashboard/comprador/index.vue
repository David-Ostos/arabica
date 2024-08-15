<script lang="ts" setup>
definePageMeta({
  middleware: "comprador",
  layout: "comprador",
});

const useUser = useUserStore();

console.log(useUser.dataUser);


</script>

<template>
  <div class="mx-4 md:mx-20 font-roboto mb-10">
    <CompradorDashboardDatosUser/>
    <CompradorDashboardVerifiquese v-if="!useUser.dataUser.verificado"/>
    <CompradorDashboardVerificado v-if="useUser.dataUser.verificado"/>
    <CompradorDashboardNotificaciones/>
    <ModalsCompradorRegistroPerfil/>
  </div>
</template>

<style scoped></style>
