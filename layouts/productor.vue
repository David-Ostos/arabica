<script lang="ts" setup>
import NavbarProductor from '~/components/NavBar/Navbar.Productor.vue';
</script>

<template>
    <div>
      <NavbarProductor class="mt-[4.2rem]"/>
      <ProductorPerfilLayout/>
      <div :class="$route.path.includes('usuario') ? 'flex bg-gray-100 h-full ' : ''">
        <ProductorUsuarioLayout class="h-full"/>
        <slot />
      </div>
    </div>
    <ProductorFooter />
</template>

<style scoped></style>
