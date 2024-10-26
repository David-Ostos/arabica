<script setup lang="ts">
const route = useRoute()
const usePerfilProductor = useProductorStore().perfilProductor
const links = [ {
  label: `Acerca de`,
  // icon: 'i-heroicons-home',
  to: `/perfil/${route.params.id}`
}, {
  label: 'Lotes',
  // icon: 'i-heroicons-chart-bar',
  to: `/perfil/${route.params.id}/lotes`
}, {
  label: 'Noticias',
  // icon: 'i-heroicons-command-line',
  to: `/perfil/${route.params.id}/noticias`
}]
</script>

<template>
  <UHorizontalNavigation 
    :links="links" 
    class="border-b border-gray-200 dark:border-gray-800 -mx-2" 
    :ui="{
      base:'max-w-40'
    }" 
  />
</template>

