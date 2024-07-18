<template>
  <div class="w-1/2">
    <h3 class="capitalize font-medium text-xl mb-4">Relaciones</h3>
    <div class="h-56 shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 px-4 ">
      <p v-if="!useUser.perfilUser.relaciones" class="text-sm text-gray-400">Todavia no has proporcionado las relaciones...</p>
      <p class="text-sm " v-for="item in useUser.perfilUser.relaciones">{{ item }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const useUser = useUserStore()

</script>

<style>

</style>