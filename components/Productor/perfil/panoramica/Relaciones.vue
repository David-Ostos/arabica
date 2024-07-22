<template>
  <div class="w-1/2">
    <div class=" shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 px-4 ">
      <div class="flex justify-between mb-4 ">
        <h3 class="capitalize font-medium text-xl ">Relaciones</h3>
        <UIcon
          name="i-ph-pencil-fill"
          class="text-primary justify-self-stretch text-xl cursor-pointer"
          dynamic
        />
      </div>
      <div class="border bg-white  h-56 rounded-md p-4">
        <p v-if="!useProductor.perfilProductor.relaciones" class="text-sm text-gray-400">Todavia no has proporcionado las relaciones...</p>
        <p class="text-sm " v-for="item in useProductor.perfilProductor.relaciones">{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const useProductor = useProductorStore()

</script>

<style>

</style>