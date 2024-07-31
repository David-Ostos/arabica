<script lang="ts" setup>
import NavbarProductor from '~/components/NavBar/Navbar.Productor.vue';

const useUser = useUserStore()

</script>

<template>
  <div class="min-h-screen">
    <div v-if="useUser.dataUser.tipoUser === 'productor'">
      <NavbarProductor/>
      <ProductorPerfilLayout/>
    </div>
    <div v-else>
      <NavBarNavbarComprador/>
    </div>
    <slot />
  </div>
  <ProductorFooter />
</template>

<style scoped></style>
