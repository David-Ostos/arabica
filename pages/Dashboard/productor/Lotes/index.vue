<template>
<div class="overflow-hidden">
  <ModalsNotificacion v-if="openModalNotificacion" @close="closeModal" titulo="Registro del usuario incompleto" 
    contenido-one="Debes registrarte e introducir todos los datos requeridos para agregar algun lote." 
    contenido-two="" icon="info"  
    texto-boton="Terminar el registro"
    :to="`/dashboard/${useUser.dataUser.tipoUser}`"
  />

  <ModalsNotificacion v-if="openModalNotificacionLoad" @close="closeModal" titulo="Actualizando..." 
    :contenido-one="mensajeNotificacionLoad" 
    contenido-two="" 
    :loading="true"
    icon="loading"  
    texto-boton=""
    />
    
    <div :style="containerStyles" class="flex gap-8 z-0 justify-between relative flex-grow mr-8 mx-8 md:mx-0 overflow-hidden">
      
      <!-- muestra los lotes del productor -->
    <ProductorLotesMenuDeskot :isOpen="isOpen" :links="links" @chage-menu="changeMenu" :lotes="lotes"/>
      <!-- /muestra los lotes del productor -->

    <div
      v-if="lotes.length > 0"
      :class="['  transition-width ease-in-out duration-700 w-1 mx-auto flex-grow h-screen-topBar-footer overflow-auto ', {'scrollbar-hide': isScreenSmall}]"

    >
      <!-- estos son los lotes visibles-->

      <div class="">
          <div
            class="flex justify-between gap-1  my-4 md:mb-4 md:py-4 cursor-pointer  transition-all duration-100 w-full"
          >
          <div class="flex items-center text-gray-800  hover:!text-primary-600"
            @click="hiddenVisibles = !hiddenVisibles">
            <h1 v-if="lotesVisibles.length > 1" class="font-bold text-base md:text-lg" @click="">
              {{ lotesVisibles.length }} Lotes Activos
            </h1>
            <h1 v-if="lotesVisibles.length === 1" class="font-bold text-base md:text-lg" @click="">
              {{ lotesVisibles.length }} Lote Activo
            </h1>
  
            <div>
              <UIcon
                v-if="lotesVisibles.length !== 0"
                :class="hiddenVisibles ? 'rotate-180' : ''"
                name="i-material-symbols-keyboard-arrow-up-rounded"
                class="text-xl"
                dynamic
              />
              <UIcon
                v-if="lotesVisibles.length === 0"
                name="i-openmoji-hyphen-minus"
                dynamic
              />
          </div>
            </div>
  
             <div v-if="isScreenSmall" class="text-xl border-primary-600 border text-primary-600 border-gray-800 hover:border-primary-600 hover:!text-primary-600 flex justify-center items-center bg-white  rounded-md py-1 px-2"
             @click="links[0].accion">
            <UIcon
              
              name="i-heroicons-plus-circle"
              class=" text-2xl "
              dynamic
            />
          </div>

          </div>

        <div
          :class="[hiddenVisibles ? 'opacity-0 sm:hidden lg:hidden md:hidden hidden ' : 'opacity-100']"
          class="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-between mr-4 transition-all ease-in-out duration-500 overflow-x-hidden "
        >
          <div
            v-for="item in lotesVisibles"
            class="col-span-1 mb-4 relative group "
          >
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
                @click="
                  (isOpenModal = true),
                    (dataDeleteModal = {id: item._id!, nombre: item.nombre!})
                "
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
      <!-- /estos son los lotes visibles-->

      <!-- estos son los lotes ocultos -->
      <div class="border-t">
        <div
          class="flex gap-1 items-center mt-6 mb-4 md:mb-8 md:py-4 cursor-pointer text-gray-800 hover:!text-primary-600 transition-all duration-100 w-fit"
          @click="hiddenOcultos = !hiddenOcultos"
        >
          <h1 v-if="lotesVisibles.length > 1" class="font-bold text-base md:text-lg" @click="">
            {{ lotesOcultos.length }} Lotes Ocultos
          </h1>
          <h1 v-if="lotesVisibles.length === 1" class="font-bold text-base md:text-lg" @click="">
            {{ lotesOcultos.length }} Lote Oculto
          </h1>
          <div>
            <UIcon
              v-if="lotesOcultos.length !== 0"
              :class="hiddenOcultos ? 'rotate-180' : ''"
              name="i-material-symbols-keyboard-arrow-up-rounded"
              class="text-xl"
              dynamic
            />
            <UIcon
              v-if="lotesOcultos.length === 0"
              name="i-openmoji-hyphen-minus"
              dynamic
            />
          </div>

        </div>
        <div
          :class="hiddenOcultos ? 'opacity-0 sm:hidden lg:hidden md:hidden hidden  ' : 'opacity-100'"
          class="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-between transition-all ease-in-out duration-500"
        >
          <div
            v-for="item in lotesOcultos"
            class="col-span-1- mb-4 relative group"
          >
            <div
              class="absolute top-7 right-7 z-50 bg-white rounded-full flex text-3xl justify-center items-center transition-all ease-in-out duration-300 transform group-hover:-translate-y-2"
            >
              <UIcon
                v-if="isEdit"
                name="i-material-symbols-light-build-circle-outline"
                @click="
                toast.info(`Se va a editar el lote ${item.nombre}`, {
                  onClose(props) {
                      $router.push(`lotes/edit/${item._id}`)
                  },
                })"
                class="text-cyan-500 cursor-pointer hover:bg-white hover:scale-110 rounded-full"
                dynamic
              />

              <UIcon
                v-if="isRemove"
                name="i-heroicons-x-circle"
                @click="
                  (isOpenModal = true),
                    (dataDeleteModal = {id: item._id!, nombre: item.nombre!})
                "
                class="text-rose-600 cursor-pointer hover:bg-white hover:scale-110 rounded-full"
                dynamic
              />

              <UIcon
                v-if="isShow"
                name="i-hugeicons-plus-sign-circle"
                @click="ocultarLote(item._id!, item.ocultar!, item.nombre!)"
                class="text-primary cursor-pointer hover:bg-white hover:scale-110 rounded-full"
                dynamic
              />
            </div>
            <LotesCard class="opacity-55" :item="item" />
          </div>
        </div>
      </div>
    </div>
      <!-- /estos son los lotes ocultos -->

    <!-- /muestra los lotes del productor -->

    <!-- cuado no hay lotes creados -->
    <div
      v-else
      class="flex w-full md:mt-5 md:pb-10 transition-width ease-in-out duration-700 mx-auto flex-grow h-screen-topBar-footer overflow-auto"
    >
      <div
        class="bg-[url('/img/crear_lote.webp')] w-full flex flex-col justify-center items-center text-center md:my-10 px-4 rounded-2xl shadow-xl bg-top gap-4 bg-cover"
        :class="`bg-[url(${crearLote})]`"
      >
        <h1
          class="text-xl md:text-4xl font-bold text-white max-w-[891px] text-stroke"
        >
          ¿Que esperas? Agrega tu primer Lote de café.
        </h1>
        <p class="hidden sm:block font-mediun text-white max-w-[800px]">
          En el menu de la izquierda o en el boton de abajo puedes agregar tus lotes.
        </p>
        <p class="sm:hidden font-mediun text-white max-w-[800px]">
          En el boton de abajo puedes agregar tu primer lotede café.
        </p>
        <div>
          <Button
            class="text-3xl border bg-white items-center rounded-xl p-2 ease-in-out duration-700 truncate flex gap-1 relative hover:cursor-pointer hover:bg-gray-100 transition-all hover:border-gray-600 text-black ring-2 ring-offset-2 ring-primary ring-offset-black"
            @click="crearLote()"
          >
            <UIcon name="i-heroicons-plus-circle" class="font-bold" />
          </Button>
        </div>
      </div>
    </div>
    <!-- /cuado no hay lotes creados -->
  </div>

  <!-- Modal de eliminar lote -->
  <div>
    <UModal :ui="{container: 'items-center'}" v-model="isOpenModal">
      <div class="p-4 md:p-8">
        <div class="flex flex-col gap-4 items-center text-center">
          <UIcon name="i-heroicons-x-circle" class="text-rose-500 text-6xl" />
          <div>
            <h1 class="md:text-2xl font-semibold">
              Desea eliminar el Lote con el nombre
              <b class="text-rose-500 font-semibold">
                {{dataDeleteModal.nombre}}</b
              >.
            </h1>
            <p class="mt-4 md:mt-0">Al eliminarlo ya no podra recuperarlo.</p>
          </div>
          <UButton
            @click="deleteLote(dataDeleteModal.id, dataDeleteModal.nombre)"
            color="red"
            :loading="isLoadingModal"
            class="w-fit ring-2 ring-offset-2 ring-rose-500"
            >Eliminar</UButton
          >
        </div>
      </div>
    </UModal>
  </div>
</div>
</template>
<script lang="ts" setup>
import {toast} from "vue3-toastify";
import {useLotesStore} from "~/stores/Lotes";
import axios from "axios";
import type {Lotes} from "~/interfaces/Lotes";
import type {MyAxiosRequestConfig} from "~/interfaces/axios";
import { useUserStore } from '../../../../stores/user';

definePageMeta({
  middleware: "productor",
  layout: "productor",
});
const useLotes = useLotesStore();
const router = useRouter();
const useProductor = useProductorStore();
const useUser = useUserStore()
const useGlobal = useGlobalStore()

const {isScreenSmall} = useGlobalComposable()

const containerStyles = computed(() => {
  if(isScreenSmall.value){
    return `max-height: calc(100vh - ${useGlobal.heightNavProductor}px)`
  }else{
    return `max-height: calc(100vh - (${useGlobal.heightNavProductor}px + ${useGlobal.heightFooterProductor}px) )`
  }
});


const isOpen = ref(false);
const isEdit = ref(true);
const isRemove = ref(true);
const isShow = ref(true);

const lotesVisibles = ref([] as any);
const lotesOcultos = ref([] as any);
const hiddenVisibles = ref(false);
const hiddenOcultos = ref(false);

const isOpenModal = ref(false);
const dataDeleteModal = ref({} as {id: string; nombre: string});
const isLoadingModal = ref(false)
const lotes:Lotes[] = reactive(
  useLotes.lotes.filter(
    (lote) => lote.productor!._id === useProductor.perfilProductor._id
  )
);

const openModalNotificacion = ref(false) 
const openModalNotificacionLoad = ref(false) 
const mensajeNotificacionLoad = ref('')

const closeModal = (close: boolean)=>{
  openModalNotificacion.value = close
}
const changeMenu = ()=>{
  isOpen.value = !isOpen.value
}

const crearLote = ()=>{
  if(!useUser.dataUser.perfilBase){
    openModalNotificacion.value = true
    return
  }
  router.push('/dashboard/productor/lotes/crear')
}

function verificarLotes() {
  lotes.forEach((lote) => {
    if (lote.ocultar) {
      lotesOcultos.value.push(lote);
    } else {
      lotesVisibles.value.push(lote);
    }
  });
}

onMounted(() => {
  verificarLotes();
  if(isScreenSmall.value){
  isEdit.value = true;
  isRemove.value = true;
  isShow.value = true;
  }
});

export interface Link { 
  label: string;
  disable: boolean;
  icon: string;
  color: string;
  isActive: boolean;
  accion: () => void;

}

const links:Ref<Link[]> = ref([
  {
    label: "agregar",
    disable: !useUser.dataUser.perfilBase,
    icon: "i-heroicons-plus-circle",
    color: "text-primary-600 border-primary-600 ",
    isActive: false,
    accion: () => {
      if(useUser.dataUser.perfilBase) {
        router.push("/dashboard/productor/lotes/crear")
        return 
      } 
      else{ 
        openModalNotificacion.value = true
        return 

      } 
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
      if (lotes.length > 0 || lotesOcultos.value.length > 0 ) {
        links.value[2].isActive = !links.value[2].isActive;
        isRemove.value = !isRemove.value;
      }else{
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
  isLoadingModal.value = true

  try {
    await axios
      .delete(`${import.meta.env.VITE_URL_API}/api/content/item/lotes/${id}`, {
        headers: {
          "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
        },
      })
      .then(async (res) => {
        if (res.data.success) {
          const indicePerfilProductor =
            useProductor.perfilProductor.lotes!.findIndex(
              (lote) => lote._id === id
            );
          if (indicePerfilProductor > -1) {
            useProductor.perfilProductor.lotes!.splice(
              indicePerfilProductor,
              1
            );
          }
          const data = {
            _id: useProductor.perfilProductor._id,
            lotes: useProductor.perfilProductor.lotes,
          };

          await axios({
            url: `${import.meta.env.VITE_URL_API}/api/content/item/productores`,
            method: "POST",
            mode: "cors",
            headers: {
              "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
            },
            data: {data},
          } as MyAxiosRequestConfig)
            .then((res) => {})
            .catch((err) => {
              console.log(err)
            });

          const indiceLote = useLotes.lotes.findIndex(
            (lote) => lote._id === id
          );
          const indiceLoteProductor = lotes.findIndex(
            (lote) => lote._id === id
          );

          const indiceLoteOculto = lotesOcultos.value.findIndex(
            (lote: Lotes) => lote._id === id
          );

          const indiceLoteVisible = lotesVisibles.value.findIndex(
            (lote: Lotes) => lote._id === id
          );

          if (indiceLote > -1) {
            useLotes.lotes.splice(indiceLote, 1);
          }

          if (indiceLoteProductor > -1) {
            lotes.splice(indiceLoteProductor, 1);
          }

          if (indiceLoteOculto > -1) {
            lotesOcultos.value.splice(indiceLoteOculto, 1);
          }

          if (indiceLoteVisible > -1) {
            lotesVisibles.value.splice(indiceLoteVisible, 1);
          }

          toast.success(
            `Se a eliminado correctamente el lote con el nombre: ${nombre}`
          );
        }
      })
      .catch((e)=>{
        console.log(e)
        toast.error(
          `Hubo un error, por favor intente mas tarde.`
        );

      });
  } catch (error) {
    console.log(error);
  } finally {
    isOpenModal.value = false;
    isLoadingModal.value = false

  }
}

async function ocultarLote(id: string, ocultar: boolean, nombre: string) {

  openModalNotificacionLoad.value = true
  if(ocultar){
    mensajeNotificacionLoad.value = 'Se esta cambiando el estado del lote de oculto a visible, por favor espere'
  }  else{
    mensajeNotificacionLoad.value = 'Se esta cambiando el estado del lote de visible a oculto, por favor espere'
  }
  ocultar = !ocultar;
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
      lotesVisibles.value = [];
      lotesOcultos.value = [];
      const indiceLote = useLotes.lotes.findIndex((lote) => lote._id === id);
      const indiceLoteProductor = lotes.findIndex((lote) => lote._id === id);

      if (indiceLote > -1) {
        useLotes.lotes[indiceLote].ocultar = ocultar;
      }

      if (indiceLoteProductor > -1) {
        lotes[indiceLoteProductor].ocultar = ocultar;
      }

      verificarLotes();

      if (!ocultar) {
        toast.success(
          `Se a cambiado el estado de oculto a visible del lote con el nombre: ${nombre} correctamente`
        );
      } else {
        toast.success(
          `Se a cambiado el estado de visible a oculto del lote con el nombre: ${nombre} correctamente`
        );
      }
    })
    .catch((err) => console.log(err))
    .finally(()=>{
      openModalNotificacionLoad.value = false
      mensajeNotificacionLoad.value = ''
    });
}
</script>

<style scoped>
/* Ocultar barras de desplazamiento en navegadores modernos */ 
.scrollbar-hide::-webkit-scrollbar { 
  display: none; 
} 

.scrollbar-hide {
  -ms-overflow-style: none; /* IE y Edge */ 
  scrollbar-width: none; /* Firefox */ 
}
@media (min-width: 768px) {
  .scrollbar-show::-webkit-scrollbar{
  display: block; 

}

.scrollbar-show {
  -ms-overflow-style: auto; /* IE y Edge */ 
  scrollbar-width: auto; /* Firefox */ 
}
}
</style>
