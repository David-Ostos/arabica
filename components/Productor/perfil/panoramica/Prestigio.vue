<template>
  <div class="flex flex-col gap-8">
    <div
      class="shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 px-4">
      <div class="flex justify-between  border-b pb-4">
        <h2 class="uppercase font-medium text-sm text-gray-600">equipo</h2>
        <UIcon name="i-ph-pencil-fill" class="text-primary justify-self-stretch text-xl cursor-pointer" dynamic />
      </div>
      <div class="grid grid-cols-3 gap-2 py-4 w-full overflow-x-hidden h-[144px] overflow-y-auto">
        <div v-if="equipo.length > 0" v-for="(item, index) in equipo"
          class="flex  gap-2 col-span-1 py-2 relative w-full">
          <img :src="item.picture" alt="" class="h-10 w-10 rounded-full" />
          <div class="flex flex-col w-full">
            <span class="capitalize text-sm font-semibold text-gray-700 truncate w-full max-w-36">{{ item.nombre }} {{
              item.apellido }}</span>
            <span class="capitalize text-xs text-gray-700 truncate w-full max-w-36">{{ item.rol }}</span>
          </div>
          <div aria-hidden="true" v-if="index !== 0 && index % 3 === 0"
            class="absolute -top-1 left-0 right-0 h-[1px] w-screen bg-gray-200"></div>
        </div>
        <div v-else class="col-span-3 col-start-2 flex items-center justify-center">
          <span class="w-full text-gray-600">Ningún equipo añadido</span>
        </div>
      </div>
    </div>


    <div
      class="shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 px-4">
      <div class="flex justify-between border-b pb-4">
        <h2 class="uppercase font-medium text-sm text-gray-600">
          Certificaciones
        </h2>
        <UIcon name="i-ph-pencil-fill" class="text-primary justify-self-stretch text-xl cursor-pointer" dynamic />
      </div>
      <div class="grid grid-cols-3 gap-2 w-full py-4 overflow-x-hidden h-[144px] overflow-y-auto">
        <div v-if="certificaciones.length > 0" v-for="(item, index) in certificaciones"
          class="flex  gap-2 col-span-1 py-2 relative w-full">
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
        <div v-else class="col-span-3 col-start-2 flex items-center justify-center">
          <span class="w-full text-gray-600">No se han añadido certificados</span>
        </div>
      </div>
    </div>

    <div
      class="shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 px-4">
      <div class="flex justify-between border-b pb-4">
        <h2 class="uppercase font-medium text-sm text-gray-600">
          Premios
        </h2>
        <UIcon name="i-ph-pencil-fill" class="text-primary justify-self-stretch text-xl cursor-pointer" dynamic />
      </div>
      <div class="grid grid-cols-3 gap-2 w-full overflow-x-hidden py-4 h-[144px] overflow-y-auto">
        <div v-if="certificaciones.length > 0" v-for="(item, index) in premios"
          class="flex  gap-2 col-span-1 py-2 relative w-full">
          <div class="flex flex-col">
            <span class="capitalize text-sm font-semibold text-gray-700">{{
              item.nombre
              }}</span>
            <span class="capitalize text-xs text-gray-700 truncate w-full max-w-36">{{ item.year }}</span>
          </div>
          <div aria-hidden="true" v-if="index !== 0 && index % 3 === 0"
            class="absolute -top-1 left-0 right-0 h-[1px] w-screen bg-gray-200"></div>
        </div>
        <div v-else class="col-span-3 col-start-2 flex items-center justify-center">
          <span class="w-full text-gray-600">No se han añadido certificados</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
const useProductor = useProductorStore();

const equipo = [
  {
    nombre: "Maria",
    apellido: "Marquez",
    rol: "C.E.O",
    picture: "/img/testimonio_1.jpg",
  },
  {
    nombre: "Gregory",
    apellido: "Ruíz",
    rol: "Presidente",
    picture: "/img/testimonio_2.jpg",
  },
  {
    nombre: "Pedro",
    apellido: "Perez",
    rol: "Ing. Mantenimiento",
    picture: "/img/testimonio_3.jpg",
  },
  {
    nombre: "José",
    apellido: "Páez",
    rol: "Vendedor",
    picture:
      "https://th.bing.com/th/id/R.b4bd5d2a219c125ff398096d3008820d?rik=71kngvnT7fJyRg&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f8%2fYoung-Man-PNG-Free-Image.png&ehk=AY5O6uW9z0l%2f2x%2b8jMlmBQEBBk2zJItBgmenSV82w6g%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    nombre: "Maria",
    apellido: "Marquez",
    rol: "C.E.O",
    picture: "/img/testimonio_1.jpg",
  },
  {
    nombre: "Gregory",
    apellido: "Ruíz",
    rol: "Presidente",
    picture: "/img/testimonio_2.jpg",
  },
  {
    nombre: "Pedro",
    apellido: "Perez",
    rol: "Ing. Mantenimiento",
    picture: "/img/testimonio_3.jpg",
  },
  {
    nombre: "José",
    apellido: "Páez",
    rol: "Vendedor",
    picture:
      "https://th.bing.com/th/id/R.b4bd5d2a219c125ff398096d3008820d?rik=71kngvnT7fJyRg&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f8%2fYoung-Man-PNG-Free-Image.png&ehk=AY5O6uW9z0l%2f2x%2b8jMlmBQEBBk2zJItBgmenSV82w6g%3d&risl=&pid=ImgRaw&r=0",
  },
];

const premios = [
{
    nombre: "Premio nobel",
    year: "2024",
  },{
    nombre: "Premio nobel",
    year: "2024",
  },{
    nombre: "Premio nobel",
    year: "2024",
  },{
    nombre: "Premio nobel",
    year: "2024",
  },{
    nombre: "Premio nobel",
    year: "2024",
  },{
    nombre: "Premio nobel",
    year: "2024",
  },{
    nombre: "Premio nobel",
    year: "2024",
  },{
    nombre: "Premio nobel",
    year: "2024",
  },{
    nombre: "Premio nobel",
    year: "2024",
  },{
    nombre: "Premio nobel",
    year: "2024",
  },{
    nombre: "Premio nobel",
    year: "2024",
  },
];

const certificaciones = [
  {
    nombre: "B-Corp",
    categoria: "Productividad",
    year: "2020",
    picture: "/img/logos_certificados/b-corp.webp",
  },
  {
    nombre: "B-Corp",
    categoria: "Productividad",
    year: "2020",
    picture: "/img/logos_certificados/b-corp.webp",
  },
  {
    nombre: "B-Corp",
    categoria: "Productividad",
    year: "2020",
    picture: "/img/logos_certificados/b-corp.webp",
  },
  {
    nombre: "B-Corp",
    categoria: "Productividad",
    year: "2020",
    picture: "/img/logos_certificados/b-corp.webp",
  },
  {
    nombre: "B-Corp",
    categoria: "Productividad",
    year: "2020",
    picture: "/img/logos_certificados/b-corp.webp",
  },
  {
    nombre: "B-Corp",
    categoria: "Productividad",
    year: "2020",
    picture: "/img/logos_certificados/b-corp.webp",
  },
  {
    nombre: "B-Corp",
    categoria: "Productividad",
    year: "2020",
    picture: "/img/logos_certificados/b-corp.webp",
  },
  {
    nombre: "B-Corp",
    categoria: "Productividad",
    year: "2020",
    picture: "/img/logos_certificados/b-corp.webp",
  },
  {
    nombre: "B-Corp",
    categoria: "Productividad",
    year: "2020",
    picture: "/img/logos_certificados/b-corp.webp",
  },
];
</script>

<style></style>
