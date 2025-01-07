<template>
  <div>
    <div
      class="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar border rounded-md px-5 py-5 h-[287px]"
    >
      <div class="flex justify-between mb-4">
        <h3
          class="font-medium text-secundary text-[12px] uppercase font-instrumentry"
        >
          Imagenes Destacadas
        </h3>
      </div>
      <div
        v-if="profile.imgDestacadas && profile.imgDestacadas.length > 0"
        class="flex justify-center items-center overflow-auto w-full"
      >
        <UCarousel
          ref="carouselRef"
          v-slot="{item}"
          :items="displayedImages"
          :ui="{
            item: 'basis-full h-[144px] md:basis-1/2 lg:basis-1/3',
            container: ' w-full h-[200px]',
          }"
          class="rounded-lg w-full"
          arrows
          indicators
          :prev-button="{
            color: 'gray',
            icon: 'i-heroicons-arrow-left-20-solid',
            class: 'start-12 top-[90%]',
          }"
          :next-button="{
            color: 'gray',
            icon: 'i-heroicons-arrow-right-20-solid',
            class: 'end-12 top-[90%]',
          }"
        >
          <img
            @click="useShowModals.productorMuestraImg = true"
            :src="item.link"
            class="border rounded-md w-full h-full object-cover cursor-pointer"
            draggable="true"
          />
        </UCarousel>

        <!-- Modal de muestra -->
        <ProductorPerfilModalImgMuestraImg :image="profile.imgDestacadas" />
        <!-- /Modal de muestra -->
      </div>

      <div
        v-else
        class="flex flex-col h-full w-full m-auto items-center justify-center border-t"
      >
        <span class="w-fit text-gray-600">No se han añadido Imagenes.</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useProfile} from "~/composables/useProfile";

const useShowModals = useShowModalsStore();

const {profile} = useProfile();
const carouselRef = ref();

const displayedImages = ref(profile.value.imgDestacadas || []);


onMounted(() => {
  if (displayedImages.value.length > 1) {
    setInterval(() => {
      if (!carouselRef.value) return;

      if (carouselRef.value.page === carouselRef.value.pages) {
        return carouselRef.value.select(0);
      }

      carouselRef.value.next();
    }, 3000);
  }
});
</script>

<style></style>
