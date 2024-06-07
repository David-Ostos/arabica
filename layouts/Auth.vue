<script lang="ts" setup>
import NavBarAuth from '../components/NavBar/Auth.vue';
import Footer from '../components/Footer/Default.vue'

</script>

<template>
  <div class="bg-white dark:bg-dark">
    <NavBarAuth/>
    <slot />
    <Footer/>
  </div>
</template>

<style scoped></style>
