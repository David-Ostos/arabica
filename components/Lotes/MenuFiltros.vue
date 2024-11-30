<template>
  <div>
    <USlideover side="left" v-model="items.isOpen" :ui="{ width: 'w-[80%] max-w-[80%]' }">
    <UCard class="flex flex-col flex-1"
      :ui="{ backgound: 'dark:bg-white', body: { base: 'flex-1' }, ring: '', divide: '' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:-text-dar capitalize">
            Filtros
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="closeMenu" />
        </div>
      </template>

      <div>

        <UCheckbox v-model="muestras" name="muestras" label="Muestras disponibles" />

        <div class="my-4 ">
          <div v-for="item in filtros">
            <div v-if="item.tipe === 'range'" class="py-4 border-b">

              <div class="flex justify-between items-center" @click="item.isOpen = !item.isOpen">
                <h2 class="z-50 font-medium text-gray-700 dark:text-gray-200 uppercase "> {{ item.label }}</h2>
                <UIcon :name="item.isOpen ? 'i-hugeicons-remove-01': 'i-hugeicons-add-01'" :class="['transition-all duration-300 text-3xl']" dynamic/>
              </div>

              <div class="transition-all duration-300 ease-in-out " :class="item.isOpen ? 'h-full opacity-100' : 'hidden h-0 opacity-0'">
                <div class="py-4">
                  <LotesRange 
                    :max="item.max"
                    :min="item.min"
                    :step="item.step"
                    :value="item.value"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </UCard>
  </USlideover>
  </div>
</template>

<script lang="ts" setup>
import type { Lotes } from '~/interfaces/Lotes';

const prue = ref(false)
const prue2 = ref(false)

interface Props {
  lotes: Lotes[],
  isOpen: boolean

}

const props = defineProps<{items: Props}>()
const emits = defineEmits<{
  (e: 'close', value: boolean): void
}>()

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  disponibilidad: boolean;
  puntuacion: number;
  cosecha: string; // formato: "YYYY-MM-DD"
}

const closeMenu = () =>{
  emits('close', false)
}

const muestras = ref(false)

const prueba = () =>{
  console.log(muestras.value)
}



// Estado para los rangos
const precioRango = ref<[number, number]>([0, 1000]);
const puntuacionRango = ref<[number, number]>([0, 5]);

// Funciones de formato
const formatPrecio = (valor: number) => `$${valor}`;
const formatPuntuacion = (valor: number) => valor.toFixed(1);
const filtros = reactive([
  {
    label: 'origenes',
    value: ['perú'],
    tipe: 'select'
  },
  {
    label: 'departamentos',
    value: [
    'Piura ','Amazonas', 'Cajamarca', 'San', 'Martin', 
    'Huanuco', 'Pasco', 'Junin', 'Ayacucho', 'Cusco', 'Puno',
    ],
    tipe: 'select'
  },
  {
    label: 'productores',
    value: ['independiente', 'asociacion','cooperativa'],
    tipe: 'select'
  },
  {
    label: 'variedades',
    value: ['Geisha', 'Típica','Bourbon','Maragogipe', 'Pacamara','Caturra','Catuai', 'Tabi','Mundo Novo','Costa rica','Castilla','Catimor','Otros',
    ],
    tipe: 'select'
  },
  {
    label: 'procesos',
    value: ['Sueves Lavado','Lavado anaeróbico','Honey','Fermentación Prolongada','Natural','Natural anaeróbico','Experimental'],
    tipe: 'select'
  },
  {
    label: 'perfil',
    value: ['Floral','Frutal','Vegetal ','Cítrico','dulce','Azucares caramelizados',' Frutos secos','Nuez / Chocolate','Taza limpia '],
    tipe: 'select'
  },
  {
    label: 'certificaciones',
    value: ['Organic','Fair Trade','Rain Forest', 'IMocert','Jas',],
    tipe: 'select'
  },{
    min:0,
    max: 100,
    label: 'puntaje',
    value: [0, 100],
    tipe: 'range',
    formatValue: formatPuntuacion,
    step: 5,
    isOpen: false
  },{
    min:0,
    max: 50,
    label: 'precio',
    value: [0 , 50],
    tipe: 'range',
    step: 5,
    formatValue: formatPrecio,
    isOpen: false
  },
])

// Vigilar cambios en los rangos
watch([precioRango, puntuacionRango], ([nuevoPrecio, nuevaPuntuacion]) => {
  console.log({nuevoPrecio: nuevoPrecio});
  console.log({viejoPrecio: precioRango.value});
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

<style>

</style>