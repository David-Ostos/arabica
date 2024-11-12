<template>
  <div >
    page:Forget
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "auth",
  middleware: ()=>{
    return navigateTo('/')
  }
});

</script>

<style>

</style>