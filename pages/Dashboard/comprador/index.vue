<script lang="ts" setup>

definePageMeta({
  middleware: "comprador",
  layout: "comprador",
});
const useUser = useUserStore();
const useGlobal = useGlobalStore()
const containerStyles = computed(() => ({
  'max-height': `calc(100vh - (${useGlobal.heightNavComprador}px + ${useGlobal.heightFooterProductor}px) )`

}))
</script>

<template>
  <div :style="containerStyles" class="mx-4 md:mx-20 font-roboto mb-10 h-screen">
    <CompradorDashboardDatosUser />
    <CompradorDashboardVerifiquese v-if="!useUser.dataUser.verificado" />
    <CompradorDashboardVerificado v-if="useUser.dataUser.verificado" />
    <CompradorDashboardNotificaciones />
    <ModalsCompradorRegistroPerfil />
  </div>
</template>

<style scoped></style>
