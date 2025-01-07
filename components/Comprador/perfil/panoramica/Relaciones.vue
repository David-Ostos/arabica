<template>
  <div class="">
    <div class="  bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar border rounded-md py-5 px-4 ">
      <div class="flex justify-between mb-4 ">
        <h3 class=" font-medium text-secundary text-[12px] uppercase font-instrument">Relaciones</h3>
      </div>
      <div class="rounded-md mx-4">
        <p v-if="relaciones && relaciones.length === 0  " class="text-sm text-gray-400">Todavia no tienes relaciones para mostrar...</p>
        <p v-else class="text-sm " v-for="item in relaciones">{{ item }}</p>
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