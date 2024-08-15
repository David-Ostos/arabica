<template>
  <div>
    <NavbarComprador class="mt-[4.2rem]"/>
      <div :class="$route.path.includes('usuario') ? 'grid grid-cols-8 bg-gray-100 h-full ' : ''">
        <CompradorUsuarioLayout class=" h-full col-span-2"/>
        <div class="col-span-6">

          <slot  />
        </div>
      </div>
      <ProductorFooter />
  </div>
</template>

<script lang="ts" setup>
import NavbarComprador from '~/components/NavBar/Navbar.Comprador.vue';


</script>

<style>

</style>