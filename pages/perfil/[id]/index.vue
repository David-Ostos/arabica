<template>
  <div class="grid grid-cols-2 gap-12 mx-20 my-20">
    <div class="col-span-1"><CompradorPerfilPanoramicaHistoria :nombre="perfil?.nombre" :info="perfil?.descripcion" /></div>
    <div class="col-span-1">
      <CompradorPerfilPanoramicaPrestigio/>
      </div>
    <div class="col-span-1"><CompradorPerfilPanoramicaRelaciones :relaciones="perfil?.relaciones" /></div>
    <div class="col-span-1"><CompradorPerfilPanoramicaMaps /></div>
  </div>
</template>
<script setup lang="ts">
import type { PerfilProductor } from '~/interfaces/PerfilProductor';

definePageMeta({
  layout: "perfil",
  middleware: "perfil"
})
const useGlobal = useGlobalStore()
const perfil:PerfilProductor = useGlobal.perfilComercial

</script>