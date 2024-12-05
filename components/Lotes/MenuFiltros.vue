<template>

  <!-- Modal paises -->
  <div>
    <UModal :ui="{ container: 'sm:items-start', width: ' sm:max-w-[800px]' }" v-model="showPaises">
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

          <div class="mt-4 grid grid-cols-6 gap-4 ">

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
  <div>
    <UModal :ui="{ container: 'sm:items-start', width: ' sm:max-w-[800px]' }" v-model="showOrigins">
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

          <div class="mt-4 grid grid-cols-6 gap-4 ">

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


  <div class="">
    <div class="py-6 mx-4 border-y">
      <UCheckbox v-model="muestras" name="muestras" label="Muestras disponibles" @click="filtroMuestra" />
    </div>

    <div class="mb-4 mx-4 text-thirdary">
      <div v-for="item in filtros as Filtros[]">
        <div class="py-6 border-b overflow-auto">

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
                <UCheckbox  @click="filtrosSelect(item.label, select.tipo)" v-model="select.isActive" :name="select.tipo" :label="select.tipo" class="capitalize" />
              </div>
              
            </div>     

          </div>
        
          <div v-if="item.tipe === 'range'" class="transition-all duration-300 ease-in-out overflow-hidden"
            :class="item.isOpen ? 'h-full opacity-100' : ' h-0 opacity-0'">
            <div class="py-4">
              <LotesRange :max="item.max" :min="item.min" :step="item.step" :value="item.value" />
            </div>
          </div>

        </div>


      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Lotes } from "~/interfaces/Lotes";
/* 
interface Props {
  lotes: Lotes[];
  isOpen: boolean;
}

const props = defineProps<{ items: Props }>(); */
const emits = defineEmits<{
  (e: "close", value: boolean): void;
  (e: "filtrosSelect", tipo: string , value: string): void;
  (e: "filtroMuestra", value: boolean): void;
  (e: "filtroPais", pais: string[]): void;
  (e: "filtroOrigen", origen: string[]): void;
}>();

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

/* muestras */
const muestras = ref(false)
const filtroMuestra = () =>{
emits("filtroMuestra", muestras.value)
}
/* /muestras */

const paisesActivo = ref(false);
const origenesActivo = ref(false);

const filtroPais = ref<string[]>([])
const filtroOrigen = ref<string[]>([])

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

const closeMenu = () => {
  emits("close", false);
};


const showPaises = ref(false)
const showOrigins = ref(false)

const productores = ref([])
const variedades = ref([])
const procesos = ref([])
const perfil = ref([])
const certificaciones = ref([])

const filtrosSelect = (tipo: string, value: string) => {
emits("filtrosSelect", tipo, value)
}

  const prueba = () => { };

  // Estado para los rangos
  const precioRango = ref<[number, number]>([0, 1000]);
  const puntuacionRango = ref<[number, number]>([0, 5]);

  // Funciones de formato
  const formatPrecio = (valor: number) => `$${valor}`;
  const formatPuntuacion = (valor: number) => valor.toFixed(1);

  const filtros: Filtros[] = reactive([
    {
      label: "Paises",
      value: [
        {
          pais: 'perú',
          icon: 'i-openmoji-flag-peru',
          isActive: false
        }
      ],
      tipe: "pais",
    },
    {
      label: "Orígenes",
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
    },
    {
      label: "Productores",
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
    },
    {
      label: "Variedades",
      value: [
        {
          tipo: "geisha",
          isActive: false
        },
        {
          tipo: "típica",
          isActive: false
        },
        {
          tipo: "bourbon",
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
          tipo: "costa rica",
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
    },
    {
      label: "Procesos",
      value: [
        { tipo: "sueves lavado", isActive: false },
        { tipo: "lavado anaeróbico", isActive: false },
        { tipo: "honey", isActive: false },
        { tipo: "fermentación prolongada", isActive: false },
        { tipo: "natural", isActive: false },
        { tipo: "natural anaeróbico", isActive: false },
        { tipo: "experimental", isActive: false },
      ],
      tipe: "select",
    },
    {
      label: "Perfil",
      value: [
        { tipo: "floral", isActive: false },
        { tipo: "frutal", isActive: false },
        { tipo: "vegetal", isActive: false },
        { tipo: "cítrico", isActive: false },
        { tipo: "dulce", isActive: false },
        { tipo: "azucares caramelizados", isActive: false },
        { tipo: "frutos secos", isActive: false },
        { tipo: "nuez / chocolate", isActive: false },
        { tipo: "taza limpia", isActive: false },
      ],
      tipe: "select",
    },
    {
      label: "Certificaciones",
      value: [
        { tipo: "organic", isActive: false },
        { tipo: "fair trade", isActive: false },
        { tipo: "rain forest", isActive: false },
        { tipo: "imocert", isActive: false },
        { tipo: "jas", isActive: false }
      ],
      tipe: "select",
    },
    {
      min: 0,
      max: 100,
      label: "puntaje",
      value: [0, 100],
      tipe: "range",
      formatValue: formatPuntuacion,
      step: 5,
      isOpen: false,
    },
    {
      min: 0,
      max: 50,
      label: "precio",
      value: [0, 50],
      tipe: "range",
      step: 5,
      formatValue: formatPrecio,
      isOpen: false,
    },
  ]);

  // Vigilar cambios en los rangos
  watch([precioRango, puntuacionRango], ([nuevoPrecio, nuevaPuntuacion]) => {
    /*   if(nuevoPrecio !== precioRango.value){
      console.log('nuevo precio');
      console.log('Rango de precio:', nuevoPrecio);
    }
    if(nuevaPuntuacion){
      console.log('nueva puntuación');
      console.log('Rango de puntuación:', nuevaPuntuacion);
    } */
    // Aquí puedes implementar tu lógica de filtrado
  });
</script>

<style></style>
