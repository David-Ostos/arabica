<template>
  <!-- tipo de usuario -->

  <div>
    <h3
      class="pb-4 text-2xl text-center text-gray-800 dark:text-white"
    >
      Elija su tipo de cuenta
    </h3>
    <div class="flex justify-around items-center mb-8">
      <button
        class="flex flex-col justify-center items-center p-4 border-2 dark:text-white hover:text-gray-700 hover:text-primary hover:border-primary dark:border-white rounded-md hover:dark:border-primary hover:dark:text-primary"
      >
        <UIcon name="i-ph-farm-thin" class="text-8xl" dynamic />
        <span class="font-medium">Productor</span>
      </button>

      <button
        class="flex flex-col justify-center items-center p-4 border-2 dark:text-white hover:text-gray-700 hover:text-primary hover:border-primary dark:border-white rounded-md hover:dark:border-primary hover:dark:text-primary"
      >
        <UIcon
          name="i-material-symbols-person"
          class="text-8xl font-thin"
          dynamic
        />
        <span class="font-medium">Comprador</span>
      </button>
    </div>
  </div>
  <!-- /tipo de usuario -->
</template>

<script lang="ts" setup>

const nombre = import.meta.env.VITE_NOMBRE_1

</script>

<style></style>
