<template>
  <div class="flex gap-8 z-0 justify-between relative flex-grow">
    <div
      class="relative transition-width w-1/3 ease-in-out duration-700 shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-r border-inset border-gray-300 dark:border-gray-700 focus:border-2 focus:border-primary-500 dark:focus:border-primary-400 py-5 px-4"
      :class="isOpen ? ' w-1/4' : ' w-24'"
    >
      <div class="w-fit absolute right-5">
        <div
          class="mb-4 text-xl border rounded-md p-2 flex justify-center items-center"
          @click="isOpen = !isOpen"
        >
          <UIcon name="i-ic-round-menu" class="" dynamic />
        </div>
      </div>
      <div class="h-full">
        <div class="flex flex-col justify-center gap-10 h-full">
          <button
            v-for="item in links"
            @click="item.accion"
            class="group text-xl border bg-white items-center rounded-md py-1 px-2 mb-4 ease-in-out duration-700 truncate flex gap-1 relative hover:cursor-pointer hover:bg-gray-300 transition-all hover:border-gray-600"
            :class="[
              {
                ' w-44': isOpen,
                'w-[38px]': !isOpen,
              },
              item.color,
              
              {'!bg-gray-300 border-gray-600': item.isActive}
              
            ]"
          >
            <UIcon
              :name="item.icon"
              class="absolute left-[6px] mr-2 text-2xl transition-all duration-700 group-hover:text-white"
              :class="{'text-white': item.isActive}"
              dynamic
            />
            <span
              class="ml-7 transition duration-500 ease-in-out text-dark capitalize"
              :class="isOpen ? 'opacity-100' : 'opacity-0 '"
              >{{ item.label }}</span
            >
          </button>
        </div>
      </div>
    </div>

    <div
      class="mt-5 pb-10 transition-width ease-in-out duration-700 mx-auto flex-grow h-screen-topBar-footer overflow-auto"
    >
      <h1
        class="font-bold text-base md:text-lg text-gray-800 line-clamp-2 hover:line-clamp-none transition-all duration-1000 mb-4"
      >
        {{ useLotes.lotes.length }} Lotes disponibles
      </h1>
      <div class="flex flex-wrap gap-4 justify-between mr-4 ">
        <div v-for="item in useLotes.lotes" class=" w-[30%] mb-4 relative group">
          <div
            class="absolute top-7 right-7 z-50 bg-white rounded-full flex text-3xl justify-center items-center transition-all ease-in-out duration-300 transform group-hover:-translate-y-2"
          >
            <UIcon
              v-if="isEdit"
              name="i-material-symbols-light-build-circle-outline"
              class="text-cyan-500 cursor-pointer hover:bg-white hover:scale-110 rounded-full"
              dynamic
            />

            <UIcon
              v-if="isRemove"
              name="i-heroicons-x-circle"
              class="text-rose-600 cursor-pointer hover:bg-white hover:scale-110 rounded-full"
              dynamic
            />

            <UIcon
              v-if="isShow"
              name="i-ic-baseline-remove-circle-outline"
              class="text-secundary cursor-pointer hover:bg-white hover:scale-110 rounded-full"
              dynamic
            />
          </div>
          <ProductorLotesCard :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useLotesStore } from '~/stores/Lotes';

definePageMeta({
  middleware: "productor",
  layout: "productor",
});
const useLotes = useLotesStore()
const router = useRouter()

const isOpen = ref(false);
const isEdit = ref(false);
const isRemove = ref(false);
const isShow = ref(false);

const links = ref([
  {
    label: "agregar",
    icon: "i-heroicons-plus-circle",
    color: "text-primary-600 border-primary-600 ",
    isActive:false,
    accion: () => {
      router.push('/dashboard/productor/lotes/crear')
    },
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

<style></style>
