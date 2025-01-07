<template>
  <div class="flex flex-col gap-4">
    <div
      class=" bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar border rounded-md py-5 px-4"
    >
      
      <div class="flex justify-between ">
        <h2 class=" font-medium text-secundary text-[12px] uppercase font-instrumentry">equipo</h2>
      </div>
 
      <div class="grid grid-cols-1 gap-2 py-4 w-full overflow-x-hidden ">
        <div v-if="props.equipo !== undefined && props.equipo.length > 0" class="flex gap-2 col-span-1 py-2 relative w-full" v-for="(item, index) in props.equipo">
          <img :src="item?.picture" alt="" class="h-10 w-10 rounded-full" />
          <div class="flex flex-col w-full">
            <span class="capitalize text-sm font-semibold text-gray-700 w-full ">{{ item.nombre }} {{
              item.apellido }}</span>
            <span class="capitalize text-xs text-gray-700  w-full ">{{ item.rol }}</span>
          </div>
          <div aria-hidden="true" v-if="index !== 0 && index % 3 === 0"
            class="absolute -top-1 left-0 right-0 h-[1px] w-screen bg-gray-200"></div>
        </div>
        <div v-else class="col-span-3 w-full mx-4">
          <span class="text-sm text-gray-400">Ningún equipo añadido</span>
        </div>
      </div>

    </div>


    <div
      class=" bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar border rounded-md py-5 px-4">
      <div class="flex justify-between ">
        <h2 class=" font-medium text-secundary text-[12px] uppercase font-instrument">
          Certificaciones
        </h2>
      </div>
      <div class="grid grid-cols-1 gap-2 py-4 w-full overflow-x-hidden ">
        <div v-if="props.certificaciones !== undefined && props.certificaciones.length > 0" class="flex  gap-2 col-span-1 py-2 relative w-full" v-for="(item, index) in props.certificaciones">
          <img :src="item.picture" alt="" class="h-10 w-10 rounded-full" />
          <div class="flex flex-col">
            <span class="capitalize text-sm font-semibold text-gray-700">{{
              item.nombre
              }}</span>
            <span class="capitalize text-xs text-gray-700 truncate w-full max-w-36">{{ item.year }}</span>
          </div>
          <div aria-hidden="true" v-if="index !== 0 && index % 3 === 0"
            class="absolute -top-1 left-0 right-0 h-[1px] w-screen bg-gray-200"></div>
        </div>
        <div v-else class="col-span-3 w-full mx-4">
          <span class="text-sm text-gray-400">No se han añadido certificados</span>
        </div>
      </div>
    </div>

    <div
      class=" bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar border rounded-md py-5 px-4">
      <div class="flex justify-between ">
        <h2 class=" font-medium text-secundary text-[12px] uppercase font-instrument">
          Premios
        </h2>
      </div>
      <div class="grid grid-cols-1 gap-2 py-4 w-full overflow-x-hidden ">
        <div v-if="props.premios !== undefined && props.premios.length > 0" 
          class="flex  gap-2 col-span-1 py-2 relative w-full" v-for="(item, index) in props.premios">
          <div class="flex flex-col">
            <span class="capitalize text-sm font-semibold text-gray-700">{{
              item.nombre
              }}</span>
            <span class="capitalize text-xs text-gray-700 truncate w-full max-w-36">{{ item.year }}</span>
          </div>
          <div aria-hidden="true" v-if="index !== 0 && index % 3 === 0"
            class="absolute -top-1 left-0 right-0 h-[1px] w-screen bg-gray-200"></div>
        </div>
        <div v-else class="col-span-3 w-full mx-4">
          <span class="text-sm text-gray-400">No se han añadido certificados</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>

interface Equipo {
    nombre?: string,
    apellido?: string,
    rol?: string,
    picture?: string,
  }

  interface Certificaciones {
    nombre?: string,
    year?: string,
    picture?: string,
  }

  interface Premios{
    nombre?: string,
    year?: string,
    picture?: string,
  }

const props = defineProps({
  certificaciones: {
    type: Array as PropType<Certificaciones[] | undefined>,
    required: true,
    default: () => [],
  },equipo: {
    type: Array as PropType<Equipo[] | undefined>,
    required: true,
    default: () => [],
  },premios: {
    type: Array as PropType<Premios[] | undefined>,
    required: true,
    default: () => [],
  },

})
</script>

<style></style>
