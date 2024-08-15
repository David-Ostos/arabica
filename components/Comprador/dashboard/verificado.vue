<script setup lang="ts">

import banner_1 from '/img/verificado_1.jpg'
import banner_2 from '/img/verificado_2.jpg'
import banner_3 from '/img/verificado_3.jpg'


const items = [
  banner_1,
  banner_2,
  banner_3,
]

const carouselRef = ref()

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 3000)
})

</script>

<template>
  <UCarousel 
    v-slot="{ item }" 
    ref="carouselRef"
    :items="items" 
    :ui="{ item: 'basis-full' }" 
    class="rounded-lg overflow-hidden my-10 " 
    indicators
    :prev-button="{
      color: 'gray',
      icon: 'i-heroicons-arrow-left-20-solid',
    }"
    :next-button="{
      color: 'gray',
      icon: 'i-heroicons-arrow-right-20-solid',
    }"
    arrows
  >
    <img :src="item" class="w-full max-h-[500px] object-cover " draggable="false">
  </UCarousel>
</template>