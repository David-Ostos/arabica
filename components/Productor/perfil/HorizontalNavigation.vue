<script setup lang="ts">
const route = useRoute()

const links = [ {
  label: 'Panorámica',
  // icon: 'i-heroicons-home',
  to: '/dashboard/productor/perfil'
}, {
  label: 'Lotes',
  // icon: 'i-heroicons-chart-bar',
  to: `/dashboard/productor/perfil/lotes`
}, {
  label: 'Noticias',
  // icon: 'i-heroicons-command-line',
  to: '/dashboard/productor/perfil/noticias'
}]
</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800 mx-6" />
</template>

