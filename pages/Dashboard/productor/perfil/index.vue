<script lang="ts" setup>
const useUser = useUserStore();
definePageMeta({
  layout: "productor",
  middleware: "productor",
});


</script>

<template>
  <div class="mt-8 mx-10">
    <div class="flex gap-12 justify-between">
     <ProductorPerfilPanoramicaHistoria/>
     <ProductorPerfilPanoramicaPrestigio/>
    </div>
    <div class="flex gap-12 justify-between">
      <ProductorPerfilPanoramicaRelaciones/>
      <ProductorPerfilPanoramicaMaps/>
    </div>
  </div>
</template>

<style scoped></style>
