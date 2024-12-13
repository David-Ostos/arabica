<template>
  <div>

    <div 
    v-if="$route.path.includes('perfil')"
    class="rounded-b-3xl shadow-lg 2xl:container 2xl:mx-auto"
    >
    <ProductorPerfilIndexPortada />
    <div class="mx-8 md:mx-20">
      <ProductorPerfilIndexAvatar />
      <ProductorPerfilHorizontalNavigation />
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
const useUser = useUserStore()
</script>

<style></style>
