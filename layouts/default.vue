<script lang="ts" setup>



</script>

<template>
  <div>
    <div>
      <NavBar/>
      <div :class="$route.path === '/' ? 'h-[88px]': 'h-16'"></div>
      <slot  />
    </div>
    <FooterDefault/>
  </div>
</template>

<style scoped></style>
