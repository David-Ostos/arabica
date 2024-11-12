<template>
  <div class="min-h-screen">
    page: comprador: perfil/ajuste
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ()=>{
    return navigateTo('/')
  },
  layout: 'comprador'
})
</script>

<style>

</style>