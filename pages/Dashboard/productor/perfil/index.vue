<script lang="ts" setup>
const useUser = useUserStore();
definePageMeta({
  layout: "productor",
  middleware: "productor",
});
</script>

<template>
  <div class="grid grid-cols-3 gap-8 mx-4 md:mx-20 my-8">
    <div class="col-span-3 md:col-span-2 flex flex-col gap-4">
      <ProductorPerfilPanoramicaHistoria />
      <ProductorPerfilPanoramicaMaps />
      <ProductorPerfilPanoramicaImagenesDestacadas />
    </div>
    <div class="col-span-3 md:col-span-1 flex flex-col gap-4">
      <ProductorPerfilPanoramicaRelaciones />
      <ProductorPerfilPanoramicaPrestigio />
    </div>

  </div>
</template>

<style scoped></style>
