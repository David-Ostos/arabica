<template>
  <div class=" relative my-10 ">
    <div class="mx-auto  px-6 lg:px-20">
      <dl class=" flex-col md:flex-row gap-6 flex justify-center text-center ">
        <div
          v-for="stat in stats"
          :key="stat.id"
          class="bg-white box-border mx-auto flex justify-between flex-col border w-full py-8 shadow-lg md:px-20 md:py-12 rounded-md"
        >
        <div class="flex flex-col gap-8 ">
          <div class=" text-5xl p-4 flex justify-center items-center w-fit rounded-full bg-primary-700 mx-auto text-white">
          <UIcon  :name="stat.icon" dynamic/>

        </div>
        <p
          class=" text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl"
        >
          {{ stat.value }}
        </p>
        </div>

        <p class="text-base  leading-7 text-gray-600">
          {{ stat.title }}
        </p>
        </div>
      </dl>
    </div>
  </div>
</template>

<script lang="ts" setup>
const stats = [
  {
    id: 1, 
    title: "Registrate en Arabica", 
    value: "1000+ Tostadores", 
    icon: 'i-heroicons-building-storefront'
  },
  {
    id: 2, 
    title: "En nuestro mapa de productores", 
    value: "1000+ Productores", 
    icon: 'i-material-symbols-coffee-maker-outline'
  },
  {
    id: 3, 
    title: "Se ofrece en el mercado", 
    value: "5000+ Lotes de café", 
    icon: 'i-heroicons-inbox-stack-16-solid'
  },
];
</script>
