<template>
    <div 
      v-if="$route.path.includes('perfil')"
      class="rounded-b-3xl shadow-lg"
    >
    <CompradorPerfilIndexPortada />

    <div class="mx-8 md:mx-20">
      <CompradorPerfilIndexAvatar 
        :picture="profile?.logo" 
        :nombre="profile?.nombre" 
        :origen="profile?.origen"
        :tipo-productor="profile?.tipoProductor"
        :redes="profile?.redes"
      />
      <CompradorPerfilHorizontalNavigation />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PerfilProductor } from '~/interfaces/PerfilProductor';
import { useProfile } from '~/composables/useProfile'

const { profile } = useProfile()
const useGlobal = useGlobalStore()
const perfil:Ref<PerfilProductor | undefined> = ref()

const loadPerfil = ref(true)


async function getDatosPerfil(){
  // await useGlobal.getPerfil(route.params.id as string)
  // .then(() =>{
  // })
  perfil.value = useGlobal.perfilComercial
  loadPerfil.value = false
}
// Default values shown  

onMounted(()=>{
  getDatosPerfil()
})
</script>

<style></style>
