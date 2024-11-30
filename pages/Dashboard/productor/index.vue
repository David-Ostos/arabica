<script lang="ts" setup>
const useUser = useUserStore()
definePageMeta({
  middleware: 'productor',
  layout: 'productor'
})

const favoritos = useFavoritosStore();

favoritos.getFavoritos(useUser.dataUser._id!);
</script>

<template>
  <div  class="mx-8 md:mx-20 font-roboto mt-8 md:mt-0 mb-10">
    <ProductorDashboardDatosUser/>
    <ProductorDashboardVerifiquese v-if="!useUser.dataUser.verificado"/>
    <ProductorDashboardVerificado v-if="useUser.dataUser.verificado"/>
    <ProductorDashboardNotificaciones/>
    <ModalsProductorRegistroPerfil/>
  </div>

</template>

<style scoped></style>
