<template>
  <div class="">
    <div class=" shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 px-4 ">
      <div class="flex justify-between mb-4 ">
        <h3 class="capitalize font-medium text-xl ">Relaciones</h3>
      </div>
      <div class="border bg-white  h-56 rounded-md p-4">
        <p v-if="!props.relaciones" class="text-sm text-gray-400">Todavia no has proporcionado las relaciones...</p>
        <p v-else class="text-sm " v-for="item in props.relaciones">{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

  const props = defineProps({
    relaciones: {
      type: Array,
      required: true,
      default: () => []
    } 
  })

</script>

<style>

</style>