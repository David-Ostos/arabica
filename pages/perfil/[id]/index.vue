<template>
  
  <div class="grid grid-cols-2 gap-12 mx-4 md:mx-20 my-8">
    <div class="col-span-2 md:col-span-1"><CompradorPerfilPanoramicaHistoria :nombre="profile?.nombre" :info="profile?.descripcion" /></div>
    <div class="col-span-2 md:col-span-1"><CompradorPerfilPanoramicaPrestigio :certificaciones="profile.certificaciones" :equipo="profile.equipo" :premios="profile.premios"/></div>
    <div class="col-span-2 md:col-span-1"><CompradorPerfilPanoramicaRelaciones :relaciones="profile?.relaciones" /></div>
    <div class="col-span-2 md:col-span-1"><CompradorPerfilPanoramicaMaps /></div>
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