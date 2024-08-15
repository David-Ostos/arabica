
<template>
  <div class="flex gap-8 z-0 justify-between relative flex-grow mr-8">

<div class="relative transition-width ease-in-out duration-700 shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-r border-inset border-gray-300 dark:border-gray-700 focus:border-2 focus:border-primary-500 dark:focus:border-primary-400 py-5 px-4"
      :class="[
        isOpen ? ' w-1/4' : ' w-[5%]',
        useLotes.lotes.length > 0 ? ' w-1/3' : 'w-1/4',
      ]"
    >
      <div class="absolute right-4">
        <div
          class="mb-4 text-xl border rounded-md p-2 flex justify-center items-center"
          @click="isOpen = !isOpen"
        >
          <UIcon name="i-ic-round-menu" class="" dynamic />
        </div>
      </div>
      <div class="h-full">
        <div class="flex flex-col justify-center gap-10 h-full">
          <!-- TODO donde se coloca los filtros -->
        </div>
      </div>
    </div>

  <div class="flex gap-8 z-0 justify-between relative flex-grow  overflow-auto  w-3/4">
    <div
      class="mt-5 pb-10 transition-width ease-in-out duration-700 mx-auto flex-grow h-lotes "
    >
      <h1
        class="font-bold text-base md:text-lg text-gray-800 line-clamp-2 hover:line-clamp-none transition-all duration-1000 mb-4"
      >
        {{ useLotes.lotes.length }} Lotes disponibles
      </h1>
      <div class="flex flex-wrap gap-4 justify-between mr-4 mb-10">
        <div v-for="item in useLotes.lotes" class=" w-[30%] mb-4 relative ">
          <LotesCard :item="item" />
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: 'lote'
})

const isOpen = ref(false);


const useLotes = useLotesStore()
</script>

<style scoped >
.h-lotes{
  height: calc(100vh - 56px)
}
</style>
