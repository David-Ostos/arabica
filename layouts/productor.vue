<script lang="ts" setup>
import NavbarProductor from '~/components/NavBar/Navbar.Productor.vue';
</script>

<template>
    <div>
      <NavbarProductor class="mt-[4.2rem]"/>
      <ProductorPerfilLayout/>
      <div :class="$route.path.includes('usuario') ? 'grid grid-cols-8 bg-gray-100 h-full ' : ''">
        <ProductorUsuarioLayout class=" h-full col-span-2"/>
        <div class="col-span-6">

          <slot  />
        </div>
      </div>
      <ProductorFooter />
    </div>
</template>

<style scoped></style>
