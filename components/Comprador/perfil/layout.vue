<template>
    <div 
      v-if="$route.path.includes('perfil')"
      class="rounded-b-3xl shadow-lg"
    >
    <CompradorPerfilIndexPortada />
    <div class="mx-20">
      <CompradorPerfilIndexAvatar 
      :picture="perfil?.logo" 
      :nombre="perfil?.nombre" 
      :origen="perfil?.origen"
      :tipo-productor="perfil?.tipoProductor" 
      />
      <CompradorPerfilHorizontalNavigation />
    </div>
  </div>
</template>

<script lang="ts" setup>
const global = useGlobalStore()
const perfil = ref()
onMounted(() => {
  perfil.value = global.perfilComercial
  console.log(perfil.value.logo);
})


/* const { perfil, isLoading, error, fetchPerfil } = usePerfilProductor()

// Cargar el perfil cuando el componente se monta
onMounted(fetchPerfil) */

</script>

<style></style>
