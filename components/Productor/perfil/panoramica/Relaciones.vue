<template>
  <div class="">
    <div class="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar rounded-md py-5 px-4 ">
      <div class="flex justify-between mb-4 ">
        <h3 class="font-medium text-secundary text-[12px] uppercase font-instrument ">Relaciones</h3>
        <UIcon
          name="i-ph-pencil-fill"
          class="text-primary justify-self-stretch text-xl cursor-pointer"
          dynamic
        />
      </div>
      <div class=" rounded-md p-4">
        <p v-if="!useProductor.perfilProductor.relaciones" class="text-sm text-gray-400">Todavia no tienes relaciones para mostrar...</p>
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