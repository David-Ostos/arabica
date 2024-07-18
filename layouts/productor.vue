<script lang="ts" setup>
import NavbarProductor from '~/components/NavBar/Navbar.Productor.vue';
</script>

<template>
  <div class="mb-96">
    <NavbarProductor/>
    <ProductorPerfilLayout/>
    <slot />
  </div>
</template>

<style scoped></style>
