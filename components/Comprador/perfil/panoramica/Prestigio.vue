<template>
  <div class="flex flex-col gap-8">
    <div
      class="shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 px-4"
    >
      
      <div class="flex justify-between  border-b pb-4">
        <h2 class="uppercase font-medium text-sm text-gray-600">equipo</h2>
      </div>

      <div class="grid grid-cols-3 gap-2 py-4 w-full overflow-x-hidden h-[144px] overflow-y-auto">
        <div v-if="props.equipo !== undefined && props.equipo.length > 0" class="flex  gap-2 col-span-1 py-2 relative w-full" v-for="(item, index) in props.equipo">
          <img :src="item?.picture" alt="" class="h-10 w-10 rounded-full" />
          <div class="flex flex-col w-full">
            <span class="capitalize text-sm font-semibold text-gray-700 truncate w-full max-w-36">{{ item.nombre }} {{
              item.apellido }}</span>
            <span class="capitalize text-xs text-gray-700 truncate w-full max-w-36">{{ item.rol }}</span>
          </div>
          <div aria-hidden="true" v-if="index !== 0 && index % 3 === 0"
            class="absolute -top-1 left-0 right-0 h-[1px] w-screen bg-gray-200"></div>
        </div>
        <div v-else class="col-span-3 w-full flex items-center justify-center">
          <span class="w-fit text-gray-600">Ningún equipo añadido</span>
        </div>
      </div>

    </div>


    <div
      class="shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 px-4">
      <div class="flex justify-between border-b pb-4">
        <h2 class="uppercase font-medium text-sm text-gray-600">
          Certificaciones
        </h2>
      </div>
      <div class="grid grid-cols-3 gap-2 w-full py-4 overflow-x-hidden h-[144px] overflow-y-auto">
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
        <div v-else class="col-span-3 w-full flex items-center justify-center">
          <span class="w-fit text-gray-600">No se han añadido certificados</span>
        </div>
      </div>
    </div>

    <div
      class="shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 px-4">
      <div class="flex justify-between border-b pb-4">
        <h2 class="uppercase font-medium text-sm text-gray-600">
          Premios
        </h2>
      </div>
      <div class="grid grid-cols-3 gap-2 w-full overflow-x-hidden py-4 h-[144px] overflow-y-auto">
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
        <div v-else class="col-span-3 w-full flex items-center justify-center">
          <span class="w-fit text-gray-600">No se han añadido certificados</span>
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
