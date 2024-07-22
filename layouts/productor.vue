<script lang="ts" setup>
import NavbarProductor from '~/components/NavBar/Navbar.Productor.vue';
</script>

<template>
  <div>
    <NavbarProductor/>
    <ProductorPerfilLayout/>
    <slot />
    <ProductorFooter/>
  </div>
</template>

<style scoped></style>
