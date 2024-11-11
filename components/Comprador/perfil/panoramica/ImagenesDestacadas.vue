<template>
  <div>
    <div
      class=" shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md px-5 py-5 h-[287px] ">
      <div class="flex justify-between mb-4 ">
        <h3 class="capitalize font-medium text-xl ">Imagenes Destacadas</h3>
      </div>
      <div v-if="profile.imgDestacadas && profile.imgDestacadas?.length > 0" class="flex items-center justify-center gap-4">
        <div :class="{'cursor-pointer': !isClicked, 'cursor-grabbing': isClicked}" 
          @mousedown="handleMouseDown" 
          @mouseup="handleMouseUp" 
          @mouseleave="handleMouseUp">
          <UCarousel v-if="profile.imgDestacadas && profile.imgDestacadas.length > 0" v-slot="{ item }" :items="profile.imgDestacadas"
          :ui="{ container: 'h-[186px] w-full min-w-[120px] gap-4 ' }">
          <img @click="useShowModals.productorMuestraImg = true" :src="item.link" class="border rounded-md h-full object-cover  " 
          
          draggable="true" />

          </UCarousel>
          <!-- Modal de muestra -->
          <ProductorPerfilModalImgMuestraImg :image="profile.imgDestacadas"/>
          <!-- /Modal de muestra -->
        </div>
      </div>
      <div v-else class="flex flex-col h-full w-full m-auto items-center justify-center border-t">
        <span class="w-fit text-gray-600">No se han añadido Imagenes.</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProfile } from '~/composables/useProfile'

const useShowModals = useShowModalsStore()

const { profile } = useProfile()

const isClicked = ref(false); 

const handleMouseDown = () => { isClicked.value = true; }; 

const handleMouseUp = () => { isClicked.value = false;}

onMounted(()=>{
  console.log(profile.value.imgDestacadas);
})

</script>

<style></style>