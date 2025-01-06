<script lang="ts" setup>
const useUser = useUserStore()
definePageMeta({
  middleware: 'productor',
  layout: 'productor'
})
const useGlobal = useGlobalStore()
const containerStyles = computed(() => ({
  'max-height': `calc(100vh - (${useGlobal.heightNavProductor}px * 2))`

}))


const favoritos = useFavoritosStore();

</script>

<template>
  <div :style="containerStyles"  class="mx-8 md:mx-20 font-roboto mt-8 md:mt-0 mb-10 h-screen">
    <ProductorDashboardDatosUser/>
    <ProductorDashboardVerifiquese v-if="!useUser.dataUser.verificado"/>
    <ProductorDashboardVerificado v-if="useUser.dataUser.verificado"/>
    <ProductorDashboardNotificaciones/>
    <ModalsProductorRegistroPerfil/>
  </div>

</template>

<style scoped></style>
