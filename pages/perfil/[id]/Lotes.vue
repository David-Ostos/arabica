<template>
  <div class="flex gap-8 z-0 justify-between relative flex-grow mx-20 overflow-auto contenedor">
    <div
      class="mt-5 pb-10 transition-width ease-in-out duration-700 mx-auto flex-grow h-screen-topBar-footer "
    >
      <h1 v-if="perfil" class="font-bold text-base md:text-lg text-gray-800 line-clamp-2 hover:line-clamp-none transition-all duration-1000 mb-4">
        {{ perfil.lotes?.length}} Lotes disponibles
      </h1>
      <div class="flex flex-wrap gap-4 justify-between mr-4 ">
        <div v-if="perfil" v-for="item in perfil!.lotes" class=" w-[30%] mb-4 relative ">
          <NuxtLink :to="`/perfil/${item._id}`"><LotesCard :item="item" /></NuxtLink>
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
const global = useGlobalStore()
const perfil = ref()
onMounted(()=>{
  perfil.value = global.perfilComercial
})

</script>

<style scoped >
</style>
