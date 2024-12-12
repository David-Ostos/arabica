<template>
<div class="flex gap-8 z-0 justify-between relative flex-grow mx-8 md:mx-20 md:scrollbar-show scrollbar-hide md:overflow-auto contenedor">
    <div
      class="mt-5 pb-10 transition-width ease-in-out duration-700 mx-auto flex-grow h-screen-topBar-footer "
    >
      <h1
        class="font-bold text-base md:text-lg text-gray-800 line-clamp-2 hover:line-clamp-none transition-all duration-1000 mb-4"
      >
        {{ profile.lotes?.length}} Lotes disponibles
      </h1>
      <div class="grid grid-cols-3 gap-4 justify-between mr-4 ">
        <div v-if="profile" v-for="item in profile!.lotes" class=" col-span-3 sm:col-span-1 ">
          <NuxtLink :to="`/lote/${item._id}`"><LotesCard :item="item" /></NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

definePageMeta({
  layout: "perfil",
  middleware: "perfil"
});

const {profile} = useProfile()
console.log(profile.value)

</script>

<style scoped >
</style>
