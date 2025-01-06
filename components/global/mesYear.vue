<template>
    <div>
      <div class=" relative">

        <div class="relative">
          <button
            ref="buttonMes"
            type="button"
            class="relative text-sm truncate w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 inline-flex items-center justify-between text-left rounded-md gap-x-1.5 px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400  cursor-pointer"
            :class="selectActiveMes ? 'rounded-t-none' : ''"
            @click="selectActiveMes = !selectActiveMes"
          >
            <span v-if="selectMeses">{{ selectMeses }}</span>
            <span v-else>{{ title }}</span>
            <UIcon
              name="i-ic-baseline-keyboard-arrow-down"
              class="transition-all duration-300"
              :class="selectActiveMes ? 'rotate-180' : ''"
              dynamic
            />
          </button>
          <div
            class="w-full absolute z-10 bottom-full transition-all duration-500 bg-white overflow-auto rounded-b-md"
            :class="selectActiveMes ? 'h-56 border ' : 'h-0 rounded-md border-none'"
          >
            <UInput
              class="px-1 pt-2 border-t "
              size="sm"
              placeholder="Busca tu certificado..."
              @input="filterMeses()"
              v-model="searchQueryMeses"
            />
            <ul class="m-4 text-gray-800">
              <li
                v-for="item in filterMeses()"
                class="mb-2 p-1 ring-primary hover:ring rounded-md cursor-pointer text-sm"
                @click="mesSeleccionado(item) "            
              >
                {{ item }}
              </li>
              <li
                v-show="filterMeses().length === 0"
                class="mb-2 p-1 rounded-md opacity-0"
                :class="{'opacity-100': filterMeses().length === 0}"
              >
                No se a encontrado la busqueda...
              </li>
            </ul>
          </div>
        </div>

      </div> 

  </div>
</template>

<script lang="ts" setup>

interface Props{
  title: string,
}

const buttonMes = ref()
const heightMes = ref(0)
onMounted(()=>{
  if(buttonMes.value){
    heightMes.value = buttonMes.value?.offsetHeight
    console.log(heightMes.value)
  }
})

const props = defineProps<Props>()
const emist = defineEmits<{
  (e: "selectMeses", value: string): void
  (e: "selectYears", value: string): void
}>()

const useGlobal = useGlobalStore()

const meses = [
  'Enero', 
  'Febrero', 
  'Marzo', 
  'Abril', 
  'Mayo', 
  'Junio', 
  'Julio', 
  'Agosto', 
  'Septiembre', 
  'Octubre', 
  'Noviembre', 
  'Diciembre'
]


const selectMeses = ref('')
const searchQueryMeses = ref('')
const selectActiveMes = ref(false)

const filterMeses = () => {
  if (!searchQueryMeses.value) return meses;
  return meses.filter((code: any) => {
    return code
      .toLowerCase()
      .includes(searchQueryMeses.value.toLowerCase());
  });
};


const mesSeleccionado = (item: string) =>{
  selectMeses.value = item; 
  selectActiveMes.value = false
  emist('selectMeses', item)
}




</script>

<style>

</style>