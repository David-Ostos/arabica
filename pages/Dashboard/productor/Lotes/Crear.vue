<template>
  <div :style="containerStyles" class="m-8 sm:m-20">
    <div class="overflow-auto">
      <div>
        <h1 class="text-center mb-8 text-xl sm:text-3xl text-gray-700 font-bold">
          Crea tu Lote de Café
        </h1>
        <!-- <h3 class="sm:text-2xl text-center sm:text-inherit text-xl mb-8 text-gray-600">Agrega las imagenes</h3> -->
      </div>

      <div class="grid sm:grid-cols-2 gap-8">
        <!-- <div>
          <AddImg @update:imagenes="prueba" :max-imagenes="4"/>
        </div> -->

        <!-- galeria -->
        <div
          @click="clickInputFile"
          class="col-span-1 grid-area-1 h-[430px] h-ful shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-xl p-4"
        >
          <div class="grid grid-cols-4 col-span-2 grid-rows-4 gap-4 h-full">
            <div
              v-if="loading"
              class="row-span-2 col-span-4 flex justify-center items-center border rounded-xl p-4 cursor-pointer overflow-hidden brightness-75 bg-gray-100 opacity-55"
            >
              <l-squircle
                size="37"
                stroke="5"
                stroke-length="0.15"
                bg-opacity="0.1"
                speed="0.9"
                color="black"
              ></l-squircle>
            </div>

            <div
              v-if="!loading && pictures.length > 0"
              class="row-span-2 col-span-4 border rounded-xl cursor-pointer overflow-hidden hover:brightness-75"
              :class="
                pictures[0]?.link !== 'i-icon-park-outline-add-picture' ||
                undefined
                  ? 'flex justify-center items-center h-full w-full '
                  : 'hover:bg-gray-100 p-4'
              "
            >
              <img
                v-if="pictures[0].link !== 'i-icon-park-outline-add-picture'"
                :src="pictures[0].link"
                class="rounded-xl h-full w-full object-cover"
                alt=""
              />
              <UIcon
                v-if="pictures[0].link === 'i-icon-park-outline-add-picture'"
                name="i-icon-park-outline-add-picture"
                class="h-full w-full opacity-55 hover:scale-105"
                dynamic
              />
            </div>

            <div
              class="flex justify-around items-center row-span-2 gap-4 col-span-4 h-full w-full"
            >
              <div
                v-for="img in pictures.slice(1)"
                class="h-full w-full flex items-center justify-center cursor-pointer overflow-hidden hover:brightness-75 hover:bg-gray-100 rounded-xl hover:scale-105"
              >
                <div
                  v-if="loading"
                  class="flex justify-center items-center border rounded-xl w-full h-full brightness-75 bg-gray-100 opacity-55"
                >
                  <l-squircle
                    size="37"
                    stroke="5"
                    stroke-length="0.15"
                    bg-opacity="0.1"
                    speed="0.9"
                    color="black"
                  ></l-squircle>
                </div>
                <div
                  v-if="
                    !loading && img.link === 'i-icon-park-outline-add-picture'
                  "
                  class=""
                >
                  <UIcon
                    :name="img.link"
                    class="rounded-xl h-28 w-full object-cover opacity-55 hover:scale-105"
                    alt=""
                    dynamic
                  />
                </div>
                <div
                  v-show="
                    !loading && img.link !== 'i-icon-park-outline-add-picture'
                  "
                  class="rounded-xl hover:brightness-50"
                >
                  <img
                    :src="img.link"
                    class="rounded-xl h-full w-full object-cover hover:scale-105"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <!-- barrar de carga -->

            <UProgress :class="faseUpload === 'none' ? 'hidden' : ''" :value="porcentaje" :color="color" class="col-span-4">
              <template #indicator="{percent}">
                <div class="text-right" :style="{width: `${percent}%`}">
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
                    v-else-if="faseUpload === 'Actualizando Lotes locales...'"
                    class="text-orange-500"
                    >{{ faseUpload }}</span
                  >
                  <span
                    v-else-if="faseUpload === 'Subida Completada'"
                    class="text-primary-500"
                    >✔ Subida completada.</span
                  >
                  <span
                    v-else-if="faseUpload === 'error'"
                    class="text-red-500 font-bold"
                    >X Hubo un error.</span
                  >
                </div>
              </template>
            </UProgress>
            <!-- /barra de carga -->
          </div>
        </div>
        <!-- !galeria -->

        <!-- formulartio -->
        <div
          ref="componentRef"
          :class="[
            'flex flex-col w-full  p-4 rounded-xl border justify-between h-ful shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
            isScreenSmall ? 'scrollbar-hide ' : 'h-[430px] overflow-auto',
          ]"
        >
          <UForm
            :schema="schema"
            :validate="validate"
            :state="state"
            @submit="onSubmit"
            class="grid grid-col-3 sm:grid-cols-6 gap-4"
          >
            <input
              class="hidden"
              type="file"
              ref="inputSmFile"
              @change="handleFileUpload"
              multiple
            />

            <UFormGroup
              label="Nombre del lote"
              name="nombre"
              class="col-span-3"
            >
              <UInput
                v-model="state.nombre"
                placeholder="Ingresa el nombre del lote"
              />
            </UFormGroup>

            <UFormGroup
              label="Nombre del productor"
              name="nombreProductor"
              class="col-span-3"
            >
              <UInput
                v-model="state.nombreProductor"
                placeholder="Ingresa el nombre del productor"
              />
            </UFormGroup>

            <UFormGroup label="País" name="pais" class="col-span-3">
              <USelectMenu
                :ui="{select: 'capitalize'}"
                searchable
                searchable-placeholder="Buscar País..."
                class="w-full capitalize"
                placeholder="Selecciona el País"
                :options="['perú']"
                v-model="state.pais"
              />
            </UFormGroup>

            <UFormGroup label="Origenes" name="origen" class="col-span-3">
              <USelectMenu
                :ui="{select: 'capitalize'}"
                searchable
                searchable-placeholder="Buscar origen..."
                class="w-full capitalize"
                placeholder="Selecciona el origen (departamento)"
                :options="[
                  'piura',
                  'amazonas',
                  'cajamarca',
                  'san martin',
                  'huanuco',
                  'pasco',
                  'junin',
                  'ayacucho',
                  'cusco',
                  'puno',
                ]"
                v-model="state.origen"
              />
            </UFormGroup>

            <UFormGroup
              label="Nombre de la finca"
              name="nombreFinca"
              class="col-span-3"
            >
              <UInput
                v-model="state.nombreFinca"
                placeholder="Ingresa el nombre de la finca"
              />
            </UFormGroup>

            <UFormGroup label="Variedad/es" name="variedad" class="col-span-3">
              <USelectMenu
                :ui="{select: 'capitalize'}"
                multiple
                searchable
                searchable-placeholder="Buscar variedades..."
                class="w-full capitalize"
                placeholder="Selecciona la/s variedad/es"
                :options="[
                  'geisha',
                  'typica',
                  'bourbon',
                  'bourbon mayaguez',
                  'ls 14',
                  'ls 28',
                  'ls34',
                  'rume sudan',
                  'maragogype ',
                  'pacamara ',
                  'caturra',
                  'catuai ',
                  'tabi',
                  'mundo novo',
                  'costa rica 95',
                  'castilla',
                  'catimor',
                  'blend',
                  'otro',
                ]"
                v-model="state.variedad"
              />
            </UFormGroup>

            <UFormGroup label="Proceso" name="proceso" class="col-span-3">
              <USelectMenu
                :ui="{select: 'capitalize'}"
                searchable
                searchable-placeholder="Buscar proceso..."
                class="w-full capitalize"
                placeholder="Selecciona el proceso"
                :options="[
                  'lavado',
                  'lavado anaeróbico',
                  'lavado oxidación',
                  'lavado fermentación láctica',
                  'yellow honey',
                  'red honey',
                  'back honey',
                  'natural',
                  'natural anaeróbico',
                  'experimental',
                ]"
                v-model="state.proceso"
              />
            </UFormGroup>

            <UFormGroup label="Precio" name="precio" class="col-span-3">
              <UInput v-model="state.precio" type="number" placeholder="5">
                <template #leading>
                  <span class="text-gray-500 dark:text-gray-400">$</span>
                </template>
              </UInput>
            </UFormGroup>

            <UFormGroup
              label="Periodo de cosecha"
              name="periodoCosecha"
              class="col-span-6"
            >
              <div class="grid grid-cols-2 gap-4 border-t pt-4 mt-4">
                <UFormGroup
                  label="Mes inicial"
                  name="periodoCosecha[0]"
                  class="col-span-1"
                >
                  <USelectMenu
                    :ui="{select: 'capitalize'}"
                    searchable
                    searchable-placeholder="Buscar mes..."
                    class="w-full capitalize"
                    placeholder="Selecciona el mes inicial"
                    :options="meses"
                    v-model="state.periodoCosecha![0]"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Mes final"
                  name="periodoCosecha[0]"
                  class="col-span-1"
                >
                  <USelectMenu
                    :ui="{select: 'capitalize'}"
                    searchable
                    searchable-placeholder="Buscar mes..."
                    class="w-full capitalize"
                    placeholder="Selecciona el mes final"
                    :options="meses"
                    v-model="state.periodoCosecha![1]"
                  />
                </UFormGroup>
              </div>
            </UFormGroup>

            <UFormGroup
              label="Altitud"
              help="Coloque la altitud sobre el nivel del mar"
              name="altitud"
              class="col-span-3"
            >
              <UInput trailing v-model="state.altitud" placeholder="1500">
                <template #trailing>
                  <span class="text-gray-500 dark:text-gray-400">m.s.n.m</span>
                </template>
              </UInput>
            </UFormGroup>

            <!--             <UFormGroup label="Productores"
              name="productores"
              class="col-span-3"
            >
              <USelectMenu
                :ui="{select: 'capitalize'}"
                searchable
                searchable-placeholder="Buscar departamento..."
                class="w-full capitalize"
                placeholder="Selecciona el departamento"
                :options="['independiente', 'asociacion', 'cooperativa']"
                v-model="state.productores"
              />
            </UFormGroup> -->

            <!--             <UFormGroup label="Puntaje" name="puntaje" class="col-span-3">
              <UInput v-model="state.puntaje" type="number" placeholder="85.25"/> 
            </UFormGroup> -->

            <!--             <UFormGroup label="Perfil" name="perfil" class="col-span-3">
              <USelectMenu
                :ui="{select: 'capitalize'}"
                searchable
                searchable-placeholder="Buscar perfil..."
                class="w-full capitalize"
                placeholder="Selecciona el perfil"
                :options="['floral', 'frutal', 'vegetal', 'cítrico', 'vinoso', 'dulce', 'azucares caramelizados', 'frutos secos', 'chocolate', 'nuez', 'taza limpia']"
                v-model="state.perfil"
              />
            </UFormGroup> -->

            <!--             <UFormGroup label="Cantidad del lote"
              name="cantidadLote"
              class="col-span-3"
            >
              <USelectMenu
                :ui="{select: 'capitalize'}"
                searchable
                searchable-plotesVisibles.valuelaceholder="Buscar la cantidad del lote...."
                class="w-full capitalize"
                placeholder="Selecciona la cantidad del lote"
                :options="[
                  'lote',
                  'micro lote',
                  'nano lote',
                ]"
                v-model="state.cantidadLote"
              />
            </UFormGroup> -->

            <UFormGroup label="¿Este lote Tiene muestra? " class="col-span-3">
              <UToggle
                v-model="muestra"
                on-icon="i-heroicons-check-20-solid"
                off-icon="i-heroicons-x-mark-20-solid"
              />
            </UFormGroup>

            <div
              v-if="state.muestra?.muestra"
              class="col-span-3 sm:col-span-6 grid grid-cols-6 gap-4"
            >
              <UFormGroup
                label="¿Este lote Tiene muestra gratis? "
                name="muestra.muestra"
                class="col-span-6 sm:col-span-2"
              >
                <UToggle
                  v-model="muestraGratis"
                  on-icon="i-heroicons-check-20-solid"
                  off-icon="i-heroicons-x-mark-20-solid"
                />
              </UFormGroup>

              <UFormGroup
                v-if="!state.muestra.muestraGratis"
                label="Precio"
                name="muestra.precio"
                class="col-span-3 sm:col-span-2"
              >
                <UInput
                  v-model="state.muestra.precio"
                  type="number"
                  placeholder="5"
                >
                  <template #leading>
                    <span class="text-gray-500 dark:text-gray-400">$</span>
                  </template>
                </UInput>
              </UFormGroup>

              <UFormGroup
                label="Cantidad"
                name="muestra.cantidad"
                class="col-span-3 sm:col-span-2"
              >
                <UInput
                  v-model="state.muestra.cantidad"
                  type="number"
                  placeholder="1"
                >
                  <template #leading>
                    <span class="text-gray-500 dark:text-gray-400">lb/</span>
                  </template>
                </UInput>
              </UFormGroup>
            </div>

            <UFormGroup
              label="Historia del lote"
              name="descripcion"
              class="col-span-6"
            >
              <UTextarea
                autoresize
                v-model="state.descripcion"
                placeholder="Escribe una descripción del lote"
              />
            </UFormGroup>

            <UButton
              size="xl"
              :padded="true"
              type="submit"
              :loading="loading"
              :ui="{
                inline: 'inline-block flex item-center justify-center',
              }"
              class="col-start-2 text-center col-span-4"
            >
              Crear Lote</UButton
            >
          </UForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import {object, string, number, type InferType, array} from "yup";
import type {FormError, FormSubmitEvent} from "#ui/types";
import type {Lotes} from "~/interfaces/Lotes";
import {squircle} from "ldrs";
import {toast} from "vue3-toastify";

const {isScreenSmall} = useGlobalComposable();

squircle.register();

// Default values shown

definePageMeta({
  middleware: "productor",
  layout: "productor",
});

const useGlobal = useGlobalStore();

const containerStyles = computed(() => ({
  "margin-top": `calc( ${useGlobal.heightNavProductor}px + 32px )`,
  "max-height": `calc(100vh - (${useGlobal.heightNavProductor}px + ${useGlobal.heightFooterProductor}px + ${useGlobal.heightNavProductor}px ))`,
}));

const meses = useGlobal.meses;



const componentRef = ref<HTMLElement>();
const createObserver = (element: HTMLElement) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          element.scrollIntoView({behavior: "smooth", block: "start"});
        }
      });
    },
    {
      threshold: 0.5, // Activar cuando el 50% del elemento es visible
      rootMargin: "-50% 0px -50% 0px", // Considerar el 50% central del viewport
    }
  );

  observer.observe(element);
  return observer;
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (componentRef.value) {
    observer = createObserver(componentRef.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
const useProductor = useProductorStore();
const useUser = useUserStore();
const useLotes = useLotesStore();

const pictures = ref([
  {
    _id: "1",
    link: "i-icon-park-outline-add-picture",
    position: 1,
  },
] as any);
const loading = ref(false);
const inputFile = ref();
const filesSave = ref();
const lotes = useProductor.lotes;
verificarGaleria();
const porcentaje = ref(0);

const inputSmFile = ref();

const clickInputFile = () => {
  inputSmFile.value.click();
};

const prueba = (imagen: any) => {};

const faseUpload = ref(
  "none" as
    | "none"
    | "Subiendo Imagenes..."
    | "Subiendo Lote..."
    | "Actualizando Lotes locales..."
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
    case faseUpload.value === "Actualizando Lotes locales...":
      return "orange";
    case faseUpload.value === "error":
      return "red";
    default:
      return "primary";
  }
});

const md = ref("");

function crearGaleria(pictures: any) {
  if (pictures.length === 0) {
    return (pictures = [
      {
        _id: "1",
        link: "i-icon-park-outline-add-picture",
        position: 1,
      },
      {
        _id: "2",
        link: "i-icon-park-outline-add-picture",
        position: 2,
      },
      {
        _id: "3",
        link: "i-icon-park-outline-add-picture",
        position: 3,
      },
      {
        _id: "4",
        link: "i-icon-park-outline-add-picture",
        position: 4,
      },
    ]);
  } else if (pictures.length < 4) {
    let count = pictures.length;
    return (pictures = [
      ...pictures,
      ...Array(4 - pictures.length).fill({
        link: "i-icon-park-outline-add-picture",
        position: count++,
      }),
    ]);
  }
  return pictures;
}

function verificarGaleria() {
  pictures.value = crearGaleria(pictures.value);
}
const state: Lotes = reactive({
  nombre: undefined,
  nombreProductor: undefined,
  pais: "perú",
  origen: undefined,
  nombreFinca: undefined,
  altitud: undefined,
  periodoCosecha: [] ,
  productores: undefined,
  variedad: [],
  proceso: undefined,
  perfil: undefined,
  certificaciones: undefined,
  cantidadLote: undefined,
  puntaje: 0,
  precio: 0,
  descripcion: undefined,
  galeria: [],
  productor: {
    _id: useProductor.perfilProductor._id,
    nombre: useProductor.perfilProductor.nombre,
    picture: useUser.dataUser.picture,
  },
  muestra: {
    muestra: false,
    muestraGratis: false,
    precio: 0,
    cantidad: 0,
  },
  ocultar: false,
});

const muestra = ref(state.muestra?.muestra);
const muestraGratis = ref(state.muestra?.muestraGratis);

watch(muestraGratis, (nuevoValor) => {
  state.muestra!.muestraGratis = nuevoValor;
});

watch(muestra, (nuevoValor) => {
  state.muestra!.muestra = nuevoValor;
});

const schema = object({
  nombre: string().required("Este campo es obligatorio"),
  nombreProductor: string().required("Este campo es obligatorio"),
  pais: string().required("Este campo es obligatorio"),
  origen: string().required("Este campo es obligatorio"),
  nombreFinca: string().required("Este campo es obligatorio"),
  altitud: string().required("Este campo es obligatorio"),
  variedad: array().required("Este campo es obligatorio"),
  proceso: string().required("Este campo es obligatorio"),
  periodoCosecha: array().required("Este campo es obligatorio"),
  precio: number().positive("Tiene que ser un precio mayor a 0").required("Este campo es obligatorio"),
  descripcion: string().required("Este campo es obligatorio"),
});

const validate = (state: any): FormError[] => {
  const errors = [];

  if (state.puntaje === "")
    errors.push({path: "puntaje", message: "Este campo es obligatorio"});

  if (state.precio === "")
    errors.push({path: "precio", message: "Este campo es obligatorio"});

  if (
    state.muestra.muestra &&
    !state.muestra.muestraGratis &&
    state.muestra.precio <= 0
  )
    errors.push({
      path: "muestra.precio",
      message: "El precio tiene que ser mayor que 0",
    });

  if (
    state.muestra.muestra &&
    !state.muestra.muestraGratis &&
    !state.muestra.precio
  )
    errors.push({path: "muestra.precio", message: "Este campo es obligatorio"});

  if (state.muestra.muestra && state.muestra.cantidad <= 0)
    errors.push({
      path: "muestra.cantidad",
      message: "La cantidad tiene que ser mayor que 0",
    });

  if (state.muestra.muestra && !state.muestra.cantidad)
    errors.push({
      path: "muestra.cantidad",
      message: "Este campo es obligatorio",
    });

  return errors;
};

type Schema = InferType<typeof schema>;
async function addLoteProductor(newLote: {_id: string; _model: string}[]) {
  try {
    // @ts-ignore
    await axios({
      url: `${import.meta.env.VITE_URL_API}/api/content/item/productores`,
      method: "POST",
      mode: "cors",
      headers: {
        "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
      },
      onUploadProgress: (progressEvent) => {
        faseUpload.value = "Actualizando Lotes locales...";
        const progressPercent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total!
        );
        porcentaje.value = progressPercent;
      },
      data: {
        data: {
          _id: useProductor.perfilProductor._id,
          lotes: newLote,
        },
      },
    }).then((res) => {});
  } catch (e) {
    console.log(e);
  }
}

async function handleFileUpload(event: any) {
  loading.value = true;

  filesSave.value = event.target.files;

  const files = event.target.files;

  pictures.value = [];

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
            resolve({_id: i, link: dataURL, position: 0});
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        imagePromises.push(imagePromise);
      }

      // Espera a que todas las promesas se resuelvan (imágenes cargadas)
      const imagesData = await Promise.all(imagePromises);
      pictures.value = imagesData;
    } else {
      toast.error(
        "Solo se aceptan archivos de formato .gif, .png, .jpg, .jpeg, webp"
      );
      inputFile.value = "";
    }
  } else {
    toast.error(
      "Solo se aceptan archivos de formato .gif, .png, .jpg, .jpeg, webp"
    );
    inputFile.value = "";
  }
  loading.value = false;
  verificarGaleria();
}

async function UploadFiles(files: any) {
  let status;
  if (files) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files[]", files[i]);
    }

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
          let count = 0;
          res.data.assets.forEach((file: any) => {
            state.galeria!.push({
              _id: file._id,
              link: `https://cockpit.arabicagc.com/storage/uploads${file.path}`,
              position: count,
            });
            return ++count;
          });
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
    toast.error("No hay imagenes para subir, por favor agregue las imagenes.");
    return (status = {status: false, tipo: "otros"});
  }
  return status;
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  loading.value = true;
  const uploadImg = await UploadFiles(filesSave.value);
  if (uploadImg!.status) {
    try {
      // @ts-ignore
      await axios(
        // @ts-ignore
        {
          url: `${
            import.meta.env.VITE_URL_API
          }/api/content/item/lotes?fields={"_state": false,"_modified": false,"_mby": false,"_created": false,"_cby": false,"verificacion": false,}`,
          method: "POST",
          mode: "cors",
          headers: {
            "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
          },
          onUploadProgress: (progressEvent: any) => {
            faseUpload.value = "Subiendo Lote...";
            const progressPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            porcentaje.value = progressPercent;
          },
          data: {data: state},
        }
      )
        .then(async (res) => {
          useLotes.lotes.push(res.data);

          state.nombre = undefined;
          state.nombreProductor = undefined;
          state.origen = undefined;
          state.nombreFinca = undefined;
          state.altitud = undefined;
          state.variedad = [];
          state.proceso = undefined;
          state.precio = undefined;
          state.galeria = [];
          state.muestra = {
            muestra: false,
            muestraGratis: false,
            cantidad: undefined,
            precio: undefined,
          };
          state.descripcion = undefined;
          pictures.value = [];
          inputFile.value = "";
          loading.value = false;

          verificarGaleria();

          const newLote = useProductor.perfilProductor.lotes;
          newLote!.push({
            _model: "lotes",
            _id: res.data._id,
          });
          //@ts-ignore
          await addLoteProductor(newLote!);

          toast.success("Se ha agregado el lote satisfactoriamente");
        })
        .catch((error) => {
          faseUpload.value = "error";
          console.log(error);
          if (error.code === "ERR_NETWORK") {
            toast.info("Problemas en la conexion intente mas tarde.");
          } else {
            toast.info(
              "Hubo un problema, por favor inténtelo de nuevo, si el error se repite por favor ponerse en contacto con soporte."
            );
          }
          loading.value = false;
        })
        .finally(() => {
          faseUpload.value = "Subida Completada";
        });
    } catch (error) {
      faseUpload.value = "error";

      console.log(error);
      loading.value = false;
    }
  } else {
    loading.value = false;
    faseUpload.value = "error";
    if (uploadImg!.tipo === "otros") {
      return false;
    } else {
      toast.warn(
        "Hubo un problema, por favor inténtelo de nuevo, si el error se repite por favor ponerse en contacto con soporte."
      );
    }
  }

  loading.value = false;
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none; /* IE y Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
