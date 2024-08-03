<template>
  <div class="flex gap-8 z-0 justify-between relative flex-grow mr-8">
    <div
      class="relative transition-width ease-in-out duration-700 shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-r border-inset border-gray-300 dark:border-gray-700 focus:border-2 focus:border-primary-500 dark:focus:border-primary-400 py-5 px-4"
      :class="[
        isOpen ? ' w-[16%]' : ' w-[5%]',
        lotes.length > 0 ? ' w-1/3' : 'w-1/4',
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
          <button
            v-for="item in links"
            @click="item.accion"
            class="group text-xl border bg-white items-center rounded-md py-1 px-2 mb-4 ease-in-out duration-700 truncate flex gap-1 relative hover:cursor-pointer hover:bg-gray-100 transition-all hover:border-gray-600"
            :class="[
              {
                ' w-48': isOpen,
                'w-[38px]': !isOpen,
                ' !text-gray-500 !border-gray-500 hover:cursor-not-allowed hover:!text-gray-500 !bg-gray-200 ':
                  lotes.length === 0 && item.disable,
                '!bg-gray-300 border-gray-600': item.isActive,
              },
              item.color,
            ]"
          >
            <UIcon
              :name="item.icon"
              class="absolute left-[6px] mr-2 text-2xl transition-all duration-700 group-hover:text-gray-600"
              :class="{
                'text-white': item.isActive,
                'group-hover:text-gray-500': lotes.length === 0 && item.disable,
              }"
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

    <!-- muestra los lotes del productor -->
    <div
      v-if="lotes.length > 0"
      class="pt-5 pb-10 transition-width ease-in-out duration-700 w-1 mx-auto flex-grow h-screen-topBar-footer overflow-auto"
    >

    <!-- estos son los lotes visibles-->


    <div class="">
      <div class="flex gap-1 items-center mb-8 py-4 cursor-pointer text-gray-800 hover:!text-primary-600 transition-all duration-100 w-fit" 
      @click="hiddenVisibles = !hiddenVisibles"
      
      >
        <h1
          class="font-bold text-base md:text-lg"
          @click=""
        >
          {{ lotesVisibles.length }} Lotes Ocultos
        </h1>

        <div>
          <UIcon v-if="lotesVisibles.length !== 0" :class="hiddenVisibles ?'':'rotate-180'"  name="i-material-symbols-keyboard-arrow-up-rounded" class=" text-xl" dynamic/>
        </div>

        <UIcon v-if="lotesVisibles.length === 0" name="i-openmoji-hyphen-minus"  dynamic/>

      </div>
      <div :class="hiddenVisibles ? 'opacity-0 hidden ':'opacity-100' " class="grid grid-cols-3 gap-8 justify-between transition-all ease-in-out duration-500">
        <div v-for="item in lotesVisibles" class="col-span-1- mb-4 relative group">
          <div
            class="absolute top-7 right-7 z-50 bg-white rounded-full flex text-3xl justify-center items-center transition-all ease-in-out duration-300 transform group-hover:-translate-y-2"
          >
            <UIcon
              v-if="isEdit"
              name="i-material-symbols-light-build-circle-outline"
              @click="$router.push(`lotes/edit/${item._id}`)"
              class="text-cyan-500 cursor-pointer hover:bg-white hover:scale-110 rounded-full"
              dynamic
            />

            <UIcon
              v-if="isRemove"
              name="i-heroicons-x-circle"
              @click="deleteLote(item._id!, item.nombre!)"
              class="text-rose-600 cursor-pointer hover:bg-white hover:scale-110 rounded-full"
              dynamic
            />

            <UIcon
              v-if="isShow"
              name="i-ic-baseline-remove-circle-outline"
              @click="ocultarLote(item._id!, item.ocultar!, item.nombre!)"
              class="text-secundary cursor-pointer hover:bg-white hover:scale-110 rounded-full"
              dynamic
            />
          </div>
          <LotesCard :item="item" />
        </div>
      </div>
    </div>


    <!-- estos son los lotes ocultos -->

    <div class="border-t mr-4 " >
      <div class="flex gap-1 items-center mt-6 mb-8 py-4 cursor-pointer text-gray-800 hover:!text-primary-600 transition-all duration-100 w-fit" 
      @click="hiddenOcultos = !hiddenOcultos"
      
      >
        <h1
          class="font-bold text-base md:text-lg   "
          @click=""
        >
          {{ lotesOcultos.length }} Lotes Ocultos
        </h1>

        <div>
          <UIcon v-if="lotesOcultos.length !== 0" :class="hiddenOcultos ?'':'rotate-180'"  name="i-material-symbols-keyboard-arrow-up-rounded" class=" text-xl" dynamic/>
        </div>

        <UIcon v-if="lotesOcultos.length === 0" name="i-openmoji-hyphen-minus"  dynamic/>

      </div>
      <div :class="hiddenOcultos ? 'opacity-0 hidden ':'opacity-100' " class="grid grid-cols-3 gap-8 justify-between transition-all ease-in-out duration-500">
        <div v-for="item in lotesOcultos" class="col-span-1- mb-4 relative group">
          <div
            class="absolute top-7 right-7 z-50 bg-white rounded-full flex text-3xl justify-center items-center transition-all ease-in-out duration-300 transform group-hover:-translate-y-2"
          >
            <UIcon
              v-if="isEdit"
              name="i-material-symbols-light-build-circle-outline"
              @click="$router.push(`lotes/edit/${item._id}`)"
              class="text-cyan-500 cursor-pointer hover:bg-white hover:scale-110 rounded-full"
              dynamic
            />

            <UIcon
              v-if="isRemove"
              name="i-heroicons-x-circle"
              @click="deleteLote(item._id!, item.nombre!)"
              class="text-rose-600 cursor-pointer hover:bg-white hover:scale-110 rounded-full"
              dynamic
            />

            <UIcon
              v-if="isShow"
              name="i-mdi-eye-outline"
              @click="ocultarLote(item._id!, item.ocultar!, item.nombre!)"
              class="text-primary p-1  cursor-pointer hover:bg-white hover:scale-110 rounded-full"
              dynamic
            />
          </div>
          <LotesCard class="opacity-55" :item="item" />
        </div>
      </div>
    </div>

    </div>

    <!-- cuado no hay lotes creados -->
    <div
      v-else
      class="flex w-full mt-5 pb-10 transition-width ease-in-out duration-700 mx-auto flex-grow h-screen-topBar-footer overflow-auto"
    >
      <div
        class="bg-[url('/img/crear_lote.jpg')] w-full flex flex-col justify-center items-center text-center my-10 px-4 rounded-2xl shadow-xl bg-top gap-4 bg-cover"
        :class="`bg-[url(${crearLote})]`"
      >
        <h1
          class="text-xl md:text-4xl font-bold text-white max-w-[891px] text-stroke"
        >
          ¿Que esperas? Agrega tu primer Lote de café.
        </h1>
        <p class="font-thin text-white max-w-[800px]">
          En el menu de la izquierda puedes agregar tus lotes o en el boton de
          abajo.
        </p>
        <div>
          <div
            class="text-3xl border bg-white items-center rounded-xl p-2  ease-in-out duration-700 truncate flex gap-1 relative hover:cursor-pointer hover:bg-gray-100 transition-all hover:border-gray-600 text-black ring-2 ring-offset-2 ring-primary ring-offset-black"
            @click="router.push('/dashboard/productor/lotes/crear')"
          >
            <UIcon name="i-heroicons-plus-circle" class="font-bold" />
          </div>
        </div>

        <!-- <NuxtLink
          to="/guia/verificados"
          class="flex items-center gap-1 justify-center text-sm text-white"
          ><UIcon name="i-mdi-alert-circle" dynamic />Descubrir más</NuxtLink -->
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {toast} from "vue3-toastify";
import {useLotesStore} from "~/stores/Lotes";
import crearLote from "/img/crear_lote.webp";
import axios from "axios";

definePageMeta({
  middleware: "productor",
  layout: "productor",
});
const useLotes = useLotesStore();
const router = useRouter();
const useProductor = useProductorStore();

const isOpen = ref(false);
const isEdit = ref(false);
const isRemove = ref(false);
const isShow = ref(false);

const lotesVisibles = ref([] as any)
const lotesOcultos = ref([] as any)
const hiddenVisibles = ref(false)
const hiddenOcultos = ref(false)

const lotes = reactive(
  useLotes.lotes.filter(
    (lote) => lote.productor!._id === useProductor.perfilProductor._id
  )
);

function verificarLotes(){

  lotes.forEach(lote => {
    if(lote.ocultar){
      lotesOcultos.value.push(lote)
    }else{
      lotesVisibles.value.push(lote)
    }
  })
}

onMounted(()=>{
verificarLotes()

  console.log({lotesOcultos} , {lotesVisibles})
})

const links = ref([
  {
    label: "agregar",
    disable: false,
    icon: "i-heroicons-plus-circle",
    color: "text-primary-600 border-primary-600 ",
    isActive: false,
    accion: () => {
      router.push("/dashboard/productor/lotes/crear");
    },
  },
  {
    label: "editar",
    disable: true,
    icon: "i-material-symbols-light-build-circle-outline",
    color: "text-cyan-500 border-cyan-500 ",
    isActive: false,
    accion: () => {
      if (lotes.length > 0) {
        links.value[1].isActive = !links.value[1].isActive;
        isEdit.value = !isEdit.value;
      } else {
        toast.info("Tienes que agregar un producto para poder editar.");
      }
    },
  },
  {
    label: "eliminar",
    disable: true,
    icon: "i-heroicons-x-circle",
    color: "text-rose-600 border-rose-600",
    isActive: false,
    accion: () => {
      if (lotes.length > 0) {
        links.value[2].isActive = !links.value[2].isActive;
        isRemove.value = !isRemove.value;
      } else {
        toast.info("Tienes que agregar un producto para poder eliminar.");
      }
    },
  },
  {
    label: "ocultar/mostrar",
    icon: "i-ic-baseline-remove-circle-outline",
    color: "text-secundary border-secundary",
    isActive: false,
    disable: true,
    accion: () => {
      if (lotes.length > 0) {
        links.value[3].isActive = !links.value[3].isActive;
        isShow.value = !isShow.value;
      } else {
        toast.info("Tienes que agregar un producto para poder ocultar.");
      }
    },
  },
]);

async function deleteLote(id: string, nombre: string) {
  try {
    await axios
      .delete(`${import.meta.env.VITE_URL_API}/api/content/item/lotes/${id}`, {
        headers: {
          "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
        },
      })
      .then((res) => {
        if (res.data.success) {
          const indiceLote = useLotes.lotes.findIndex(
            (lote) => lote._id === id
          );
          const indiceLoteProductor = lotes.findIndex(
            (lote) => lote._id === id
          );
          if (indiceLote > -1) {
            lotes.splice(indiceLoteProductor, 1);
            useLotes.lotes.splice(indiceLote, 1);
          }
          toast.success(`Se a eliminado correctamente el lote con el nombre: ${nombre}`);
        }
      });
  } catch (error) {
    console.log(error);
  }
}

async function ocultarLote(id: string, ocultar: boolean, nombre: string) {
  ocultar = !ocultar
  await axios
    .post(
      `${import.meta.env.VITE_URL_API}/api/content/item/lotes`,
      // @ts-ignore
      {
        data: {_id: id, ocultar: ocultar},
      },
      {
        headers: {
          "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      lotesVisibles.value = []
      lotesOcultos.value = []
      console.log(lotesVisibles.value);
      console.log(lotesOcultos.value);
      console.log(res.data)
      const indiceLote = useLotes.lotes.findIndex(
            (lote) => lote._id === id
          );
          const indiceLoteProductor = lotes.findIndex(
            (lote) => lote._id === id
          );

          if (indiceLote > -1) {
            useLotes.lotes[indiceLote].ocultar = ocultar;
          }

          if(indiceLoteProductor > -1){
            lotes[indiceLoteProductor].ocultar = ocultar
          }

          verificarLotes()


          if(!ocultar){
            toast.success(`Se a cambiado el estado de oculto a visible del lote con el nombre: ${nombre} correctamente`);
          }else{
            toast.success(`Se a cambiado el estado de visible a oculto del lote con el nombre: ${nombre} correctamente`);
          }
    })
    .catch((err) => console.log(err));
}
</script>

<style></style>
