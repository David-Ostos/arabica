<template>
  <div class="flex gap-8 z-0 justify-between relative flex-grow mx-20 overflow-auto contenedor">
    <div
      class="mt-5 pb-10 transition-width ease-in-out duration-700 mx-auto flex-grow h-screen-topBar-footer "
    >
      <h1
        class="font-bold text-base md:text-lg text-gray-800 line-clamp-2 hover:line-clamp-none transition-all duration-1000 mb-4"
      >
        {{ useLotes.lotes.length }} Lotes disponibles
      </h1>
      <div class="flex flex-wrap gap-4 justify-between mr-4 ">
        <div v-for="item in useLotes.lotes" class=" w-[30%] mb-4 relative ">
          <ProductorLotesCard :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type {Lotes} from "~/interfaces/Lotes";
import { useLotesStore } from "~/stores/Lotes";

definePageMeta({
  middleware: "productor",
  layout: "productor",
});

const useProductor = useProductorStore();
const useLotes = useLotesStore()

const isEdit = ref(false);
const isRemove = ref(false);
const isShow = ref(false);

const links = ref([
  {
    label: "agregar",
    icon: "i-heroicons-plus-circle",
    color: "text-primary-600 border-primary-600 ",
    isActive:false,
    accion: () => {},
  },
  {
    label: "editar",
    icon: "i-material-symbols-light-build-circle-outline",
    color: "text-cyan-500 border-cyan-500 ",
    isActive:false,
    accion: () => {
      links.value[1].isActive = !links.value[1].isActive ;
      isEdit.value = !isEdit.value;
    },
  },
  {
    label: "eliminar",
    icon: "i-heroicons-x-circle",
    color: "text-rose-600 border-rose-600",
    isActive:false,
    accion: () => {
      links.value[2].isActive = !links.value[2].isActive;
      isRemove.value = !isRemove.value;
    },
  },
  {
    label: "ocultar",
    icon: "i-ic-baseline-remove-circle-outline",
    color: "text-secundary border-secundary",
    isActive:false,
    accion: () => {
      links.value[3].isActive = !links.value[3].isActive;
      isShow.value = !isShow.value;
    },
  },
]);


</script>

<style scoped >
/* Para navegadores basados en WebKit (Chrome, Safari, Opera) */
::-webkit-scrollbar {
  display: none;
}

/* Para Firefox */
* {
  scrollbar-width: none; /* Oculta la barra de desplazamiento */
  -ms-overflow-style: none; /* Para Internet Explorer y Edge */
}
.contenedor {
  overflow: auto;
}
</style>
