<template>
    <div 
      v-if="$route.path.includes('perfil')"
      :class="useUser.dataUser.verificado ? 'mt-[65px]' : ''" 
      class="rounded-b-3xl shadow-lg"
    >
    <ProductorPerfilIndexPortada />
    <div class="mx-20">
      <ProductorPerfilIndexAvatar />
      <ProductorPerfilHorizontalNavigation />
    </div>
    <ProductorPerfilIndexCompletarPerfil />
  </div>
</template>

<script lang="ts" setup>
const useUser = useUserStore()
</script>

<style></style>
