<template>
  <!-- tipo de usuario -->

  <div>
    <h3
      class="pb-4 text-2xl text-center text-gray-800 dark:-text-dar"
    >
      Elija su tipo de cuenta
    </h3>
    <div class="flex justify-around items-center mb-8">
      <button
        class="flex flex-col justify-center items-center p-4 border-2 dark:-text-dar hover:text-gray-700 hover:text-primary hover:border-primary dark:border-white rounded-md hover:dark:border-primary hover:dark:text-primary"
        :class="tipo === true ? 'text-primary border-primary' : ''"
        @click="tipo = true , $emit('tipoUser', 'productor')"
      >
        <UIcon name="i-ph-farm-thin" class="text-8xl" dynamic />
        <span class="font-medium">Productor</span>
      </button>

      <button
        class="flex flex-col justify-center items-center p-4 border-2 dark:-text-dar hover:text-gray-700 hover:text-primary hover:border-primary dark:border-white rounded-md hover:dark:border-primary hover:dark:text-primary"
        :class="tipo === false ? 'text-primary border-primary' : ''"
        @click="tipo = false , $emit('tipoUser', 'comprador')"

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
const tipo:Ref<boolean | null> = ref(null)

</script>

<style></style>
