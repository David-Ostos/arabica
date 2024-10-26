<template>
  <div>
    <div
      class=" shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md px-5 py-5 h-[287px] ">
      <div class="flex justify-between mb-4 ">
        <h3 class="capitalize font-medium text-xl ">Imagenes Destacadas</h3>
      </div>
      <div class="flex items-center justify-center gap-4">
        <div v-for="img in imgDestacadas" class="border p-4 h-[186px] w-full flex  justify-center items-center">
          <img v-if="img !== ''" :src="img" alt="" class="border  w-auto object-cover" />
          <UIcon v-if="img === ''" name="i-heroicons-photo" class="text-4xl text-secundary" dynamic />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const imgDestacadas = [
  '',
  '',
  '',
]
</script>

<style></style>