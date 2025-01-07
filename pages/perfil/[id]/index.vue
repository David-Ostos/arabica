<template>
  
  <div class="grid grid-cols-3 gap-8 mx-4 md:mx-20 my-8">
    <div class="col-span-3 md:col-span-2 flex flex-col gap-4">
      <CompradorPerfilPanoramicaHistoria :nombre="profile?.nombre" :info="profile?.descripcion" />
      <CompradorPerfilPanoramicaMaps />
      <CompradorPerfilPanoramicaImagenesDestacadas/>

    </div>
    <div class="col-span-3 md:col-span-1 flex flex-col gap-4">
      <CompradorPerfilPanoramicaRelaciones :relaciones="profile?.relaciones" />
      <CompradorPerfilPanoramicaPrestigio :certificaciones="profile.certificaciones" :equipo="profile.equipo" :premios="profile.premios"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import 'ldrs/hourglass'
import { useProfile } from '~/composables/useProfile'
definePageMeta({
  layout: "perfil",
  middleware: "perfil"
})
const { profile, isLoading } = useProfile()



</script>