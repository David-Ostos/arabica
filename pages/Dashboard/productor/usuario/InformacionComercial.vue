<template>
  <div
    class="h-full lg:w-[930px] mx-auto md:my-14"
  >
    <div
      class="rounded-xl shadow w-full h-fit mx-auto bg-white overflow-auto font-raleway"
    >
      <h1 class="px-8 pt-4 uppercase pb-4 border-b text-gray-500 text-xs font-bold">
        información comercial
      </h1>
      <UForm
        :schema="schema"
        :state="state"
        :validate="validate"
        @submit="onSubmit"
        class="flex flex-col p-4 md:p-8 w-full md:mt-4"
      >
        <div class=" gap-8 sm:grid grid-cols-5  flex flex-col-reverse justify-center w-full border-b pb-4">

          <div class="grid grid-cols-8 col-span-3 w-full gap-8 h-fit capitalize"
          >
            <UFormGroup
              required
              class="col-span-8 h-fit"
              label="Nombre del negocio"
              name="nombre"
            >
              <UInput
                placeholder="Nombre del negocio"
                size="xl"
                icon=""
                class="capitalize"
                :ui="{}"
                v-model="state.nombre"
              />
            </UFormGroup>

            <UFormGroup
              required
              label="Numero de teléfono"
              name="numeroTelefonico"
              class="col-span-8"
            >
              <div
                class="grid grid-cols-12 w-full focus-visible:ring-2 ring-primary group rounded-md"
              >
                <div class="col-span-4 md:col-span-2 cursor-pointer relative">
                  <div
                    @click="selectActive = !selectActive"
                    class="grid grid-cols-3 gap-1 justify-center items-center w-full h-full border rounded-md border-[#d1d5db] shadow cursor-pointer"
                  >
                    <span class="col-span-1 ml-1">{{
                      state.numeroTelefonico!.bandera
                    }}</span>
                    <span class="col-span-1">{{
                      state.numeroTelefonico!.code
                    }}</span>
                    <UIcon
                      :class="selectActive ? 'rotate-180' : ''"
                      class="col-span-1text-lg h-fit w-fit justify-self-center"
                      name="ic:baseline-keyboard-arrow-down"
                      dynamic
                    />
                  </div>
                  <div
                    v-show="selectActive"
                    class="absolute top-10 bg-white z-50 border rounded-b-md"
                  >
                    <UInput
                      autocomplete="nope"
                      @input="filterCodeTelefono()"
                      v-model="searchQuery"
                      placeholder="Buscar..."
                      :ui="{
                        rounded: 'rounded-b-md rounded-none',
                      }"
                      class="mb-2"
                    />
                    <ul class="bg-white h-fit max-h-56 w-fit overflow-auto">
                      <li
                        v-for="item in filterCodeTelefono()"
                        class="bg-white mb-2 mx-1"
                        @click="
                          state.numeroTelefonico!.bandera = item.bandera;
                          state.numeroTelefonico!.code = item.code;
                          selectActive = !selectActive;
                        "
                      >
                        <span>{{ item.bandera }}</span>
                        <span>{{ item.code }}</span>
                      </li>
                      <li
                        v-show="filterCodeTelefono().length === 0"
                        class="mx-2"
                      >
                        <span class="text-sm text-gray-400"
                          >No se encuentra...</span
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <UInput
                  class="col-span-8 md:col-span-10"
                  placeholder="1234567..."
                  icon=""
                  v-model="state.numeroTelefonico!.numero"
                  size="xl"
                />
              </div>
            </UFormGroup>

            <UFormGroup
              required
              class="col-span-8"
              label="Correo"
              name="correo"
            >
              <UInput
                placeholder="ejemplo@gmai.com"
                icon="i-heroicons-envelope"
                v-model="state.correo"
                size="xl"
              />
            </UFormGroup>

          </div>

          <!-- logo  -->
          <div class=" col-span-2 pt-0 pb-4 ">
            <span class="text-gray-500 font-semibold ">Logo del Comercio</span>

            <div
              class="relative mt-4 flex flex-col justify-center items-center border rounded-xl h-64 w-full shadow-inner bg-gray-100"
            >
              <button type="button" v-if="(state.logo || imgLogo) "
                @click="clickInputFile"
                class="absolute top-4 right-4 p-2 rounded-full flex justify-center items-center border bg-white shadow hover:brightness-95 cursor-pointer"
              >
                <UIcon
                  name="i-heroicons-camera"
                  class="text-primary-600 h-9 w-9"
                  
                />
              </button>
              <div class="w-full flex justify-center items-center">
                <USkeleton
                  class="h-48 w-48 bg-dark"
                  :ui="{rounded: 'rounded-full'}"
                  v-show="!loadingImg"
                />
                <div v-show="loadingImg">
                  <div
                    v-show="!state.logo && !imgLogo"
                    class="py-8 rounded-xl w-full flex flex-col justify-center items-center text-gray-700 px-12"
                  >
                    <UIcon name="i-heroicons-photo" class="text-8xl" dynamic />
                    <UButton type="button" @click="clickInputFile" class="font-semibold"
                      >Subir una nueva imagen</UButton>
                    <input ref="inputImgLogo" type="file" @change="handleFileUpload" class="hidden" />
                  </div>
                  <img v-show="imgLogo" :src="imgLogo" class="rounded-full h-48 w-48 shadow" />
                  <img
                    v-show="state.logo"
                    onload="loadingImg = false"
                    :src="state.logo"
                    class="rounded-full h-48 w-48 shadow"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <span
              class="text-xs text-gray-500 font-semibold mx-auto w-[max-content] flex"
              >Al menos 200 por 200 píxeles. Tamaño máximo 6MB.</span
            >
          </div>
          <!-- /logo  -->

        </div>

        <div class="gap-8 flex flex-col md:grid grid-cols-5 mt-12">
                      
          <UFormGroup
              required
              class="col-span-8"
              label="Dirección de Negocio"
              name="direccion.direccion1"
            >
              <UInput
                placeholder="Ingrese su ubicación"
                icon="i-heroicons-envelope"
                v-model="state.direccion!.direccion1"
                size="xl"
              />
            </UFormGroup>

            <UFormGroup
              required
              class="col-span-4"
              label="Linea 2 de dirección"
              name="direccion.direccion2"
            >
              <UInput
                placeholder="Ingrese su ubicación"
                icon="i-heroicons-envelope"
                v-model="state.direccion!.direccion2"
                size="xl"
              />
            </UFormGroup>

            <UFormGroup
              required
              class="col-span-2"
              label="Codigo Postal"
              name="direccion.codigoPostal"
            >
              <UInput
                placeholder="Ingrese su ubicación"
                icon="i-heroicons-envelope"
                v-model="state.direccion!.codigoPostal"
                size="xl"
              />
            </UFormGroup>

            <UFormGroup
              required
              class="col-span-2"
              label="Ciudad"
              name="direccion.ciudad"
            >
              <UInput
                placeholder="Ingrese su ubicación"
                icon="i-heroicons-envelope"
                v-model="state.direccion!.ciudad"
                size="xl"
              />
            </UFormGroup>
        </div>

        
        <div class="mt-6">
          <div class="flex justify-between items-center border-t py-8">
            <h1 class="text-gray-700 text-sm font-medium ">
              {{ state.certificaciones!.length }} Certificaciones
            </h1>
            <UButton type="button" class="w-fit self-end px-3 h-10 font-bold"
              @click="state.certificaciones!.push({
                certificacion: '',
                picture: '',
                year: '',
              })" >
              <UIcon
                name="i-ic-baseline-add-circle-outline"
                class="text-white text-2xl font-bold"
                dynamic
              />
              Agregr certificado
            </UButton>
          </div>
          <ProductorUsuarioInformacionComercioCertificados
            v-for="item, index in state.certificaciones"
            :certificaciones="item" :index="index"
          />
        </div>



        <div>
          <UFormGroup label="Redes Sociales" class="border-t py-8">
            <ProductorUsuarioInformacionComercioRedesSociales/>
          </UFormGroup>
        </div>

        <div class="flex flex-col " >
          <UButton
            class="w-fit self-end px-3 py-[10px] font-bold"
            :ui="{
              variant: {
                solid: 'bg-{color}-600',
              },
            }"
            type="submit"
            :loading="loading"
          >
            Guardar cambios
          </UButton>
          <UProgress :value="porcentaje" :color="color" class="col-span-4">
              <template #indicator="{percent}">
                <div
                  class="text-right"
                  :style="{width: `${percent < 10 && faseUpload !== 'none' ? percent + 15: percent}%`}"
                >
                  <span v-if="faseUpload === 'none'" class="text-gray-500 w-fit"
                    >Esperando...</span
                  >
                  <span
                    v-else-if="faseUpload === 'Subiendo Imagenes...'"
                    class="text-blue-500 w-fit"
                    >{{ faseUpload }}</span
                  >
                  <span
                    v-else-if="faseUpload === 'Subiendo Lote...'"
                    class="text-amber-500 w-fit"
                    >{{ faseUpload }}</span
                  >
                  <span
                    v-else-if="faseUpload === 'Actualizando datos del productor...'"
                    class="text-orange-500"
                    >{{ faseUpload }}</span
                  >
                  <span
                    v-else-if="faseUpload === 'Subida Completada'"
                    class="text-primary-500 "
                    >✔ Subida completada.</span
                  >
                  <span
                    v-else-if="faseUpload === 'error'"
                    class="text-red-500 font-bold min-w-14"
                    >X Hubo un error.</span
                  >
                </div>
              </template>
          </UProgress>
        </div>

      </UForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "productor",
  middleware: "productor",
});
import {object, string, type InferType} from "yup";
import type {FormError, FormSubmitEvent} from "#ui/types";
import type {PerfilProductor} from "~/interfaces/PerfilProductor";
import { toast } from "vue3-toastify";
import axios from "axios";


const useProductor = useProductorStore();
const useGlobal = useGlobalStore();
const loading = ref(false);
const loadingImg = ref(true);
const selectActive = ref(false);
const fileInput = ref(null);
const selectedFiles = ref([]);
const inputImgLogo = ref()

const schema = object({
  nombre: string().required("Este campo es requerido"),
  numeroTelefonico: object({
    code: string().required(),
    bandera: string(),
    numero: string().required("Requerido"),
  }).required("Este campo es requerido"),
  correo: string().email().required("Este campo es requerido"),
  direccion: object({
    ciudad: string().required("Requerido"),
    codigoPostal: string().required("Requerido"),
    direccion1: string()
      .min(10, "Debe tener minimo 10 caracteres")
      .required("Requerido"),
    direccion2: string()
      .min(4, "Debe tener minimo 4 caracteres")
      .required("Requerido"),
  }).required("Requerido"),
});

type Schema = InferType<typeof schema>;

const state: PerfilProductor = reactive({
  _id: useProductor.perfilProductor._id,
  nombre: useProductor.perfilProductor.nombre,
  numeroTelefonico: useProductor.perfilProductor.numeroTelefonico,
  correo: useProductor.perfilProductor.correo,
  direccion: useProductor.perfilProductor.direccion,
  logo: useProductor.perfilProductor.logo,
  certificaciones: useProductor.perfilProductor.certificaciones,
  redes: useProductor.perfilProductor.redes
});

const validate = (state: any): FormError[] => {
  const errors = [] as any;

  return errors;
};


const filesSave = ref() , imgLogo = ref() ;
const faseUpload = ref(
  "none" as
    | "none"
    | "Subiendo Imagenes..."
    | "Subiendo Lote..."
    | "Actualizando datos del productor..."
    | "Subida Completada"
    | "error"
);
const color = computed(() => {
  switch (true) {
    case faseUpload.value === "none":
      return "gray";
    case faseUpload.value === "Subiendo Imagenes...":
      return "blue";
    case faseUpload.value === "Subiendo Lote...":
      return "amber";
    case faseUpload.value === "Actualizando datos del productor...":
      return "orange";
    case faseUpload.value === "error":
      return "red";
    default:
      return "primary";
  }
});

const porcentaje = ref(0);


const clickInputFile = (event:any)=>{
  inputImgLogo.value.click();
}

async function handleFileUpload(event: any) {

  filesSave.value = event.target.files;

  const files = [...event.target.files];

  imgLogo.value = [];

  // Array para almacenar las promesas de lectura de archivos
  const imagePromises = [];
  const verificar = [...files];
  const archivosPermitidos = [
    "image/gif",
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/webp",
    "image/*",
  ];

  const cumpleConTipos = verificar.every((file: any) => {
    return archivosPermitidos.includes(file.type);
  });

  if (cumpleConTipos) {
    if (files.length > 0 && files.length <= 4) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        // Crea una promesa para cada lectura de archivo
        const imagePromise = new Promise((resolve, reject) => {
          reader.onload = () => {
            const dataURL = reader.result;
            resolve(dataURL);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        imagePromises.push(imagePromise);
      }

      // Espera a que todas las promesas se resuelvan (imágenes cargadas)
      const imagesData = await Promise.all(imagePromises);
      imgLogo.value = imagesData;
    } else {
      toast.error(
        "Solo se aceptan archivos de formato .gif, .png, .jpg, .jpeg, webp"
      );
    }
  } else {
    toast.error(
      "Solo se aceptan archivos de formato .gif, .png, .jpg, .jpeg, webp"
    );
  }
}

async function UploadFiles(files: any) {
  let status;
  if (files) {
    const formData = new FormData();
    formData.append("files[]", files[0]);
    

    try {
      // await axios.post(`${import.meta.env.VITE_URL_API}/api/assets/upload`);

      // @ts-ignore
      await axios(
        // @ts-ignore
        {
          url: `${import.meta.env.VITE_URL_API}/api/assets/upload`,
          method: "POST",
          mode: "cors",
          headers: {
            "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
          },
          data: formData,
          onUploadProgress: (progressEvent) => {
            faseUpload.value = "Subiendo Imagenes...";
            const progressPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            porcentaje.value = progressPercent;
            // Actualiza tu interfaz con el porcentaje de progreso
          },
        }
      )
        .then((res) => {
          state.logo = `https://cockpit.arabicagc.com/storage/uploads${res.data.assets[0].path}`
          return (status = {status: true, tipo: "success"});
        })
        .catch((e) => {
          console.log(e);
          faseUpload.value = "error";
          if (e.code === "ERR_NETWORK") {
            toast.info("Problemas en la conexion intente mas tarde.");
            return (status = {status: false, tipo: "otros"});
          } else {
            return (status = {status: false, tipo: "error"});
          }
        });
    } catch (e) {
      console.log(e);
      faseUpload.value = "error";

      return (status = {status: false, tipo: "error"});
    }
  } else {
    toast.error("No hay imagenes para subir.");
    return (status = {status: false, tipo: "otros"});
  }
  return status;
}



const codeCountry = [
  {
    code: "+93",
    bandera: "🇦🇫",
    name: "afghanistan",
  },
  {
    code: "+358",
    bandera: "🇫🇮",
    name: "finland",
  },
  {
    code: "+355",
    bandera: "🇦🇱",
    name: "albania",
  },
  {
    code: "+213",
    bandera: "🇩🇿",
    name: "algeria",
  },
  {
    code: "+1684",
    bandera: "🇦🇸",
    name: "american samoa",
  },
  {
    code: "+244",
    bandera: "🇦🇴",
    name: "angola",
  },
  {
    code: "+376",
    bandera: "🇦🇩",
    name: "andorra",
  },
  {
    code: "+1264",
    bandera: "🇦🇮",
    name: "anguilla",
  },
  {
    code: "+672",
    bandera: "🇳🇫",
    name: "norfolk island",
  },
  {
    code: "+54",
    bandera: "🇦🇷",
    name: "argentina",
  },
  {
    code: "+1268",
    bandera: "🇦🇬",
    name: "antigua and barbuda",
  },
  {
    code: "+374",
    bandera: "🇦🇲",
    name: "armenia",
  },
  {
    code: "+297",
    bandera: "🇦🇼",
    name: "aruba",
  },
  {
    code: "+61",
    bandera: "🇨🇨",
    name: "cocos (keeling) islands",
  },
  {
    code: "+43",
    bandera: "🇦🇹",
    name: "austria",
  },
  {
    code: "+994",
    bandera: "🇦🇿",
    name: "azerbaijan",
  },
  {
    code: "+1242",
    bandera: "🇧🇸",
    name: "bahamas",
  },
  {
    code: "+973",
    bandera: "🇧🇭",
    name: "bahrain",
  },
  {
    code: "+880",
    bandera: "🇧🇩",
    name: "bangladesh",
  },
  {
    code: "+1246",
    bandera: "🇧🇧",
    name: "barbados",
  },
  {
    code: "+375",
    bandera: "🇧🇾",
    name: "belarus",
  },
  {
    code: "+32",
    bandera: "🇧🇪",
    name: "belgium",
  },
  {
    code: "+501",
    bandera: "🇧🇿",
    name: "belize",
  },
  {
    code: "+229",
    bandera: "🇧🇯",
    name: "benin",
  },
  {
    code: "+1441",
    bandera: "🇧🇲",
    name: "bermuda",
  },
  {
    code: "+975",
    bandera: "🇧🇹",
    name: "bhutan",
  },
  {
    code: "+591",
    bandera: "🇧🇴",
    name: "bolivia, plurinational state of",
  },
  {
    code: "+387",
    bandera: "🇧🇦",
    name: "bosnia and herzegovina",
  },
  {
    code: "+267",
    bandera: "🇧🇼",
    name: "botswana",
  },
  {
    code: "+55",
    bandera: "🇧🇷",
    name: "brazil",
  },
  {
    code: "+246",
    bandera: "🇮🇴",
    name: "british indian ocean territory",
  },
  {
    code: "+673",
    bandera: "🇧🇳",
    name: "brunei darussalam",
  },
  {
    code: "+359",
    bandera: "🇧🇬",
    name: "bulgaria",
  },
  {
    code: "+226",
    bandera: "🇧🇫",
    name: "burkina faso",
  },
  {
    code: "+257",
    bandera: "🇧🇮",
    name: "burundi",
  },
  {
    code: "+855",
    bandera: "🇰🇭",
    name: "cambodia",
  },
  {
    code: "+237",
    bandera: "🇨🇲",
    name: "cameroon",
  },
  {
    code: "+1",
    bandera: "🇺🇸",
    name: "united states",
  },
  {
    code: "+238",
    bandera: "🇨🇻",
    name: "cape verde",
  },
  {
    code: "+ 345",
    bandera: "🇰🇾",
    name: "cayman islands",
  },
  {
    code: "+236",
    bandera: "🇨🇫",
    name: "central african republic",
  },
  {
    code: "+235",
    bandera: "🇹🇩",
    name: "chad",
  },
  {
    code: "+56",
    bandera: "🇨🇱",
    name: "chile",
  },
  {
    code: "+86",
    bandera: "🇨🇳",
    name: "china",
  },
  {
    code: "+57",
    bandera: "🇨🇴",
    name: "colombia",
  },
  {
    code: "+269",
    bandera: "🇰🇲",
    name: "comoros",
  },
  {
    code: "+242",
    bandera: "🇨🇬",
    name: "congo",
  },
  {
    code: "+243",
    bandera: "🇨🇩",
    name: "congo, the democratic republic of the congo",
  },
  {
    code: "+682",
    bandera: "🇨🇰",
    name: "cook islands",
  },
  {
    code: "+506",
    bandera: "🇨🇷",
    name: "costa rica",
  },
  {
    code: "+225",
    bandera: "🇨🇮",
    name: "cote d'ivoire",
  },
  {
    code: "+385",
    bandera: "🇭🇷",
    name: "croatia",
  },
  {
    code: "+53",
    bandera: "🇨🇺",
    name: "cuba",
  },
  {
    code: "+357",
    bandera: "🇨🇾",
    name: "cyprus",
  },
  {
    code: "+420",
    bandera: "🇨🇿",
    name: "czech republic",
  },
  {
    code: "+45",
    bandera: "🇩🇰",
    name: "denmark",
  },
  {
    code: "+253",
    bandera: "🇩🇯",
    name: "djibouti",
  },
  {
    code: "+1767",
    bandera: "🇩🇲",
    name: "dominica",
  },
  {
    code: "+1849",
    bandera: "🇩🇴",
    name: "dominican republic",
  },
  {
    code: "+593",
    bandera: "🇪🇨",
    name: "ecuador",
  },
  {
    code: "+20",
    bandera: "🇪🇬",
    name: "egypt",
  },
  {
    code: "+503",
    bandera: "🇸🇻",
    name: "el salvador",
  },
  {
    code: "+240",
    bandera: "🇬🇶",
    name: "equatorial guinea",
  },
  {
    code: "+291",
    bandera: "🇪🇷",
    name: "eritrea",
  },
  {
    code: "+372",
    bandera: "🇪🇪",
    name: "estonia",
  },
  {
    code: "+251",
    bandera: "🇪🇹",
    name: "ethiopia",
  },
  {
    code: "+500",
    bandera: "🇬🇸",
    name: "south georgia and the south sandwich islands",
  },
  {
    code: "+298",
    bandera: "🇫🇴",
    name: "faroe islands",
  },
  {
    code: "+679",
    bandera: "🇫🇯",
    name: "fiji",
  },
  {
    code: "+33",
    bandera: "🇫🇷",
    name: "france",
  },
  {
    code: "+594",
    bandera: "🇬🇫",
    name: "french guiana",
  },
  {
    code: "+689",
    bandera: "🇵🇫",
    name: "french polynesia",
  },
  {
    code: "+241",
    bandera: "🇬🇦",
    name: "gabon",
  },
  {
    code: "+220",
    bandera: "🇬🇲",
    name: "gambia",
  },
  {
    code: "+995",
    bandera: "🇬🇪",
    name: "georgia",
  },
  {
    code: "+49",
    bandera: "🇩🇪",
    name: "germany",
  },
  {
    code: "+233",
    bandera: "🇬🇭",
    name: "ghana",
  },
  {
    code: "+350",
    bandera: "🇬🇮",
    name: "gibraltar",
  },
  {
    code: "+30",
    bandera: "🇬🇷",
    name: "greece",
  },
  {
    code: "+299",
    bandera: "🇬🇱",
    name: "greenland",
  },
  {
    code: "+1473",
    bandera: "🇬🇩",
    name: "grenada",
  },
  {
    code: "+590",
    bandera: "🇫🇷",
    name: "saint martin",
  },
  {
    code: "+1671",
    bandera: "🇬🇺",
    name: "guam",
  },
  {
    code: "+502",
    bandera: "🇬🇹",
    name: "guatemala",
  },
  {
    code: "+44",
    bandera: "🇬🇧",
    name: "united kingdom",
  },
  {
    code: "+224",
    bandera: "🇬🇳",
    name: "guinea",
  },
  {
    code: "+245",
    bandera: "🇬🇼",
    name: "guinea-bissau",
  },
  {
    code: "+595",
    bandera: "🇵🇾",
    name: "paraguay",
  },
  {
    code: "+509",
    bandera: "🇭🇹",
    name: "haiti",
  },
  {
    code: "+379",
    bandera: "🇻🇦",
    name: "holy see (vatican city state)",
  },
  {
    code: "+504",
    bandera: "🇭🇳",
    name: "honduras",
  },
  {
    code: "+852",
    bandera: "🇭🇰",
    name: "hong kong",
  },
  {
    code: "+36",
    bandera: "🇭🇺",
    name: "hungary",
  },
  {
    code: "+354",
    bandera: "🇮🇸",
    name: "iceland",
  },
  {
    code: "+91",
    bandera: "🇮🇳",
    name: "india",
  },
  {
    code: "+62",
    bandera: "🇮🇩",
    name: "indonesia",
  },
  {
    code: "+98",
    bandera: "🇮🇷",
    name: "iran, islamic republic of persian gulf",
  },
  {
    code: "+964",
    bandera: "🇮🇶",
    name: "iraq",
  },
  {
    code: "+353",
    bandera: "🇮🇪",
    name: "ireland",
  },
  {
    code: "+972",
    bandera: "🇮🇱",
    name: "israel",
  },
  {
    code: "+39",
    bandera: "🇮🇹",
    name: "italy",
  },
  {
    code: "+1876",
    bandera: "🇯🇲",
    name: "jamaica",
  },
  {
    code: "+81",
    bandera: "🗾",
    name: "japan",
  },
  {
    code: "+962",
    bandera: "🇯🇴",
    name: "jordan",
  },
  {
    code: "+77",
    bandera: "🇰🇿",
    name: "kazakhstan",
  },
  {
    code: "+254",
    bandera: "🇰🇪",
    name: "kenya",
  },
  {
    code: "+686",
    bandera: "🇰🇮",
    name: "kiribati",
  },
  {
    code: "+850",
    bandera: "🇰🇵",
    name: "korea, democratic people's republic of korea",
  },
  {
    code: "+82",
    bandera: "🇰🇷",
    name: "korea, republic of south korea",
  },
  {
    code: "+965",
    bandera: "🇰🇼",
    name: "kuwait",
  },
  {
    code: "+996",
    bandera: "🇰🇬",
    name: "kyrgyzstan",
  },
  {
    code: "+856",
    bandera: "🇱🇦",
    name: "laos",
  },
  {
    code: "+371",
    bandera: "🇱🇻",
    name: "latvia",
  },
  {
    code: "+961",
    bandera: "🇱🇧",
    name: "lebanon",
  },
  {
    code: "+266",
    bandera: "🇱🇸",
    name: "lesotho",
  },
  {
    code: "+231",
    bandera: "🇱🇷",
    name: "liberia",
  },
  {
    code: "+218",
    bandera: "🇱🇾",
    name: "libyan arab jamahiriya",
  },
  {
    code: "+423",
    bandera: "🇱🇮",
    name: "liechtenstein",
  },
  {
    code: "+370",
    bandera: "🇱🇹",
    name: "lithuania",
  },
  {
    code: "+352",
    bandera: "🇱🇺",
    name: "luxembourg",
  },
  {
    code: "+853",
    bandera: "🇲🇴",
    name: "macao",
  },
  {
    code: "+599",
    bandera: "🇳🇱",
    name: "netherlands antilles",
  },
  {
    code: "+63",
    bandera: "🇵🇭",
    name: "philippines",
  },
  {
    code: "+1758",
    bandera: "🇱🇨",
    name: "saint lucia",
  },
  {
    code: "+221",
    bandera: "🇸🇳",
    name: "senegal",
  },
  {
    code: "+94",
    bandera: "🇱🇰",
    name: "sri lanka",
  },
  {
    code: "+228",
    bandera: "🇹🇬",
    name: "togo",
  },
  {
    code: "+683",
    bandera: "🇳🇺",
    name: "niue",
  },
  {
    code: "+48",
    bandera: "🇵🇱",
    name: "poland",
  },
  {
    code: "+508",
    bandera: "🇵🇲",
    name: "saint pierre and miquelon",
  },
  {
    code: "+421",
    bandera: "🇸🇰",
    name: "slovakia",
  },
  {
    code: "+261",
    bandera: "🇲🇬",
    name: "madagascar",
  },
  {
    code: "+212",
    bandera: "🇲🇦",
    name: "morocco",
  },
  {
    code: "+998",
    bandera: "🇺🇿",
    name: "uzbekistan",
  },
  {
    code: "+250",
    bandera: "🇷🇼",
    name: "rwanda",
  },
  {
    code: "+239",
    bandera: "🇸🇹",
    name: "sao tome and principe",
  },
  {
    code: "+386",
    bandera: "🇸🇮",
    name: "slovenia",
  },
  {
    code: "+596",
    bandera: "🇲🇶",
    name: "martinique",
  },
  {
    code: "+258",
    bandera: "🇲🇿",
    name: "mozambique",
  },
  {
    code: "+51",
    bandera: "🇵🇪",
    name: "peru",
  },
  {
    code: "+1869",
    bandera: "🇰🇳",
    name: "saint kitts and nevis",
  },
  {
    code: "+381",
    bandera: "🇷🇸",
    name: "serbia",
  },
  {
    code: "+249",
    bandera: "🇸🇩",
    name: "sudan",
  },
  {
    code: "+690",
    bandera: "🇹🇰",
    name: "tokelau",
  },
  {
    code: "+970",
    bandera: "🇵🇸",
    name: "palestinian territory, occupied",
  },
  {
    code: "+7",
    bandera: "🇷🇺",
    name: "russia",
  },
  {
    code: "+966",
    bandera: "🇸🇦",
    name: "saudi arabia",
  },
  {
    code: "+677",
    bandera: "🇸🇧",
    name: "solomon islands",
  },
  {
    code: "+222",
    bandera: "🇲🇷",
    name: "mauritania",
  },
  {
    code: "+95",
    bandera: "🇲🇲",
    name: "myanmar",
  },
  {
    code: "+507",
    bandera: "🇵🇦",
    name: "panama",
  },
  {
    code: "+1784",
    bandera: "🇻🇨",
    name: "saint vincent and the grenadines",
  },
  {
    code: "+65",
    bandera: "🇸🇬",
    name: "singapore",
  },
  {
    code: "+597",
    bandera: "🇸🇷",
    name: "suriname",
  },
  {
    code: "+676",
    bandera: "🇹🇴",
    name: "tonga",
  },
  {
    code: "+971",
    bandera: "🇦🇪",
    name: "united arab emirates",
  },
  {
    code: "+685",
    bandera: "🇼🇸",
    name: "samoa",
  },
  {
    code: "+232",
    bandera: "🇸🇱",
    name: "sierra leone",
  },
  {
    code: "+389",
    bandera: "🇲🇰",
    name: "macedonia",
  },
  {
    code: "+264",
    bandera: "🇳🇦",
    name: "namibia",
  },
  {
    code: "+675",
    bandera: "🇵🇬",
    name: "papua new guinea",
  },
  {
    code: "+378",
    bandera: "🇸🇲",
    name: "san marino",
  },
  {
    code: "+252",
    bandera: "🇸🇴",
    name: "somalia",
  },
  {
    code: "+41",
    bandera: "🇨🇭",
    name: "switzerland",
  },
  {
    code: "+598",
    bandera: "🇺🇾",
    name: "uruguay",
  },
  {
    code: "+967",
    bandera: "🇾🇪",
    name: "yemen",
  },
  {
    code: "+248",
    bandera: "🇸🇨",
    name: "seychelles",
  },
  {
    code: "+268",
    bandera: "🇸🇿",
    name: "swaziland",
  },
  {
    code: "+674",
    bandera: "🇳🇷",
    name: "nauru",
  },
  {
    code: "+678",
    bandera: "🇻🇺",
    name: "vanuatu",
  },
  {
    code: "+356",
    bandera: "🇲🇹",
    name: "malta",
  },
  {
    code: "+27",
    bandera: "🇿🇦",
    name: "south africa",
  },
  {
    code: "+52",
    bandera: "🇲🇽",
    name: "mexico",
  },
  {
    code: "+1664",
    bandera: "🇲🇸",
    name: "montserrat",
  },
  {
    code: "+976",
    bandera: "🇲🇳",
    name: "mongolia",
  },
  {
    code: "+382",
    bandera: "🇲🇪",
    name: "montenegro",
  },
  {
    code: "+60",
    bandera: "🇲🇾",
    name: "malaysia",
  },
  {
    code: "+265",
    bandera: "🇲🇼",
    name: "malawi",
  },
  {
    code: "+223",
    bandera: "🇲🇱",
    name: "mali",
  },
  {
    code: "+230",
    bandera: "🇲🇺",
    name: "mauritius",
  },
  {
    code: "+960",
    bandera: "🇲🇻",
    name: "maldives",
  },
  {
    code: "+31",
    bandera: "🇳🇱",
    name: "netherlands",
  },
  {
    code: "+377",
    bandera: "🇲🇨",
    name: "monaco",
  },
  {
    code: "+373",
    bandera: "🇲🇩",
    name: "moldova",
  },
  {
    code: "+977",
    bandera: "🇳🇵",
    name: "nepal",
  },
  {
    code: "+692",
    bandera: "🇲🇭",
    name: "marshall islands",
  },
  {
    code: "+262",
    bandera: "🇷🇪",
    name: "reunion",
  },
  {
    code: "+691",
    bandera: "🇫🇲",
    name: "micronesia, federated states of micronesia",
  },
  {
    code: "+687",
    bandera: "🇳🇨",
    name: "new caledonia",
  },
  {
    code: "+505",
    bandera: "🇳🇮",
    name: "nicaragua",
  },
  {
    code: "+64",
    bandera: "🇳🇿",
    name: "new zealand",
  },
  {
    code: "+1670",
    bandera: "🇲🇵",
    name: "northern mariana islands",
  },
  {
    code: "+234",
    bandera: "🇳🇬",
    name: "nigeria",
  },
  {
    code: "+227",
    bandera: "🇳🇪",
    name: "niger",
  },
  {
    code: "+90",
    bandera: "🇹🇷",
    name: "turkey",
  },
  {
    code: "+680",
    bandera: "🇵🇼",
    name: "palau",
  },
  {
    code: "+92",
    bandera: "🇵🇰",
    name: "pakistan",
  },
  {
    code: "+47",
    bandera: "🇳🇴",
    name: "svalbard and jan mayen",
  },
  {
    code: "+968",
    bandera: "🇴🇲",
    name: "oman",
  },
  {
    code: "+872",
    bandera: "🇵🇳",
    name: "pitcairn",
  },
  {
    code: "+1939",
    bandera: "🇵🇷",
    name: "puerto rico",
  },
  {
    code: "+351",
    bandera: "🇵🇹",
    name: "portugal",
  },
  {
    code: "+974",
    bandera: "🇶🇦",
    name: "qatar",
  },
  {
    code: "+40",
    bandera: "🇷🇴",
    name: "romania",
  },
  {
    code: "+290",
    bandera: "🇸🇭",
    name: "saint helena, ascension and tristan da cunha",
  },
  {
    code: "+34",
    bandera: "🇪🇸",
    name: "spain",
  },
  {
    code: "+211",
    bandera: "🇸🇸",
    name: "south sudan",
  },
  {
    code: "+46",
    bandera: "🇸🇪",
    name: "sweden",
  },
  {
    code: "+963",
    bandera: "🇸🇾",
    name: "syrian arab republic",
  },
  {
    code: "+886",
    bandera: "🇹🇼",
    name: "taiwan",
  },
  {
    code: "+670",
    bandera: "🇹🇱",
    name: "timor-leste",
  },
  {
    code: "+1649",
    bandera: "🇹🇨",
    name: "turks and caicos islands",
  },
  {
    code: "+66",
    bandera: "🇹🇭",
    name: "thailand",
  },
  {
    code: "+688",
    bandera: "🇹🇻",
    name: "tuvalu",
  },
  {
    code: "+1868",
    bandera: "🇹🇹",
    name: "trinidad and tobago",
  },
  {
    code: "+216",
    bandera: "🇹🇳",
    name: "tunisia",
  },
  {
    code: "+256",
    bandera: "🇺🇬",
    name: "uganda",
  },
  {
    code: "+255",
    bandera: "🇹🇿",
    name: "tanzania, united republic of tanzania",
  },
  {
    code: "+58",
    bandera: "🇻🇪",
    name: "venezuela, bolivarian republic of venezuela",
  },
  {
    code: "+993",
    bandera: "🇹🇲",
    name: "turkmenistan",
  },
  {
    code: "+1284",
    bandera: "🇻🇬",
    name: "virgin islands, british",
  },
  {
    code: "+84",
    bandera: "🇻🇳",
    name: "vietnam",
  },
  {
    code: "+380",
    bandera: "🇺🇦",
    name: "ukraine",
  },
  {
    code: "+992",
    bandera: "🇹🇯",
    name: "tajikistan",
  },
  {
    code: "+1340",
    bandera: "🇻🇮",
    name: "virgin islands, u.s.",
  },
  {
    code: "+263",
    bandera: "🇿🇼",
    name: "zimbabwe",
  },
  {
    code: "+260",
    bandera: "🇿🇲",
    name: "zambia",
  },
  {
    code: "+681",
    bandera: "🇼🇫",
    name: "wallis and futuna",
  },
];



const searchQuery = ref("");

/* const indiceChile = codeCountry.findIndex((code) => code.code === "+56");
 */
const filterCodeTelefono = () => {
  if (!searchQuery.value) return codeCountry;
  return codeCountry.filter((code) => {
    return (
      code.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      code.code.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
};

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  loading.value = true
  const status = await UploadFiles(filesSave.value)
  if(status?.status){
    try {
        // @ts-ignore
      await axios(
        // @ts-ignore
        {
          url: `${import.meta.env.VITE_URL_API}/api/content/item/productores?fields={"_state": false,"_modified": false,"_mby": false,"_created": false,"_cby": false,"verificacion": false,}`,
          method: "POST",
          mode: "cors",
          headers: {
            "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
          },
          data: {data: state},
          onUploadProgress: (progressEvent) => {
            faseUpload.value = "Actualizando datos del productor...";
            const progressPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            porcentaje.value = progressPercent;
            // Actualiza tu interfaz con el porcentaje de progreso
          },
        }
      )
      .then((res) =>{
        toast.success("Se han actualizado los datos del productor Satisfactoriamente.")
        faseUpload.value = 'Subida Completada' 
        imgLogo.value = ''
        loading.value = false
      })
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style scoped>
.h-formulario {
  height: calc(100vh - 200px);
}
</style>
