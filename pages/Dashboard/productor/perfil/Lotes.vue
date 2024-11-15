<template>
  <div class="flex gap-8 z-0 justify-between relative flex-grow mx-8 md:mx-20 md:scrollbar-show scrollbar-hide md:overflow-auto contenedor">
    <div
      class="mt-5 pb-10 transition-width ease-in-out duration-700 mx-auto flex-grow h-screen-topBar-footer "
    >
      <h1
        class="font-bold text-base md:text-lg text-gray-800 line-clamp-2 hover:line-clamp-none transition-all duration-1000 mb-4"
      >
        {{ lotes!.length }} Lotes disponibles
      </h1>
      <div class="flex flex-wrap gap-4 justify-between mr-4 ">
        <div v-for="item in lotes" class=" md:w-[30%] mb-4 relative ">
          <LotesCard :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useLotesStore } from "~/stores/Lotes";

definePageMeta({
  middleware: "productor",
  layout: "productor",
});
const useLotes = useLotesStore()
const useProductor = useProductorStore()

const lotes = useLotes.lotes.filter((lote: any) => useProductor.perfilProductor.lotes?.some(idLote => idLote._id === lote._id))
console.log(lotes);
</script>

<style scoped >
/* Ocultar barras de desplazamiento en navegadores modernos */ 
.scrollbar-hide::-webkit-scrollbar { 
  display: none; 
} 

.scrollbar-hide {
  -ms-overflow-style: none; /* IE y Edge */ 
  scrollbar-width: none; /* Firefox */ 
}
@media (min-width: 768px) {
  .scrollbar-hide::-webkit-scrollbar{
  display: block; 

}

.scrollbar-hide {
  -ms-overflow-style: auto; /* IE y Edge */ 
  scrollbar-width: auto; /* Firefox */ 
}
}

</style>
