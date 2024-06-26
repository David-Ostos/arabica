<template>
  <div class="bg-gray-50 px-4 md:px-40 pt-4 ">
    <div class="py-8 w-full flex-col-reverse md:flex-row flex  md:h-[850px]  ">
      <div class="md:basis-1/2 flex flex-col gap-4 mx-8 sm:mx-0">
        <span class="text-primary mb-4">
          ¿POR QUÉ ELEGIRNOS?
        </span>
        
        <h1 class="text-xl md:text-5xl font-bold md:leading-[1.2] my-4">
          Tome el control de su cadena de suministro
        </h1>
  
        <p class="text-base  leading-7 text-gray-600 line-clamp-5 hover:line-clamp-none">
          Sepa cuándo estarán disponibles las muestras de cultivos frescos para catar y cuándo comienza y termina la ventana de ventas de cada origen. Tenga una visibilidad completa de su envío en todos los pasos del camino con actualizaciones en tiempo real. Planifique con meses de anticipación el tueste, pronostique sus existencias y organice todas sus necesidades de abastecimiento para que pueda relajarse y divertirse buscando excelentes cafés.
        </p>
  
        <ul class="flex flex-col gap-8 my-6">
          <li v-for="item, index in items" 
            :key="index"
            class="flex items-center gap-4 h-20  px-2"
            >
            <div class="flex self-start justify-center items-center p-3 bg-gray-200 text-3xl rounded-full">
              <UIcon name="i-heroicons-check-circle-16-solid" class="text-primary-700"/>
            </div>
  
            <div>
              <h2 class="text-primary-700 text-2xl font-semibold">
                {{ item.title }}
              </h2>
  
              <p class="text-base  leading-6 text-gray-600">
                {{ item.content }}
              </p>
            </div>
          </li>
        </ul>
      </div>
        <div class="md:relative md:basis-1/2 mx-8 sm:mx-0 ">
          <div class="md:absolute mb-10 md:mb-0 -right-4 top-28 ring-white ring-8 ring-offset-4 rounded-full shadow-md  ">
            <img :src="elegirnos_1"  class="rounded-full  h-[450px] w-[450px]" />
          </div>
          
          <div class=" right-72 bottom-28 hidden md:block md:absolute ring-white ring-8 ring-offset-4 rounded-full shadow-md ">
            <img :src="elegirnos_2" class="h-[200px] w-[200px] max-w-max object-cover  bg-cover rounded-full" />
          </div>
        </div>
        
    </div>
</div>

</template>

<script lang="ts" setup>

import elegirnos_2 from '../../public/img/elejirnos_2.jpg'
import elegirnos_1 from '../../public/img/elejirnos_1.webp'

  const items = [
    {
      title:'Sabor original',
      content:'Natoque vel nunc rutrum metus consectetuer litora orci ipsum et nec auctor',
    },{
      title:'Café Premium',
      content:'Natoque vel nunc rutrum metus consectetuer litora orci ipsum et nec auctor',
    },{
      title:'100% Orgánico',
      content:'Natoque vel nunc rutrum metus consectetuer litora orci ipsum et nec auctor',
    }
  ]

</script>

<style>

</style>