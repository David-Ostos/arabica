<template>
  <div>
    <!-- Modal paises -->
    <div>
      <UModal :ui="{ container: 'items-start sm:items-start', width: ' sm:max-w-[800px]' }" v-model="showPaises">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class=" text-base font-semibold leading-6 text-thirdary dark:text-thirdary">
                Seleccione su país
              </h3>
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                @click="showPaises = false" />
            </div>
          </template>

          <div>
            <UButton @click="selectTodosLosPaises" size="xl" :color="paisesActivo ? 'white' : 'primary'" block>
              Todos los paises
            </UButton>

            <div class="mt-4 grid grid-cols-3 md:grid-cols-6 gap-4 ">

              <UButton v-for="pais in filtros[0].value" class="" size="xl" :color="pais.isActive ? 'primary' : 'white'"
                :ui="{
                  base: 'flex justify-center items-center '
                }" @click="paisSeleccionado(pais.pais)">
                <template #leading>
                  <UIcon class="text-xl" :name="pais.icon" dynamic />
                </template>

                <h3 class="">{{ pais.pais }}</h3>
              </UButton>


            </div>

          </div>

        </UCard>
      </UModal>
    </div>
    <!-- /Modal paises -->

    <!-- Modal origenes -->
    <div class="">
      <UModal :ui="{ container: 'items-start sm:items-start', width: ' sm:max-w-[800px]' }" v-model="showOrigins">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class=" text-base font-semibold leading-6 text-thirdary dark:text-thirdary">
                Seleccione su país
              </h3>
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                @click="showOrigins = false" />
            </div>
          </template>

          <div>
            <UButton @click="selectTodosLosOrigenes" size="xl" :color="origenesActivo ? 'white' : 'primary'" block>
              Todos los origenes
            </UButton>

            <div class="mt-4 grid grid-cols-3 md:grid-cols-6 gap-4 ">

              <UButton v-for="origen in filtros[1].value as Origen[]" block class="col-span-1 " size="xl"
                :color="origen.isActive ? 'primary' : 'white'" :ui="{
                  padding: { xl: 'px-8 py-2.5' }
                }" @click="origenSeleccionado(origen.origen)">
                <h3 class="capitalize">{{ origen.origen }}</h3>
              </UButton>
            </div>

          </div>

        </UCard>
      </UModal>
    </div>
    <!-- /Modal origenes -->
  </div>


  <div :style="isScreenSmall ? 'height: calc(100vh - 120px)' : ''"
    :class="[isScreenSmall ? 'scrollbar-hide overflow-auto' : '']">

    <div class=" mx-4 text-thirdary">

      <div class="py-6 border-t" v-if="algunFiltroActivo">
        <div>

          <div v-for="item, key in filtrosActivos">
            <!-- <UButton  @click="console.log(filtrosActivos[key])">{{ key }}</UButton> -->
            <div v-if="item.isActive" class="text-sm border border-primary bg-primary-100 text-primary-600 rounded-full w-fit px-2 py-[2px] capitalize overflow-hidden mb-2 max-w-full flex items-center justify-between gap-2 relative ">
                <UTooltip 
                  :text="Array.isArray(item.value) ? item.value.join(', ') : item.value" 
                  :popper="{ placement: 'bottom-start',strategy : 'fixed', adaptive:true }"                  
                  :ui="{
                    container: 'z-[500]',
                    base: 'whitespace-normal h-full ',
                    width: 'max-w-48'
                  }"
                  >
                  <div class="line-clamp-1">
                    <p>{{ item.name }}: {{ Array.isArray(item.value) ? item.value.join(', ') : item.value }}</p> 
                  </div>
                </UTooltip>
                <div  class="w-4 h-4">
                  <UIcon class="text-base cursor-pointer" name="i-heroicons-x-mark-16-solid" @click=" resetFilter(key)  " />
                </div>
              
            </div>
          </div>

          <UButton class="mt-4" color="white" variant="outline" block @click=" resetAll()" > 
            <UIcon name="i-streamline-interface-delete-bin-1-remove-delete-empty-bin-trash-garbage" dynamic/> 
            Eliminar todos los filtros
          </UButton>

        </div>
      </div>

      <div class=" py-6 border-y">
        <UCheckbox v-model="muestras" name="muestras" label="Muestras disponibles" @click="filtroMuestra" />
      </div>

      <div v-for="item in filtros">
        <div class="py-6 border-b overflow-auto truncate">

          <div class="flex justify-between items-center cursor-pointer" @click="item.isOpen = !item.isOpen">
            <h2 class="z-50 font-medium text-gray-700 text-xs dark:text-gray-200 uppercase">
              {{ item.label }}
            </h2>
            <UIcon :name="item.isOpen ? 'i-hugeicons-remove-01' : 'i-hugeicons-add-01'"
              :class="['transition-all duration-300 text-lg']" dynamic />
          </div>

          <div v-if="item.tipe === 'pais'" class="transition-all duration-300 ease-in-out overflow-hidden"
            :class="item.isOpen ? 'h-full opacity-100' : ' h-0 opacity-0'">

            <UButton color="white" class="mt-4 " block size="xl" @click="showPaises = true">
              <template #leading>
                <UIcon name="i-hugeicons-globe-02" class="text-xl" dynamic />
              </template>

              <h3 class="text-thirdary font-medium">Seleccionar paises</h3>

            </UButton>

          </div>

          <div v-if="item.tipe === 'origenes'" class="transition-all duration-300 ease-in-out overflow-hidden"
            :class="item.isOpen ? 'h-full opacity-100' : ' h-0 opacity-0'">

            <UButton color="white" class="mt-4 " block size="xl" @click="showOrigins = true">
              <template #leading>
                <UIcon name="i-hugeicons-globe-02" class="text-xl" dynamic />
              </template>

              <h3 class="text-thirdary font-medium">Seleccionar orígenes</h3>

            </UButton>

          </div>

          <div v-if="item.tipe === 'select'" class="transition-all duration-300 ease-in-out overflow-hidden"
            :class="item.isOpen ? 'h-full opacity-100' : ' h-0 opacity-0'">

            <div class=" mt-4 mx-4 ">
              <div v-for="select in item.value">
                <UCheckbox @click="selectsSeleccionado(item.label, select.tipo) /* filtrosSelect(item.label, select.tipo, select.isActive) */" v-model="select.isActive"
                  :name="select.tipo" :label="select.tipo" class="capitalize" />
              </div>

            </div>

          </div>

          <div v-if="item.tipe === 'range'" class="transition-all duration-300 ease-in-out overflow-hidden"
            :class="item.isOpen ? 'h-full opacity-100' : ' h-0 opacity-0'">
            <div class="py-4 mx-4">
              <!-- <LotesRange :max="item.max" :min="item.min" :step="item.step" :value="item.value" /> -->
              <LotesRangeSlider :name="item.label" v-model="item.value" :min="item.min!" :max="item.max!"
                :step="item.step!" :formatValue="item.formatValue" @update:modelValue="fitrarRango" />
            </div>
          </div>

        </div>


      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>
interface Props {
  filtroProductores: string[],
  filtroVariedades: string[],
  filtroProcesos: string[],
  filtroPerfil: string[],
  filtroCertificaciones: string[],
}

const emits = defineEmits<{
  (e: "close", value: boolean): void;
  (e: "filtrosSelect", tipo: string, value: string[]): void;
  (e: "filtroMuestra", value: boolean): void;
  (e: "filtroPais", pais: string[]): void;
  (e: "filtroOrigen", origen: string[]): void;
  (e: "filtrosRange", tipo: string, value: [number, number] | []): void;
  (e: "resetAll") :void
  
}>();

const { isScreenSmall } = useGlobalComposable()

interface Filtros {
  label: string,
  value: any | Select[] | Pais[] | Origen[],
  tipe: 'pais' | 'select' | 'range' | 'origenes',
  min?: number,
  max?: number,
  step?: number,
  formatValue?: any,
  isOpen?: boolean,
}
interface Pais {
  pais: string,
  icon: string,
  isActive: boolean
}
interface Origen {
  origen: string,
  isActive: boolean
}
interface Select {
  tipo: string,
  isActive: boolean
}
interface Range{ 
  label: string; 
  min: number; 
  max: number; 
  value: [number, number] | []; 
  tipe: string; 
  formatValue: (valor: number) => string; 
  step: number; 
  isOpen: boolean;
}


const resetAll = () => {
  muestras.value = false;
  paisesActivo.value = false;
  filtroPais.value = [];
  origenesActivo.value = false;
  filtroOrigen.value = [];
  filtros.forEach(filter => {
    if (filter.tipe === 'select') {
      filter.value.forEach((item: Select) => item.isActive = false);
    } else if (filter.tipe === 'range') {
      filter.value = [filter.min!, filter.max!];
    }
  });
  Object.keys(filtrosActivos).forEach(key => {
    filtrosActivos[key as keyof typeof filtrosActivos].isActive = false;
    filtrosActivos[key as keyof typeof filtrosActivos].value = Array.isArray(filtrosActivos[key as keyof typeof filtrosActivos].value) ? [] : '';
  });
  emits('resetAll');
};


/* muestras */
const muestras = ref(false)
watch(muestras, (nuevoValor) => {
  filtrosActivos.muestra.isActive = nuevoValor
  emits("filtroMuestra", nuevoValor)
})
const filtroMuestra = () => {
}
/* /muestras */

/* paises  */
const paisesActivo = ref(false);
const filtroPais = ref<string[]>([])
const showPaises = ref(false)


watch(paisesActivo, (nuevoValor) => {
  filtrosActivos.paises.isActive = nuevoValor
})

const paisSeleccionado = (pais: string) => {
  const index = filtroPais.value.indexOf(pais)
  if (index > -1) {
    // Si el país ya está seleccionado, lo quitamos
    filtroPais.value.splice(index, 1)
    filtros[0].value.find((item: Pais) => item.pais === pais)!.isActive = false
  } else {
    // Si el país no está seleccionado, lo añadimos
    filtroPais.value.push(pais)
    filtros[0].value.find((item: Pais) => item.pais === pais)!.isActive = true
  }
  paisesActivo.value = filtroPais.value.length > 0
  emits("filtroPais", filtroPais.value)
}

const selectTodosLosPaises = () => {
  filtros[0].value.forEach((pais: Pais) => {
    pais.isActive = false
  });
  filtroPais.value = []
  paisesActivo.value = false
  emits("filtroPais", filtroPais.value)

}
/* /paises  */

/* origenes */
const showOrigins = ref(false)
const origenesActivo = ref(false);
const filtroOrigen = ref<string[]>([])

watch(origenesActivo, (nuevoValor) => {
  filtrosActivos.origenes.isActive = nuevoValor
})

const origenSeleccionado = (origen: string) => {
  const index = filtroOrigen.value.indexOf(origen)
  if (index > -1) {
    // Si el origen ya está seleccionado, lo quitamos
    filtroOrigen.value.splice(index, 1)
    filtros[1].value.find((item: Origen) => item.origen === origen)!.isActive = false
  } else {
    // Si el origen no está seleccionado, lo añadimos
    filtroOrigen.value.push(origen)
    filtros[1].value.find((item: Origen) => item.origen === origen)!.isActive = true
  }
  origenesActivo.value = filtroOrigen.value.length > 0
  emits("filtroOrigen", filtroOrigen.value)
}

const selectTodosLosOrigenes = () => {
  filtros[1].value.forEach((origen: Origen) => {
    origen.isActive = false
  });
  filtroOrigen.value = []
  origenesActivo.value = false
  emits("filtroOrigen", filtroOrigen.value)
}
/* /origenes */

/* select */


const selectsSeleccionado = (filterKey: string, value:string) => {
  let filter;
  if(filterKey === 'Clasificación de Lotes'){
    filter = filtrosActivos['clasificacion' as keyof typeof filtrosActivos]
  }else{
    filter = filtrosActivos[filterKey.toLowerCase() as keyof typeof filtrosActivos]
  }
  const filterIndex = filtros.findIndex(f => f.label === filterKey);
  let index;
  if(Array.isArray(filter.value) && filter.value.every(item => typeof item === 'string')){
    index = (filter.value as string[]).indexOf(value)
    let targetArray: string[] = [] as string[];
    
    switch (filterKey) {
        case 'Certificaciones' :
          targetArray = filtrosActivos.certificaciones.value ;
          break;
        case 'Perfil':
        targetArray = filtrosActivos.perfil.value;
        break;
        case 'Procesos':
          targetArray = filtrosActivos.procesos.value;
          break;
        case 'Variedades':
          targetArray = filtrosActivos.variedades.value;
          break;
        case 'Productores':
          targetArray = filtrosActivos.productores.value;
          break;
        case 'Clasificación de Lotes':
          targetArray = filtrosActivos.clasificacion.value;
          break;
        default:
          console.error('Tipo de filtro no reconocido:', value);
          return;
        }
    if (index > -1) {
    // Si el origen ya está seleccionado, lo quitamos
    targetArray.splice(index, 1)
    filtros[filterIndex].value.find((item: Select) => item.tipo === value)!.isActive = false
  } else {
    // Si el origen no está seleccionado, lo añadimos
    targetArray.push(value)
    filtros[filterIndex].value.find((item: Select) => item.tipo === value)!.isActive = true
  }
  filter.isActive = filter.value.length > 0;

  emits("filtrosSelect", filterKey , targetArray )
  
}
}


// const filtrosSelect = (tipo: string, value: string, isActive: boolean) => {
//   emits("filtrosSelect", tipo, value, false)
// }

const filtros: Filtros[] = reactive([
  {label: "Paises",
    value: [
      {
        pais: 'perú',
        icon: 'i-openmoji-flag-peru',
        isActive: false
      }
    ],
    tipe: "pais",
  }, {label: "Orígenes",
    value: [
      {
        origen: "piura",
        isActive: false
      }, {
        origen: "amazonas",
        isActive: false
      }, {
        origen: "cajamarca",
        isActive: false
      }, {
        origen: "san",
        isActive: false
      }, {
        origen: "martin",
        isActive: false
      }, {
        origen: "huanuco",
        isActive: false
      }, {
        origen: "pasco",
        isActive: false
      }, {
        origen: "junin",
        isActive: false
      }, {
        origen: "ayacucho",
        isActive: false
      }, {
        origen: "cusco",
        isActive: false
      }, {
        origen: "puno",
        isActive: false
      },],
    tipe: "origenes",
  }, {label: "Productores",
    value: [
      {
        tipo: "independiente",
        isActive: false
      },
      {
        tipo: "asociacion",
        isActive: false
      },
      {
        tipo: "cooperativa",
        isActive: false
      }
    ],
    tipe: "select",
  }, {label: "Variedades",
    value: [
      {
        tipo: "geisha",
        isActive: false
      },
      {
        tipo: "typica",
        isActive: false
      },
      {
        tipo: "bourbon",
        isActive: false
      },
      {
        tipo: "bourbon mayaguez",
        isActive: false
      },
      {
        tipo: "ls 14",
        isActive: false
      },
      {
        tipo: "ls 28",
        isActive: false
      },
      {
        tipo: "ls34",
        isActive: false
      },
      {
        tipo: "rume sudan",
        isActive: false
      },
      {
        tipo: "maragogipe",
        isActive: false
      },
      {
        tipo: "pacamara",
        isActive: false
      },
      {
        tipo: "caturra",
        isActive: false
      },
      {
        tipo: "catuai",
        isActive: false
      },
      {
        tipo: "tabi",
        isActive: false
      },
      {
        tipo: "mundo novo",
        isActive: false
      },
      {
        tipo: "costa rica 95",
        isActive: false
      },
      {
        tipo: "castilla",
        isActive: false
      },
      {
        tipo: "catimor",
        isActive: false
      },
      {
        tipo: "otros",
        isActive: false
      },
    ],
    tipe: "select",
  }, {label: "Procesos",
    value: [

      { tipo: "lavado", isActive: false },
      { tipo: "lavado anaeróbico", isActive: false },
      { tipo: "lavado oxidación", isActive: false },
      { tipo: "lavado fermentación láctica", isActive: false },
      { tipo: "yellow honey", isActive: false },
      { tipo: "red honey", isActive: false },
      { tipo: "back honey", isActive: false },
      { tipo: "natural", isActive: false },
      { tipo: "natural anaeróbico", isActive: false },
      { tipo: "experimental", isActive: false },
    ],
    tipe: "select",
  }, {label: "Perfil",
    value: [
      { tipo: "floral", isActive: false },
      { tipo: "frutal", isActive: false },
      { tipo: "vegetal", isActive: false },
      { tipo: "cítrico", isActive: false },
      { tipo: "vinoso", isActive: false },
      { tipo: "dulce", isActive: false },
      { tipo: "azucares caramelizados", isActive: false },
      { tipo: "frutos secos", isActive: false },
      { tipo: "chocolate", isActive: false },
      { tipo: "nuez", isActive: false },
      { tipo: "taza limpia", isActive: false },
    ],
    tipe: "select",
  }, {label: "Certificaciones",
    value: [
      { tipo: "organic", isActive: false },
      { tipo: "fair trade", isActive: false },
      { tipo: 'fairtrade organic', isActive: false },
      { tipo: "rain forest", isActive: false },
      { tipo: "imocert", isActive: false },
      { tipo: "jas", isActive: false }
    ],
    tipe: "select",
  },{label: "Clasificación de Lotes",
    value: [
      { tipo: "lote", isActive: false },
      { tipo: "micro lote", isActive: false },
      { tipo: "nano lote", isActive: false },
    ],
    tipe: "select",
  },{label: "puntaje",
    min: 80,
    max: 90,
    value: [80, 90],
    tipe: "range",
    formatValue: (valor: number) => valor.toFixed(2),
    step: 0.25,
    isOpen: false,
  }, {label: "precio",
    min: 0,
    max: 20,
    value: [0, 20],
    tipe: "range",
    formatValue: (valor: number) => `$${valor}`,
    step: 1,
    isOpen: false,
  },
]);

// watch(filtros[8].)

/* /select */

/* rangos */

const precioDefault = ref([] as [number, number] | [])
const puntajeDefault = ref([] as [number, number] | []) 

const fitrarRango = (value: [number, number], valueDefault: [number, number], name: string) => {

  if (JSON.stringify(value) === JSON.stringify(valueDefault)) {
    if(name === 'precio'){
      filtrosActivos.precio.isActive = false
      filtrosActivos.precio.value = []
      precioDefault.value = valueDefault
    }else{
      filtrosActivos.puntaje.isActive = false
      filtrosActivos.puntaje.value = []
      puntajeDefault.value = valueDefault

    } 
  } else {
    if(name === 'precio'){
      filtrosActivos.precio.isActive = true
      filtrosActivos.precio.value = value
      precioDefault.value = valueDefault
    }else{
      filtrosActivos.puntaje.isActive = true
      filtrosActivos.puntaje.value = value
      puntajeDefault.value = valueDefault
    }
  }
  emits('filtrosRange', name, value)
}
/* /rangos */

const filtrosActivos = reactive({
  muestra: { isActive: false, value: 'si' , name: 'muestras disponibles' },
  paises: { isActive: false, value: [] as string[] , name: 'paises' },
  origenes: { isActive: false, value: [] as string[], name: 'origenes' },
  productores: { isActive: false, value: [] as string[], name: 'productores' },
  variedades: { isActive: false, value: [] as string[], name: 'variedades' },
  procesos: { isActive: false, value: [] as string[], name: 'procesos' },
  perfil: { isActive: false, value: [] as string[], name: 'perfil' },
  certificaciones: { isActive: false, value: [] as string[], name: 'certificaciones' },
  clasificacion: { isActive: false, value: [] as string[], name: 'clasificacion' },
  precio: { isActive: false, value: [] as [number, number] | [], name: 'precio' },
  puntaje: { isActive: false, value: [] as [number, number] | [], name: 'puntaje' }
})
watch(filtrosActivos.muestra , (nuevoValor)=>{
  if(!nuevoValor.isActive){
    muestras.value = false
  }
})

watch(filtroPais.value, (nuevoValor)=>{
  filtrosActivos.paises.value = filtroPais.value 
})

watch(filtrosActivos.paises , (nuevoValor)=>{
  if(!nuevoValor.isActive){
    selectTodosLosPaises()
  }
})

watch(filtroOrigen.value, (nuevoValor) =>{
  filtrosActivos.origenes.value = filtroOrigen.value
})


watch(filtrosActivos.origenes , (nuevoValor)=>{
  if(!nuevoValor.isActive){
    selectTodosLosOrigenes()
  }
})

const algunFiltroActivo = computed(() => {
  return Object.values(filtrosActivos).some(value => value.isActive);
});

const resetFilter = (filterKey: string) => {
  const filter = filtrosActivos[filterKey as keyof typeof filtrosActivos];
  filter.isActive = false
  if(filterKey !== 'muestra'){
    filter.value = Array.isArray(filter.value) ? [] : '';
  }

  switch (filterKey) {
      case 'muestra':
        muestras.value = false;
        emits("filtroMuestra", false);
        break;
      case 'paises':
        selectTodosLosPaises();
        break;
      case 'origenes':
        selectTodosLosOrigenes();
        break;
      case 'productores':
      case 'variedades':
      case 'procesos':
      case 'perfil':
      case 'certificaciones':
      case 'clasificacion':
        resetSelectFilter(filterKey);
        break;
      case 'precio':
      case 'puntaje':
        resetRangeFilter(filterKey);
        break;
      case 'all':
        emits("filtroMuestra", false);
        selectTodosLosOrigenes();
        selectTodosLosPaises();
        resetRangeFilter(filterKey);
        resetSelectFilter(filterKey);
        break;
    }

}


const resetSelectFilter = (filterKey: string) => {
  let filterIndex;
  if(filterKey === 'all'){
    emits('filtrosSelect', filterKey, [])
  } else{
    if(filterKey === 'clasificacion'){
      filterIndex = filtros.findIndex(f => f.label === 'Clasificación de Lotes');
    }else{
      filterIndex = filtros.findIndex(f => f.label.toLowerCase() === filterKey);
    }

    if (filterIndex !== -1) {
      filtros[filterIndex].value.forEach((item: Select) => {
        if(item.isActive){
          item.isActive = false;
        }
      });
      emits('filtrosSelect', filterKey, [])
    }
  }
}

const resetRangeFilter = (filterKey: string) =>{
  if(filterKey === 'all'){
    emits('filtrosRange', filterKey, [])
  }else{
    const filterIndex = filtros.findIndex(f => f.label.toLowerCase() === filterKey);
      if (filterIndex !== -1) {
        filtros[filterIndex].value = [filtros[filterIndex].min, filtros[filterIndex].max];
      }
      emits('filtrosRange', filterKey, [])
  }
}
</script>

<style></style>
