<script lang="ts" setup>
import NavBar from '@/components/NavBar/index.vue'
</script>

<template>
  <div>
    <NavBar/>
    <slot />
    <FooterDefault/>
  </div>
</template>

<style scoped></style>
