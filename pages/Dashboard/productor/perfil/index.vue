<script lang="ts" setup>
const useUser = useUserStore();
definePageMeta({
  layout: "productor",
  middleware: "productor",
});
</script>

<template>
  <div class="grid grid-cols-2 gap-12 mx-20 my-8">
    <div class="col-span-1"><ProductorPerfilPanoramicaHistoria /></div>
    <div class="col-span-1"><ProductorPerfilPanoramicaPrestigio /></div>
    <div class="col-span-1"><ProductorPerfilPanoramicaRelaciones /></div>
    <div class="col-span-1"><ProductorPerfilPanoramicaMaps /></div>
  </div>
</template>

<style scoped></style>
