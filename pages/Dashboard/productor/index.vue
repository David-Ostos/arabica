<script lang="ts" setup>
const useUser = useUserStore()
definePageMeta({
  middleware: 'productor',
  layout: 'productor'
})
</script>

<template>
  <div class="pb-96 mx-4 md:mx-20 font-roboto">
    <ProductorDashboardDatosUser/>
    <ProductorDashboardVerifiquese v-if="!useUser.dataUser.verificado"/>
    <ProductorDashboardVerificado v-if="useUser.dataUser.verificado"/>
    <ProductorDashboardNotificaciones/>
    <ModalsProductorRegistroPerfil/>
  </div>

</template>

<style scoped></style>
