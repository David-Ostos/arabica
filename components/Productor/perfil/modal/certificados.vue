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
                @click="actualizarImagenCertificado(item as Certificados)"
                
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
                @click="useProductor.certificacionesUpdate[index!].year = item;
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
          <UIcon name="i-clarity-remove-line" class="text-rose-500 text-3xl absolute bottom-2 cursor-pointer" dynamic @click="useProductor.certificacionesUpdate?.splice(index,1)" />
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
const certificacionesModal = ref([] as any)

type Certificados = 
""|
"Bird Friendly"|
"C.A.F.E practices"|
"4C"|
"Q Certified"|
"UTZ Certified"|
"FairTrade"|
"B Corp"|
"Organic Bio Suisse"|
"Global G.A.P."|
"IWCA"|
"SCA Member"|
"Organic"|
"US Organic"|
"Organic Demeter"|
"e"


onMounted(()=>{
  certificacionesModal.value = props.certificaciones;
  certificacionesModal.value._id = props.index.toString()
})

const years = computed(() => {
  const year = [];
  for (let año = 2024; año >= 1800; año--) {
    year.push(año.toString());
  }
  return year;
});

const searchQueryCertificacion = ref("");
const searchQueryYear = ref("");
const imagenCertificado:Ref<Certificados> = ref('')
const certificadosImagenes: any = {
  "Bird Friendly": "https://cockpit.arabicagc.com/assets/link/eff84e6e3163324839000121",
  "C.A.F.E practices": "https://cockpit.arabicagc.com/assets/link/eff85482386464ca1200000f",
  "4C": "https://cockpit.arabicagc.com/assets/link/eff86ca5353533bbde000184",
  "Q Certified": "https://cockpit.arabicagc.com/assets/link/eff88c0c3337633e7300024c",
  "UTZ Certified": "https://cockpit.arabicagc.com/assets/link/eff89f903661618dcc000142",
  "FairTrade": "https://cockpit.arabicagc.com/assets/link/eff86c723031375f5300031b",
  "B Corp": "https://cockpit.arabicagc.com/assets/link/eff84b73313932786800000b",
  "Organic Bio Suisse": "https://cockpit.arabicagc.com/assets/link/eff84c576330395e6700007c",
  "Global G.A.P.": "https://cockpit.arabicagc.com/assets/link/eff871b0623438422200026b",
  "IWCA": "https://cockpit.arabicagc.com/assets/link/eff876b735336608c60001c2",
  "SCA Member": "https://cockpit.arabicagc.com/assets/link/eff894e16261364b6f0002a0",
  "Organic": "https://cockpit.arabicagc.com/assets/link/eff87d24623264674800038a",
  "US Organic": "https://cockpit.arabicagc.com/assets/link/eff89a423464354da700032ep",
  "Organic Demeter": "https://cockpit.arabicagc.com/assets/link/eff855156533338db40001b7",
  "Rainforest Alliance": "https://cockpit.arabicagc.com/assets/link/eff88cd06337318c2e000284"
};
const actualizarImagenCertificado = (certificado: Certificados) => {
  if(certificado){
    imagenCertificado.value = certificadosImagenes[certificado];
    useProductor.certificacionesUpdate![props.index].certificacion = certificado;
    useProductor.certificacionesUpdate![props.index].picture = imagenCertificado.value;
    selectActiveCertificado.value = false;
  }
};

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
