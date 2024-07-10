<script lang="ts" setup>
const useUser = useUserStore()
definePageMeta({
  middleware: 'productor',
  layout: 'productor'
})
console.log(useUser.dataUser);
</script>

<template>
  <div class="pb-96 mx-4 md:mx-20 font-roboto">
    <ProductorDashboardDatosUser/>
    <ProductorDashboardVerifiquese v-if="!useUser.dataUser.verificado"/>
    <ProductorDashboardNotificaciones/>
    <ModalsProductorVerificarse/>
  </div>

</template>

<style scoped></style>
