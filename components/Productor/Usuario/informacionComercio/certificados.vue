<template>
  <div v-show="selectActiveCertificado " @click="selectActiveCertificado = false" class="fixed top-0 right-0 w-full h-full "></div>
  <div v-show="selectActiveYear" @click="selectActiveYear = false" class="fixed top-0 right-0 w-full h-full "></div>
  <div class="text-gray-800 py-4 border-b">
    
    <div>
      <div class="grid grid-cols-11 gap-4 relative">

        <div class="col-span-5 relative">
          <h1>Certificación</h1>
          <button
            type="button"
            class="relative z-0 flex justify-between items-center px-4 h-11 w-full border shadow rounded-md"
            :class="selectActiveCertificado ? 'rounded-b-none' : ''"
            @click="selectActiveCertificado = !selectActiveCertificado"
          >
            <span>{{ certificaciones!.certificacion }}</span>
            <UIcon
              name="i-ic-baseline-keyboard-arrow-down"
              class="transition-all duration-300"
              :class="selectActiveCertificado ? 'rotate-180' : ''"
              dynamic
            />
          </button>
          <div
            class="w-full absolute z-10 top-[67px] transition-all duration-500 bg-white overflow-auto rounded-b-md"
            :class="selectActiveCertificado ? 'h-56 border ' : 'h-0 rounded-md border-none'"
          >
            <UInput
              class="px-1 pt-2 border-t "
              size="xl"
              placeholder="Busca tu certificado..."
              @input="filterCertificados()"
              v-model="searchQueryCertificacion"
            />
            <ul class="m-4 text-gray-800">
              <li
                v-for="item in filterCertificados()"
                class="mb-2 p-1 ring-primary hover:ring rounded-md cursor-pointer"
                @click="useProductor.perfilProductor.certificaciones![index!].certificacion = item;
                selectActiveCertificado = false; console.log(useProductor.perfilProductor.certificaciones);"
                
              >
                {{ item }}
              </li>
              <li
                v-show="filterCertificados().length === 0"
                class="mb-2 p-1 rounded-md opacity-0"
                :class="{'opacity-100': filterCertificados().length === 0}"
              >
                No se a encontrado la busqueda...
              </li>
            </ul>
          </div>
        </div>

        <div class="col-span-5 relative">
          <h1>Primer año de certificación</h1>
          <button
            type="button"
            class="relative z-0 flex justify-between items-center px-4 h-11 w-full border shadow rounded-md"
            :class="selectActiveYear ? 'rounded-b-none' : ''"
            @click="selectActiveYear = !selectActiveYear"
          >
            <span>{{ certificaciones!.year }}</span>
            <UIcon
              name="i-ic-baseline-keyboard-arrow-down"
              class="transition-all duration-300"
              :class="selectActiveYear ? 'rotate-180' : ''"
              dynamic
            />
          </button>
          <div
            class="w-full absolute z-10 top-[67px] transition-all duration-500 bg-white overflow-auto rounded-b-md"
            :class="selectActiveYear ? 'h-56 border ' : 'h-0 rounded-md border-none'"
          >
            <UInput
              class="px-1 pt-2 border-t "
              size="xl"
              placeholder="Busca tu certificado..."
              @input="filterYear()"
              v-model="searchQueryYear"
            />
            <ul class="m-4 text-gray-800">
              <li
                v-for="item in filterYear()"
                @click="useProductor.perfilProductor.certificaciones![index!].year = item;
                selectActiveYear = false"
                class="mb-2 p-1 ring-primary hover:ring rounded-md cursor-pointer"
              >
                {{ item }}
              </li>
              <li
                v-show="filterYear().length === 0"
                class="mb-2 p-1 rounded-md opacity-0"
                :class="{'opacity-100': filterYear().length === 0}"
              >
                No se a encontrado la busqueda...
              </li>
            </ul>
          </div>
        </div>

        <div class="col-span-1">
          <UIcon name="i-clarity-remove-line" class="text-rose-500 text-3xl absolute bottom-2 cursor-pointer" dynamic @click="useProductor.perfilProductor.certificaciones?.splice(index,1)" />
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {Certificaciones} from "~/interfaces/PerfilProductor";

const props = defineProps<{
  certificaciones?: Certificaciones,
  index: number
}>();
const useProductor = useProductorStore()
const selectActiveCertificado = ref(false);
const selectActiveYear = ref(false);

useProductor.perfilProductor.certificaciones![props.index]._id = props.index.toString()


const years = computed(() => {
  const year = [];
  for (let año = 2024; año >= 1800; año--) {
    year.push(año.toString());
  }
  return year;
});

const searchQueryCertificacion = ref("");
const searchQueryYear = ref("");

const certificados = [
  "Bird Friendly",
  "C.A.F.E practices",
  "4C",
  "Q Certified",
  "UTZ Certified",
  "FairTrade",
  "B Corp",
  "Organic Bio Suisse",
  "Global G.A.P.",
  "IWCA",
  "SCA Member",
  "Organic",
  "US Organic",
  "Organic Demeter",
  "Rainforest Alliance",
];

const filterYear = () => {
  if (!searchQueryYear.value) return years.value;

  const searchTerm = searchQueryYear.value.toLowerCase();
  return years.value.filter((code: any) => {
    return code.toString().toLowerCase().includes(searchTerm);
  });
};

const filterCertificados = () => {
  if (!searchQueryCertificacion.value) return certificados;
  return certificados.filter((code: any) => {
    return code
      .toLowerCase()
      .includes(searchQueryCertificacion.value.toLowerCase());
  });
};

</script>

<style></style>
