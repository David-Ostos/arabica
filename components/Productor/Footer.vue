<template>
  <footer class=" px-20 rounded-t-xl shadow-[0_-4px_6px_rgba(0,0,0,0.1)] ">
    <UHorizontalNavigation
      :links="links"
      :ui="{
        after: 'after:hidden'
      }"
    />

  </footer>
</template>

<script lang="ts" setup>
const links = [
  [{
    label: 'Panel de control',
    to: `/dashboard/productor`
  }, {
    label: 'Perfil',
    to: '/dashboard/productor/perfil'
  }, {
    label: 'Inicio',
    to: '/'
  }],[{
    label: 'Ayuda',
    to: '/ayuda',
    icon: 'i-heroicons-question-mark-circle'
  }]
]
</script>

<style>

</style>