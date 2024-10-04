<template>
  <div
    @touchstart="selectActive = !selectActive"
    class="h-full lg:w-[930px] mx-auto my-14"
  >
    <div
      class="rounded-xl shadow w-full h-fit mx-auto bg-white overflow-auto font-raleway"
    >
      <h1 class="px-8 pt-4 uppercase text-gray-500 text-xs font-bold">
        información comercial
      </h1>
      <UForm
        :schema="schema"
        :state="state"
        :validate="validate"
        @submit="onSubmit"
        class="flex flex-col p-8 w-full"
      >
        <div class="grid grid-cols-5 gap-8 relative w-full mb-4">
          <div
            class="grid grid-cols-8 col-span-5 w-full gap-8 h-fit capitalize"
          >
            <UFormGroup
              required
              class="col-span-5 h-fit"
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
              class="col-span-5"
            >
              <div
                class="grid grid-cols-12 w-full focus-visible:ring-2 ring-primary group rounded-md"
              >
                <div class="col-span-2 cursor-pointer relative">
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
                  class="col-span-10"
                  placeholder="1234567..."
                  icon=""
                  v-model="state.numeroTelefonico!.numero"
                  size="xl"
                />
              </div>
            </UFormGroup>

            <UFormGroup
              required
              class="col-span-5"
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

          <!-- logo  -->
          <div class="p-4 absolute right-0 top-0">
            <span class="text-gray-500 font-semibold">Logo del Comercio</span>

            <div
              class="relative flex flex-col justify-center items-center border rounded-xl h-52 w-full shadow-inner bg-gray-100"
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
              class="text-xs mt-2 text-gray-500 font-semibold mx-auto w-[max-content] flex"
              >Al menos 200 por 200 píxeles. Tamaño máximo 6MB.</span
            >
          </div>
          <!-- /logo  -->

        </div>

        
        

        <div>
          <UFormGroup label="Redes Sociales" class="border-t py-8">
            <CompradorUsuarioInformacionComercioRedesSociales/>
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
  layout: "comprador",
  middleware: "comprador",
});
import {object, string, type InferType} from "yup";
import type {FormError, FormSubmitEvent} from "#ui/types";
import type {PerfilProductor} from "~/interfaces/PerfilProductor";
import { toast } from "vue3-toastify";
import axios from "axios";

const useGlobal = useGlobalStore();
const useComprador = useCompradorStore()
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
  _id: useComprador.perfilComprador._id,
  nombre: useComprador.perfilComprador.nombre,
  numeroTelefonico: useComprador.perfilComprador.numeroTelefonico,
  direccion: useComprador.perfilComprador.direccion,
  // logo: useComprador.perfilComprador.logo,
  redes: useComprador.perfilComprador.redes
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
            console.log(progressEvent);
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
const codeCountry = useGlobal.codeCountry

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
            console.log(progressEvent);
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
