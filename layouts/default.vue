<script lang="ts" setup>
import NavBar from '@/components/NavBar/index.vue'
import { useGlobalStore } from '~/stores/global';

const useGlobal = useGlobalStore()
  const heightNav = useGlobal.heightNav


</script>

<template>
  <div>
    <NavBar/>
    <div :class="$route.path === '/' ? 'h-[88px]': 'h-16'"></div>
    <slot  />
    <FooterDefault/>
  </div>
</template>

<style scoped></style>
