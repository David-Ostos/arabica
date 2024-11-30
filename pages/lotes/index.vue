<template>
  <UModal v-model="showOrigins">
    <div v-if="showOrigins === true" class="show-origins z-50">
      <div class="container-origins">
        <div class="flex justify-between items-center">
          <h1>Selecciona tus orígenes</h1>
          <button @click="showOrigins = false">
            <span class="i-heroicons-x-mark"></span>
          </button>
        </div>
  
        <div class="container-buttons">
          <div>
            <button
              class="btn-all"
              @click="handleOriginFilter('all')"
              :class="{ active: selectedorigin === 'all' }"
            >
              Todos los orígenes
            </button>
          </div>
  
          <div class="btns-country">
            <button
              class="btn-country"
              @click="handleOriginFilter('perú')  "
              :class="{ active: selectedorigin === 'perú' }"
            >
              <img :src="iconPeru" />
              Perú
            </button>
          </div>
        </div>
  
        <div class="show-results">
          <button @click="showOrigins = false">Ver resultados</button>
        </div>
      </div>
    </div>
  </UModal>
  <div class="flex flex-col sm:flex-row gap-8 z-0 justify-between relative flex-grow sm:mr-8">
    
    
    <!-- Menu de filtros pc -->
    <div v-if="!isScreenSmall" 
      class="relative transition-width ease-in-out duration-700 shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar border-r border-inset border-gray-300 dark:border-gray-700 focus:border-2 focus:border-primary-500 dark:focus:border-primary-400 py-5 px-4"
      :class="[
        isOpen ? ' w-1/4' : ' w-[6%]',
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
      <div  class="h-full">
        <Filters
          v-if="isOpen"
          :handleOrigin="handleShowOrigin"
          :filtersSearch="filtersSearch"
          :filterActive="filtersActive"
          @filter-changed="handleFilterChange"
          @clean="cleanFilter"
        />
      </div>
    </div>
    <!-- /Menu de filtros pc -->

       
    <!-- menu mobile -->
    <div v-if="isScreenSmall">
      <div class="fixed flex justify-center gap-4 items-center border-b shadow-sm pt-6 py-4 bg-white z-50 w-full">
        <button @click="mobileFiltroMenu = true" class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"><UIcon name="i-material-symbols-filter-alt-outline" dynamic /> Filtros</button>
        
        <LotesMenuOrdenar/>
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
    <!-- /Menu filtro -->

    <!-- Menu Ordenar -->

    <USlideover side="left" v-model="mobileFiltroMenu" :ui="{ width: 'w-[80%] max-w-[80%]' }">
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

      <Filters
          :handleOrigin="handleShowOrigin"
          :filtersSearch="filtersSearch"
          :filterActive="filtersActive"
          @filter-changed="handleFilterChange"
          @clean="cleanFilter"
        />
      
    </UCard>
  </USlideover>
    <!-- <LotesMenuFiltros 
      
      :items="{
        lotes:lotesFilter,
        isOpen:mobileFiltroMenu
      }"
      @close="closeMenuFiltro" /> -->
    <!-- /Menu Ordenar -->
    
    <!-- /menu mobile -->




    <!-- show card lote -->
    <div
      class="flex gap-8 mx-4 mt-12 z-0 justify-between relative flex-grow sm:overflow-auto sm:w-3/4"
      :class="isScreenSmall ? 'scrollbar-hide':''"
    >
      <div
        class="mt-5 pb-10 transition-width ease-in-out duration-700 mx-auto flex-grow h-lotes"
      >
        <h1
          class="font-bold text-base md:text-lg text-gray-800 line-clamp-2 hover:line-clamp-none transition-all duration-1000 mb-4"
        >
          {{
            filtersActive === false ? useLotes.lotes.length : lotesFilter.length
          }}
          Lotes disponibles
        </h1>
        <div class="grid sm:grid-cols-3 grid-cols-1 gap-4 justify-center sm:justify-start sm:mr-4 mb-10">
          <div
            v-for="item in filtersActive === false
              ? useLotes.lotes
              : lotesFilter"
            class="col-span-1  min-w-64 mb-4 relative"
          >
            <LotesCard :item="item" />
          </div>
        </div>

        <div
          v-if="
            filtersActive === false
              ? useLotes.lotes.length === 0
              : lotesFilter.length === 0
          "
        >
          <p>No hay lotes disponibles</p>
        </div>
      </div>
    </div>
    <!-- /show card lote -->



  </div>
</template>
<script lang="ts" setup>
import type { FiltersSearch } from "~/interfaces/FiltersSearch";
import Filters from "./Filters.vue";
import iconPeru from "/img/icons/peru.svg";

definePageMeta({
  layout: "lote",
});

const isOpen = ref(false);
const showOrigins = ref(false);
const selectedorigin = ref("");
const useLotes = useLotesStore();
const filtersActive = ref(false);
const lotesFilter = ref<any>([]);

const mobileFiltroMenu = ref(false)
const mobileOrdenarMenu = ref(false)
const {isScreenSmall} = useGlobalComposable()
const filtersSearch = ref<FiltersSearch>({
  samplesAvailable: undefined,
  origin: undefined,
  points: undefined,
  price: undefined,
  certifications: undefined,
  process: undefined,
});

const options = [{
  value: 'disponibilidad',
  label: 'Disponibilidad'
}, {
  value: 'precioMenor',
  label: 'precio: de menor a mayor'
}, {
  value: 'precioMayor',
  label: 'precio: de mayor a menor'
}, {
  value: 'puntuacionMayor',
  label: 'puntuacion: de menor a mayor'
}, {
  value: 'puntuacionMenor',
  label: 'puntuacion: de mayor a menor'
}, {
  value: 'masReciente',
  label: 'cosecha mas reciente'
}]

const selected = ref('disponibilidad')


const closeMenuFiltro = () =>{
  mobileFiltroMenu.value = false
}

const handleShowOrigin = () => {
  showOrigins.value = !showOrigins.value;
};

const handleFilterChange = (newFilters: FiltersSearch) => {
  filtersSearch.value = { ...filtersSearch.value, ...newFilters };

  let hasActiveFilter = false;
  for (let key of Object.keys(filtersSearch.value)) {
    if (
      filtersSearch.value.hasOwnProperty(key) &&
      filtersSearch.value[key as keyof FiltersSearch] !== undefined
    ) {
      hasActiveFilter = true;
      break;
    }
  }

  if (hasActiveFilter) {
    filtersActive.value = true;
    applyFilter();
  } else {
    filtersActive.value = false;
  }
};

const applyFilter = () => {
  const filteredLotes = useLotes.lotes.filter((lote) => {
    if (
      filtersSearch.value.samplesAvailable !== undefined &&
      lote.muestra?.muestra !== filtersSearch.value.samplesAvailable
    ) {
      return false;
    }

    if (filtersSearch.value.origin !== undefined) {
      for (let i of filtersSearch.value.origin) {
        if (lote.pais === i) {
          return true;
        } else {
          return false;
        }
      }
    }

    if (filtersSearch.value.process && filtersSearch.value.process.length > 0) {
      if (lote.proceso! === null) {
        return;
      }

      return filtersSearch.value.process
        .map((processo) => processo.toLowerCase())
        .includes(lote.proceso!.toLowerCase());
    }
    if (
      filtersSearch.value.certifications &&
      filtersSearch.value.certifications.length > 0
    ) {
      if (lote.certificaciones! === null) {
        return;
      }

      return filtersSearch.value.certifications
        .map((cert) => cert.toLowerCase())
        .includes(lote.certificaciones!.toLowerCase());
    }

    if (filtersSearch.value.points !== undefined) {
      const numeros = lote.puntaje!.match(/\d+/g);

      if (!numeros) {
        return;
      }
      // Convertimos los strings a números
      const puntajeMinimo = Number(numeros[0]);
      const puntajeMaximo = Number(numeros[1]) || Infinity; // Si hay "+" asumimos infinito
      return (
        puntajeMinimo >= filtersSearch.value.points[0] &&
        puntajeMaximo <= filtersSearch.value.points[1]
      );
    }

    if (filtersSearch.value.price !== undefined) {
      console.log(lote.precio);

      return (
        lote.precio! >= filtersSearch.value.price[0] &&
        lote.precio! <= filtersSearch.value.price[1]
      );
    }

    return true;
  });

  lotesFilter.value = filteredLotes;
};

const handleOriginFilter = (param: string) => {
  if (param === "all") {
    selectedorigin.value = "all";
  } else {
    selectedorigin.value = "perú";
  }

  if (filtersSearch.value.origin === undefined) {
    filtersSearch.value.origin = [];
  }

  if (
    filtersSearch?.value.origin &&
    filtersSearch?.value?.origin[0] === undefined
  ) {
    filtersSearch.value.origin = ["perú"];

    console.log(filtersSearch.value.origin);
    filtersActive.value = true;
    applyFilter();
  }
};

const cleanFilter = () => {
  filtersSearch.value = {
    samplesAvailable: undefined,
    origin: undefined,
    points: undefined,
    price: undefined,
    certifications: undefined,
    process: undefined,
  };

  filtersActive.value = false;
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
