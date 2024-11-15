<template>
  <div>

    <div 
    v-if="$route.path.includes('perfil')"
    class="rounded-b-3xl shadow-lg"
    >
    <ProductorPerfilIndexPortada />
    <div class="mx-8 md:mx-20">
      <ProductorPerfilIndexAvatar />
      <ProductorPerfilHorizontalNavigation />
    </div>
  </div>
  <ProductorPerfilIndexCompletarPerfil />
</div>
</template>

<script lang="ts" setup>
const useUser = useUserStore()
</script>

<style></style>
