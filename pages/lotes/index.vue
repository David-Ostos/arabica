<template>
  <div class="flex flex-col sm:flex-row gap-8 mt-16 z-0 justify-between relative flex-grow sm:mr-8"
    :style="containerStyles">
    <!-- Menu de filtros pc -->
    <div v-if="!isScreenSmall" :style="containerStyles"
      class="relative -z-10 overflow-x-hidden max-h-screen transition-width ease-in-out duration-700 dark:bg-gray-800 text-gray-900 dark:-text-dar border-r border-inset border-gray-300 dark:border-gray-700 focus:border-2 focus:border-primary-500 dark:focus:border-primary-400 pb-8 px-4"
      :class="[
        isOpen ? ' w-1/4 overflow-y-auto ' : ' w-[74px] overflow-y-hidden',
        useLotes.lotes.length > 0 ? ' w-1/3' : 'w-1/4',
      ]">
      <div class="sticky w-full top-0 flex justify-between items-center bg-white z-[60] py-4"
        :class="isOpen ? 'px-4' : ''">
        <h1 class="font-semibold text-xl text-thirdary overflow-hidden transition-width duration-700 ease-in-out"
          :class="!isOpen ? 'w-0 opacity-0' : 'opacity-100'">
          Filtros
        </h1>
        <div class="text-xl border rounded-md p-2 flex justify-center items-center cursor-pointer"
          @click="isOpen = !isOpen">
          <UIcon name="i-ic-round-menu" class="" dynamic />
        </div>
      </div>
      <div :class="isOpen ? '  opacity-100' : 'opacity-0'"
        class="overflow-auto transition-all ease-in-out duration-700 mt-4">
        <div>
          <UButton color="white" @click="console.log(filtersSearch)">filtersSearch</UButton>
        </div>
        <LotesMenuFiltros 
          @filtro-muestra="filtrarMuestra" 
          @close="closeMenuFiltro" 
          @filtros-select="filtrarSelect"
          @filtro-pais="filtrarPais" 
          @filtro-origen="filtrarOrigen" 
          @filtros-range="filtrarRange"
        />
      </div>
    </div>
    <!-- /Menu de filtros pc -->

    <!-- menu mobile -->
    <div v-if="isScreenSmall">
      <div class="fixed flex justify-center gap-4 items-center border-b shadow-sm pt-6 py-4 bg-white z-50 w-full">
        <button @click="mobileFiltroMenu = true"
          class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center">
          <UIcon name="i-material-symbols-filter-alt-outline" dynamic /> Filtros
        </button>

        <LotesMenuOrdenar />
      </div>
    </div>

    <!-- Menu filtro -->
    <!--  <USlideover side="left" v-model="mobileFiltroMenu" :ui="{ width: 'w-[80%] max-w-[80%]' }">
    <UCard class="flex flex-col flex-1"
      :ui="{ backgound: 'dark:bg-white', body: { base: 'flex-1' }, ring: '', divide: '' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:-text-dar capitalize">
            Filtros
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="mobileFiltroMenu = false" />
        </div>
      </template>



</UCard>
</USlideover> -->
    <USlideover side="left" v-model="mobileFiltroMenu" :ui="{ width: 'w-[80%] max-w-[80%]' }">
      <UCard class="flex flex-col flex-1" :ui="{
        backgound: 'dark:bg-white',
        body: { base: 'flex-1' },
        ring: '',
        divide: '',
      }">
        <template #header>
          <div ref="headerMobileSlider" class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:-text-dar capitalize">
              Filtros
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="mobileFiltroMenu = false" />
          </div>
        </template>
        
        <div>  
        
          <div class="grid grid-cols-2 gap-2 w-full">
          <UButton color="white" @click="console.log(filtersSearch)">filtersSearch</UButton>
          </div>
          
          
          

          <!-- <div class="grid grid-cols-2 gap-2 w-fit">
            <UButton class="col-span-1" block variant="outline" @click="console.log({ filtroMuestra })"> filtroMuestra
            </UButton>
            <UButton class="col-span-1" block variant="outline" @click="console.log({ filtroPais })"> filtroPais
            </UButton>
            <UButton class="col-span-1" block variant="outline" @click="console.log({ filtroOrigen })"> filtroOrigen
            </UButton>
            <UButton class="col-span-1" block variant="outline" @click="console.log({ filtroProductores })">
              filtroProductores
            </UButton>
            <UButton class="col-span-1" block variant="outline" @click="console.log({ filtroVariedades })">
              filtroVariedades
            </UButton>
            <UButton class="col-span-1" block variant="outline" @click="console.log({ filtroProcesos })"> filtroProcesos
            </UButton>
            <UButton class="col-span-1" block variant="outline" @click="console.log({ filtroPerfil })"> filtroPerfil
            </UButton>
            <UButton class="col-span-1" block variant="outline" @click="console.log({ filtroCertificaciones })">
              filtroCertificaciones</UButton>

          </div> -->

          <LotesMenuFiltros 
          @filtro-muestra="filtrarMuestra" 
          @close="closeMenuFiltro" 
          @filtros-select="filtrarSelect"  
          @filtro-pais="filtrarPais" 
          @filtro-origen="filtrarOrigen" 
          @filtros-range="filtrarRange"
          />
        </div>
      </UCard>
    </USlideover>

    <!-- /Menu filtro -->

    <!-- Menu Ordenar -->

    <!-- <LotesMenuFiltros 
      
      :items="{
        lotes:lotesFilter,
        isOpen:mobileFiltroMenu
      }"
      @close="closeMenuFiltro" /> -->
    <!-- /Menu Ordenar -->

    <!-- /menu mobile -->

    <!-- show card lote -->
    <div class="flex gap-8 mx-4 z-0 justify-between relative flex-grow sm:overflow-auto sm:w-3/4"
      :class="isScreenSmall ? 'scrollbar-hide' : ''">
      <div class="mt-5 pb-10 transition-width ease-in-out duration-700 mx-auto flex-grow">
        <h1
          class="font-bold text-base md:text-lg text-gray-800 line-clamp-2 hover:line-clamp-none transition-all duration-1000 mb-4">
          {{
            filtersActive === false ? useLotes.lotes.length : lotesFilter.length
          }}
          Lotes disponibles
        </h1>
        <div class="grid sm:grid-cols-3 grid-cols-1 gap-4 justify-center sm:justify-start sm:mr-4 mb-10">
          <div v-for="item in filtersActive === false
            ? useLotes.lotes
            : lotesFilter" class="col-span-1 min-w-64 mb-4 relative">
            <LotesCard :item="item" />
          </div>
        </div>

        <div v-if="
          filtersActive === false
            ? useLotes.lotes.length === 0
            : lotesFilter.length === 0
        ">
          <p>No hay lotes disponibles</p>
        </div>
      </div>
    </div>
    <!-- /show card lote -->
  </div>
</template>
<script lang="ts" setup>
import { Wheat } from "lucide-vue-next";
import type { FiltersSearch } from "~/interfaces/FiltersSearch";

definePageMeta({
  layout: "lote",
});

const { isScreenSmall } = useGlobalComposable();
const useGlobal = useGlobalStore();
const headerMobileSlider = ref();
const headerMobileSliderHeight = ref(0);
const mobileFiltroMenu = ref(false);

const isOpen = ref(false);
const showOrigins = ref(false);
const selectedorigin = ref("");
const useLotes = useLotesStore();
const filtersActive = ref(false);
const lotesFilter = ref<any>([]);

const containerStyles = computed(() => ({
  "max-height": `calc(100vh - (${useGlobal.heightNavLote}px + ${useGlobal.heightFooterLote}px) )`,
}));

const mobileOrdenarMenu = ref(false);

const filtersSearch = reactive<FiltersSearch>({
  muestra: undefined,
  paises: undefined,
  origenes: undefined,
  productores: undefined,
  variedades: undefined,
  procesos: undefined,
  perfil: undefined,
  certificaciones: undefined,
  clasificacion: undefined,
  precio: undefined,
  puntaje: undefined,
});

const options = [
  {
    value: "disponibilidad",
    label: "Disponibilidad",
  },
  {
    value: "precioMenor",
    label: "precio: de menor a mayor",
  },
  {
    value: "precioMayor",
    label: "precio: de mayor a menor",
  },
  {
    value: "puntuacionMayor",
    label: "puntuacion: de menor a mayor",
  },
  {
    value: "puntuacionMenor",
    label: "puntuacion: de mayor a menor",
  },
  {
    value: "masReciente",
    label: "cosecha mas reciente",
  },
];

const selected = ref("disponibilidad");

/* filtros */

/* muestra */
const filtroMuestra = ref(false);
const filtrarMuestra = (value: boolean) => {
  console.log(value);
  filtersSearch.muestra = value;
};
/* /muestra */

/* pais */
const filtroPais: Ref<string[]> = ref([]);
const filtrarPais = (pais: string[]) => {
  filtersSearch.paises = pais;
};
/* /pais */
/* origen  */
const filtroOrigen = ref([] as string[]);
const filtrarOrigen = (origen: string[]) => {
  filtersSearch.origenes = origen;
};
/* /origen  */

/* filtros select */
const filtroProductores = ref([] as string[]);
const filtroVariedades = ref([] as string[]);
const filtroProcesos = ref([] as string[]);
const filtroPerfil = ref([] as string[]);
const filtroCertificaciones = ref([] as string[]);
const filtroClasificaciones = ref([] as string[]);

const filtrarSelect = (tipo: string, value: string[]) => {
  switch (tipo) {
    case "Certificaciones":
    case "certificaciones":
      filtersSearch.certificaciones = value;
      break;
    case "Perfil":
    case "perfil":
      filtersSearch.perfil = value;
      break;
    case "Procesos":
    case "procesos":
      filtersSearch.procesos = value;
      break;
    case "Variedades":
    case "variedades":
      filtersSearch.variedades = value;
      break;
    case "Productores":
    case "productores":
      filtersSearch.productores = value;
      break;
      case "clasificacion":
      case "Clasificación de Lotes":
      filtersSearch.clasificacion = value;
      break;
    default:
      console.error("Tipo de filtro no reconocido:", tipo);
      return;
  }

  // console.log(filtroProductores.value);
  // console.log(`${tipo}:`, targetArray);

  // const index = targetArray.indexOf(value);
  // if (index > -1) {
  //   // Si el valor ya está en el array, lo quitamos
  //   targetArray.splice(index, 1);
  // } else {
  //   // Si el valor no está en el array, lo añadimos
  //   targetArray.push(value);

  // }else{
  //   switch (tipo) {
  //   case 'certificaciones':
  //     filtroCertificaciones.value = [];
  //     break;
  //     case 'perfil':
  //     filtroPerfil.value = [];
  //     break;
  //   case 'procesos':
  //     filtroProcesos.value = [];
  //     break;
  //   case 'variedades':
  //     filtroVariedades.value = [];
  //     break;
  //   case 'productores':
  //     filtroProductores.value = [];
  //     break;
  //     default:
  //       console.error('Tipo de filtro no reconocido:', tipo);
  //       return;
  //     }
  // }
};
/* /filtros select */

/* /filtros range */
const filtroPuntaje = ref([] as  [number, number] | [])
const filtroPrecio = ref([] as [number, number] | [])

const filtrarRange = (tipo: string, value: [number, number] | [] ) =>{
  switch (tipo) {
    case 'puntaje':
      filtersSearch.puntaje = value
      break;
    case 'precio':
      filtersSearch.precio = value
      break;
    default:
      console.error("Tipo de filtro no reconocido:", tipo);
      return;
  }
  console.log({puntaje:filtersSearch.puntaje })
  console.log({precio: filtersSearch.precio})
}
/* filtros range */

/* /filtros */

const closeMenuFiltro = () => {
  mobileFiltroMenu.value = false;
};



watch(filtersSearch, () => {
  applyFilter()
})

const applyFilter = () => {
  const filteredLotes = useLotes.lotes.filter((lote) => {
    if (
      filtersSearch.muestra !== undefined &&
      lote.muestra?.muestra !== filtersSearch.muestra
    ) {
      return false;
    }

    if (filtersSearch.paises !== undefined) {
      for (let i of filtersSearch.paises) {
        if (lote.pais?.toLowerCase() === i?.toLowerCase()) {
          return true;
        } else {
          return false;
        }
      }
    }
    
    if (filtersSearch.origenes !== undefined) {
      for (let i of filtersSearch.origenes) {
        if (lote.origen?.toLowerCase() === i?.toLowerCase()) {
          return true;
        } else {
          return false;
        }
      }
    }

    if(filtersSearch.productores && filtersSearch.productores.length > 0 ){
      if(lote.productores! === null){
        return
      }
      return filtersSearch.productores
        .map((productores) => productores.toLowerCase())
        .includes(lote.productores!.toLowerCase());
    }

    if (filtersSearch.variedades && filtersSearch.variedades.length > 0) {
      if (lote.variedad! === null) {
        return;
      }
      return filtersSearch.variedades
        .map((variedad) => variedad.toLowerCase())
        .includes(lote.variedad!.toLowerCase());
    }


    if (filtersSearch.procesos && filtersSearch.procesos.length > 0) {
      if (lote.proceso! === null) {
        return;
      }

      return filtersSearch.procesos
        .map((procesos) => procesos.toLowerCase())
        .includes(lote.proceso!.toLowerCase());
    }

    if (filtersSearch.perfil && filtersSearch.perfil.length > 0) {
      if (lote.proceso! === null) {
        return;
      }

      return filtersSearch.perfil
        .map((perfil) => perfil.toLowerCase())
        .includes(lote.perfil!.toLowerCase());
    }

    if (filtersSearch.certificaciones && filtersSearch.certificaciones.length > 0) {
      if (lote.certificaciones! === null) {
        return;
      }

      return filtersSearch.certificaciones
        .map((cert) => cert.toLowerCase())
        .includes(lote.certificaciones!.toLowerCase());
    }

    if (filtersSearch.clasificacion && filtersSearch.clasificacion.length > 0) {
      if (lote.cantidadLote! === null) {
        return;
      }

      return filtersSearch.clasificacion
        .map((clasificacion) => clasificacion.toLowerCase())
        .includes(lote.cantidadLote!.toLowerCase());
    }

    if (filtersSearch.puntaje) {
      const numeros = lote.puntaje;

      if (!numeros) {
        return;
      }
      // Convertimos los strings a números
      // const puntajeMinimo = Number(numeros[0]);
      // const puntajeMaximo = Number(numeros[1]) || Infinity; // Si hay "+" asumimos infinito
      return (
        numeros >= filtersSearch.puntaje[0]! &&
        numeros <= filtersSearch.puntaje[1]!
      );
    }

    if (filtersSearch.precio !== undefined) {
      return (
        lote.precio! >= filtersSearch.precio[0]! &&
        lote.precio! <= filtersSearch.precio[1]!
      );
    }

    return true;
  });

  lotesFilter.value = filteredLotes;
};

</script>

<style scoped lang="scss">
.h-lotes {
  height: calc(100vh - 56px);
}

.show-origins {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin: 0 auto;
  z-index: 50;
  padding-top: 4rem;
  background-color: rgba(0, 0, 0, 0.25);

  .container-origins {
    min-width: 60%;
    background-color: #fff;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);

    h1 {
      font-size: 1.3em;
      font-weight: 600;
      color: #515151;
    }

    .container-buttons {
      margin-top: 1rem;
      gap: 10px;

      .btn-all {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #515151;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        text-align: center;
        font-size: 0.9em;

        &:hover {
          background-color: rgb(74, 222, 128);
          color: #fff;
          font-weight: 500;
          border: 1px solid #fff;
        }
      }

      .btns-country {
        margin-top: 0.5rem;
      }

      .btn-country {
        padding: 0.5rem;
        border: 1px solid #515151;
        border-radius: 12px;
        display: flex;
        gap: 5px;
        justify-content: center;
        align-items: center;
        min-width: 120px;
        font-size: 0.9em;

        img {
          width: 20px;
          height: 20px;
        }

        &:hover {
          background-color: rgb(74, 222, 128);
          color: #fff;
          font-weight: 500;
          border: 1px solid #fff;
        }
      }
    }
  }

  .show-results {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 1rem;

    button {
      padding: 0.5rem;
      border-radius: 12px;
      display: flex;
      gap: 5px;
      justify-content: center;
      align-items: center;
      min-width: 120px;
      font-size: 0.9em;
      color: #fff;
      background-color: rgb(74, 222, 128);
    }
  }
}

.active {
  background-color: rgb(74, 222, 128);
  border: 2px solid #fff !important;
  color: #fff;
}
</style>
