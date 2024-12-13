<template>
  <div>
    <div  class="" v-if="isScreenSmall">
      <div ref="botonesFiltro" class="fixed flex justify-center gap-4 items-center border-b shadow-sm pt-6 py-4 bg-white z-30 w-full">
        <button @click="isOpen = true"
          class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center">
          <UIcon name="i-material-symbols-filter-alt-outline" dynamic /> Filtros
        </button>

        <LotesMenuOrdenar :sortFunction="sortLotes" :initialSort="selected" @updateSort="selected = $event" />

      </div>
    </div>
    <!-- Menu de filtros -->
    <div class="">
      <div v-if="isOpen" class="fixed z-40 opacity-15 h-screen bg-gray-700 w-screen" @click="isOpen = false"></div>

      <div :style="containerStyles"
        class="transform  fixed z-50 overflow-x-hidden  transition-width ease-in-out duration-700 dark:bg-gray-800 text-gray-900 dark:-text-dar border-r border-inset bg-white border-gray-300 dark:border-gray-700 focus:border-2 focus:border-primary-500 dark:focus:border-primary-400 pb-8 px-4 "
        :class="[
          isOpen ? ' w-[350px] overflow-y-auto translate-x-0 ' : `w-0 sm:w-[74px] overflow-y-hidden ${styleMobileContainer}`,
          isScreenSmall ? 'scrollbar-hide overflow-auto' : ''
        ]">
        <div class="sticky w-full top-0 right-0 flex justify-between items-center bg-white z-[60] py-4"
          :class="isOpen ? 'px-4' : ''">
          <h1 class="font-semibold text-xl text-thirdary overflow-hidden transition-width duration-700 ease-in-out"
            :class="!isOpen ? 'w-0 opacity-0' : 'opacity-100'">
            Filtros
          </h1>
          <div v-if="!isScreenSmall"
            class="text-xl border rounded-md p-2 flex justify-center items-center cursor-pointer"
            @click="isOpen = !isOpen">
            <UIcon name="i-ic-round-menu" class="" dynamic />
          </div>

          <div v-if="isScreenSmall" :class="isOpen ? '' : 'hidden'"
            class="text-xl border rounded-md p-2 flex justify-center items-center cursor-pointer"
            @click="isOpen = !isOpen">
            <UIcon name="i-heroicons-x-mark-16-solid" class="" dynamic />
          </div>

        </div>
        <div :class="isOpen ? '  opacity-100' : 'opacity-0'"
          class="overflow-auto z-50 transition-all ease-in-out duration-700 mt-4">
          <LotesMenuFiltros @filtro-muestra="filtrarMuestra" @close="closeMenuFiltro" @filtros-select="filtrarSelect"
            @filtro-pais="filtrarPais" @filtro-origen="filtrarOrigen" @filtros-range="filtrarRange"
            @reset-all="resetAllFilters" />
        </div>
      </div>
    </div>
    <!-- /Menu de filtros -->
    <div class="flex flex-col sm:flex-row gap-8 mt-16 z-0 justify-between relative flex-grow sm:mr-8"
      :style="containerStyles">



      <!-- show card lote -->
      <div :style="marginBotonesFiltro"
        class="flex gap-8 mx-4 z-0 justify-between relative flex-grow sm:overflow-auto sm:ml-[74px] h-screen"
        :class="isScreenSmall ? 'scrollbar-hide' : ''">
        <div class="mt-5 pb-10 transition-width ease-in-out duration-700 mx-auto flex-grow">
          <div class="flex justify-between mr-4">
            <h1
              class="font-bold text-base md:text-lg text-gray-800 line-clamp-2 hover:line-clamp-none transition-all duration-1000 mb-4">
              {{
                lotesFilter.length
              }}
              {{ lotesFilter.length === 1 ? "Lote disponible" : 'Lotes disponibles' }}
            </h1>
            <div v-if="!isScreenSmall">
              <LotesMenuOrdenar :sortFunction="sortLotes" :initialSort="selected" @updateSort="selected = $event" />
            </div>


          </div>
          <div
            class="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 justify-center sm:justify-start sm:mr-4 mb-10">
            <div v-for="item in lotesFilter" :key="item._id" class="col-span-1 min-w-64 mb-4 relative">
              <LotesCard :item="item" />
            </div>
          </div>

          <div v-if="lotesFilter.length === 0" class="flex justify-center items-center">
            <p class="text-gray-600 font-medium md:text-2xl">No hay lotes disponibles</p>
          </div>
        </div>
      </div>
      <!-- /show card lote -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Lotes } from "~/interfaces/Lotes";

definePageMeta({
  layout: "lote",
});

const { isScreenSmall } = useGlobalComposable();
const useGlobal = useGlobalStore();
const mobileFiltroMenu = ref(false);

const isOpen = ref(false);
const useLotes = useLotesStore();
const lotes: Ref<Lotes[]> = ref(useLotes.lotes)
const lotesFilter = ref<Lotes[]>(JSON.parse(JSON.stringify(lotes.value)));

const botonesFiltro = ref()
const heightbotonesFiltro = ref(0)

onMounted(()=>{
  heightbotonesFiltro.value = botonesFiltro.value.offsetHeight
  console.log(marginBotonesFiltro.value)
})

const sortLotes = (sortType: string) => {
  selected.value = sortType;
  if (sortType === 'disponibilidad') {
    // Maintain filters but reset to original order
    const filteredLotes = lotes.value.filter(lote =>
      lotesFilter.value.some(filteredLote => filteredLote._id === lote._id)
    );
    lotesFilter.value = filteredLotes;
  } else {
    lotesFilter.value.sort((a, b) => {
      switch (sortType) {
        case 'precioMenor':
          return (a.precio || 0) - (b.precio || 0);
        case 'precioMayor':
          return (b.precio || 0) - (a.precio || 0);
        case 'puntuacionMenor':
          return (a.puntaje || 0) - (b.puntaje || 0);
        case 'puntuacionMayor':
          return (b.puntaje || 0) - (a.puntaje || 0);
        default:
          return 0;
      }
    });
  }
};


const marginBotonesFiltro = computed(() => {
  if (isScreenSmall.value) {
    return `max-height: calc(100vh - ${useGlobal.heightNavLote}px); margin-top: ${heightbotonesFiltro.value}px`
  } else {
    return `max-height: calc(100vh - (${useGlobal.heightNavLote}px + ${useGlobal.heightFooterLote}px) )`
  }
});

const containerStyles = computed(() => {
  if (isScreenSmall.value) {
    return `max-height: calc(100vh - ${useGlobal.heightNavLote}px)`
  } else {
    return `max-height: calc(100vh - (${useGlobal.heightNavLote}px + ${useGlobal.heightFooterLote}px) )`
  }
});
const styleMobileContainer = ref('');

watch(isOpen, (newValue) => {
  if (!newValue && isScreenSmall.value) {
    setTimeout(() => {
      styleMobileContainer.value = '-translate-x-full rtl:translate-x-full';
    }, 500);
  } else {
    styleMobileContainer.value = '';

  }
});

onMounted(() => {
  if (isScreenSmall.value) {
    styleMobileContainer.value = '-translate-x-full rtl:translate-x-full';
  }
})


const activeFilters = ref<Partial<Record<keyof Lotes, any>>>({});

const filtrarLotes = <K extends keyof Lotes>(tipo: K, filtro: boolean | string[] | [number, number]) => {
  console.log(tipo)
  if (tipo === 'muestra') {
    if (filtro === true) {
      activeFilters.value[tipo] = filtro;
    } else {
      delete activeFilters.value[tipo];
    }
  } else if (Array.isArray(filtro)) {
    if (filtro.length === 0) {
      delete activeFilters.value[tipo];
    } else if (filtro.length === 2 && typeof filtro[0] === 'number' && typeof filtro[1] === 'number') {
      // Caso especial para rangos (puntaje y precio)
      activeFilters.value[tipo] = filtro;
    } else {
      activeFilters.value[tipo] = filtro;
    }
  } else {
    activeFilters.value[tipo] = filtro;
  }

  lotesFilter.value = lotes.value.filter(lote => {
    return Object.entries(activeFilters.value).every(([key, value]) => {
      const tipoKey = key as keyof Lotes;
      if (tipoKey === 'muestra') {
        return value === true ? lote.muestra?.muestra === true : true;
      }
      if (Array.isArray(value)) {
        if (tipoKey === 'puntaje' || tipoKey === 'precio') {
          // Manejo de rangos para puntaje y precio
          const [min, max] = value as [number, number];
          const loteValue = lote[tipoKey] as number;
          return loteValue >= min && loteValue <= max;
        } else {
          const loteValue = lote[tipoKey];
          return Array.isArray(loteValue)
            ? value.some(v => loteValue.includes(v))
            : value.includes(loteValue as string);
        }
      }
      return true;
    });
  });
  const filtroCopia = [...lotesFilter.value]
  lotesFilter.value = [];
  lotesFilter.value = [...filtroCopia]
  sortLotes(selected.value)
};


const selected = ref("disponibilidad");

/* filtros */

const resetAllFilters = () => {
  activeFilters.value = {};
  lotesFilter.value = JSON.parse(JSON.stringify(lotes.value));
  selected.value = "disponibilidad";
  sortLotes("disponibilidad");
};

/* const resetAll = () => {
  resetAllFilters();
  // Emit an event to reset filters in child components
  $emit('reset-all-filters');
}; */

/* muestra */
const filtrarMuestra = (value: boolean) => {
  filtrarLotes('muestra', value)
};
/* /muestra */

/* pais */
const filtrarPais = (pais: string[]) => {
  filtrarLotes('pais', pais)

};
/* /pais */
/* origen  */
const filtrarOrigen = (origen: string[]) => {
  filtrarLotes('origen', origen)
};
/* /origen  */

/* filtros select */

const filtrarSelect = (tipo: string, value: string[]) => {
  switch (tipo) {
    case "Certificaciones":
    case "certificaciones":
      filtrarLotes('certificaciones', value)

      break;
    case "Perfil":
    case "perfil":
      filtrarLotes('perfil', value)
      break;
    case "Procesos":
    case "procesos":
      filtrarLotes('proceso', value)
      break;
    case "Variedades":
    case "variedades":
      filtrarLotes('variedad', value)
      break;
    case "Productores":
    case "productores":
      filtrarLotes('productores', value)
      break;
    case "clasificacion":
    case "Clasificación de Lotes":
      filtrarLotes('cantidadLote', value)
      break;
    default:
      console.error("Tipo de filtro no reconocido:", tipo);
      return;
  }
}

const filtrarRange = (tipo: string, value: [number, number] | []) => {
  switch (tipo) {
    case 'puntaje':
      filtrarLotes('puntaje', value)
      break;
    case 'precio':
      filtrarLotes('precio', value)
      break;
    default:
      console.error("Tipo de filtro no reconocido:", tipo);
      return;
  }
}
/* filtros range */

/* /filtros */

const closeMenuFiltro = () => {
  mobileFiltroMenu.value = false;
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
