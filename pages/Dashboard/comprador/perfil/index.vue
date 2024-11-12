<script lang="ts" setup>

definePageMeta({
  middleware: ()=>{
    return navigateTo('/')
  },
  layout: 'comprador'
})

</script>

<template>
  <div>
    Page: compradores/perfil/
  </div>
</template>

<style scoped></style>
