<template>


      <!-- Modal para agregar y eliminar imagenes -->
      <UModal :ui="{ width: 'sm:max-w-[900px]' }" prevent-close v-model="isOpenModalPicture">
      <UCard :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        width: 'sm:max-w-2xl',
      }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 @click="" class="text-base font-semibold text-gray-900 dark:-text-dar">
              Agregar Imagenes destacadas
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="closeModalPicture" />
          </div>
        </template>

        <div>
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-gray-700 text-sm font-medium">
              {{ displayedImages.length }}
              {{ displayedImages.length === 1 ? "imagen" : "imágenes" }}
            </h1>
            <UButton @click="clickInputFile" variant="outline" class="text-secundary">
              <UIcon name="i-ic-baseline-add-circle-outline" class="text-secundary text-2xl font-bold" dynamic />
              Agregar imagenes
            </UButton>
            <input ref="inputImg" type="file" @change="handleFileUpload" class="hidden" multiple />
          </div>

          <div v-if="displayedImages.length > 0" class="grid grid-cols-3 gap-4">
            <div v-for="(item, index) in displayedImages" v-show="!item.enty"  :key="item._id" class="rounded-md gap-2 col-span-1">
              <div class="relative rounded-md col-span-1">
                <UIcon @click="removeImage(index)"
                  class="absolute top-2 right-2 text-red-500 bg-white p-1 text-2xl rounded-full cursor-pointer"
                  name="i-clarity-remove-line" dynamic />
                <img :src="item.link" class="w-full object-cover h-48 rounded-md cursor-pointer" draggable="false"
                  @click="openImageModal(item.link!)" />
              </div>

              <!-- Modal de muestra -->
              <LazyProductorPerfilModalImgMuestraMuestrasImgs :image="selectedImage" :open="isImageModalOpen"
                @close="closeImageModal" />
              <!-- /Modal de muestra -->

            </div>
          </div>
        </div>

        <UButton type="button" :loading="loading" class="w-fit self-end px-3 h-10 mt-8 font-bold" @click="onSubmit">
          <UIcon name="i-ic-baseline-add-circle-outline" class="text-white text-2xl font-bold" dynamic />
          Actualizar imagenes destacadas
        </UButton>
      </UCard>
    </UModal>
    <!-- /Modal para agregar y eliminar imagenes -->

  <div :style="containerStyles" class="m-8 sm:m-20">
    <div class="overflow-auto">
      <div>
        <h1 class="text-center mb-8 text-xl sm:text-3xl text-gray-700 font-bold">
          Edita tu Lote de Café
        </h1>
        <!-- <h3 class="sm:text-2xl text-center sm:text-inherit text-xl mb-8 text-gray-600">Agrega las imagenes</h3> -->
      </div>

      <div class="grid sm:grid-cols-2 gap-8">
        <!-- <div>
          <AddImg @update:imagenes="prueba" :max-imagenes="4"/>
        </div> -->

        <!-- galeria -->
        <div @click="openModalPicture(); console.log(pictures)"
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
                    v-else-if="faseUpload === 'Actualizando el lote...'"
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
              Editar Lote</UButton
            >
          </UForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { object, string, number, type InferType, array } from 'yup';
import type { FormError, FormSubmitEvent } from "#ui/types";
import type {  Galeria, Lotes } from "~/interfaces/Lotes";
import { squircle } from "ldrs";
import { toast } from "vue3-toastify";

type Schema = InferType<typeof schema>;
  
  squircle.register();

  const useGlobal = useGlobalStore();
const {isScreenSmall} = useGlobalComposable()

definePageMeta({
  middleware: "productor",
  layout: "productor",
});

const useLotes = useLotesStore();
const route = useRoute();
const { uploadedFiles, handleFileUpload, removeFile, filesArray, uploadFiles } =
  useFileUpload();


const lote = useLotes.lotes.filter((lote) => lote._id === route.params.id)[0];

const containerStyles = computed(() => ({
  "margin-top": `calc( ${useGlobal.heightNavProductor}px + 32px )`,
  "max-height": `calc(100vh - (${useGlobal.heightNavProductor}px + ${useGlobal.heightFooterProductor}px + ${useGlobal.heightNavProductor}px ))`,
}));

const state: Lotes = reactive({
  nombre: lote.nombre,
  nombreProductor: lote.nombreProductor,
  pais: lote.pais,
  origen: lote.origen,
  nombreFinca: lote.nombreFinca,
  altitud: lote.altitud,
  periodoCosecha: lote.periodoCosecha,
  productores: lote.productores,
  variedad: lote.variedad,
  proceso: lote.proceso,
  perfil: lote.perfil,
  certificaciones: lote.certificaciones,
  cantidadLote: lote.cantidadLote,
  puntaje: lote.puntaje,
  precio: lote.precio,
  descripcion: lote.descripcion,
  galeria: lote.galeria,
  productor: lote.productor,
  muestra: lote.muestra,
  ocultar: lote.ocultar
});

const pictures = ref(state.galeria as any);

const displayedImages = computed(() => {
  return [...pictures.value, ...uploadedFiles.value];
});

const isOpenModalPicture = ref(false)
const pictureModal = ref('')
const backupImages = ref<Galeria[]>([])

const openModalPicture = ( ) => {
  // pictureModal.value  = picture
  isOpenModalPicture.value = true
  backupImages.value = JSON.parse(JSON.stringify(pictures.value));
  // Resetear uploadedFiles al abrir el modal
  uploadedFiles.value = [];
}
const closeModalPicture = ()=>{
  // pictureModal.value = ''
  isOpenModalPicture.value = false
  uploadedFiles.value = []
}
const selectedImage = ref('')
const isImageModalOpen = ref(false)

const openImageModal = (imageUrl: string) => {
  selectedImage.value = imageUrl
  isImageModalOpen.value = true
}

const closeImageModal = () => {
  isImageModalOpen.value = false
}

const removeImage = (index: number) => {
  if (index < pictures.value.length) {
    // Es una imagen existente
    pictures.value.splice(index, 1);
  } else {
    // Es una imagen nueva
    removeFile(index - pictures.value.length);
  }
};



const muestra = ref(state.muestra?.muestra)
const muestraGratis = ref(state.muestra?.muestraGratis)

watch(muestraGratis, (nuevoValor) => {
  state.muestra!.muestraGratis = nuevoValor
});

watch(muestra, (nuevoValor) => {
  state.muestra!.muestra = nuevoValor
});

const meses = useGlobal.meses;
const loading = ref(false);
const inputFile = ref();
const filesSave = ref();
verificarGaleria();

const porcentaje = ref(0);
const inputSmFile = ref()
const faseUpload = ref(
  "none" as
  | "none"
  | "Subiendo Imagenes..."
  | "Actualizando el lote..."
  | "Actualizando Lotes locales..."
  | "Subida Completada"
  | "error"
);

const clickInputFile = ()=>{
  inputSmFile.value.click()
}

const color = computed(() => {
  switch (true) {
    case faseUpload.value === "none":
      return "gray";
    case faseUpload.value === "Subiendo Imagenes...":
      return "blue";
    case faseUpload.value === "Actualizando el lote...":
      return "amber";
    case faseUpload.value === "error":
      return "red";
    default:
      return "primary";
  }
});

const md = ref("");

// estas funciones son para verificar si la galeria cumple con 4 elementos si no los rellena
function crearGaleria(pictures: any) {
  if (pictures.length === 0) {
    return (pictures = [
      {
        id: "1",
        link: "i-icon-park-outline-add-picture",
        enty: true,
      },
      {
        id: "2",
        link: "i-icon-park-outline-add-picture",
        enty: true,
      },
      {
        id: "3",
        link: "i-icon-park-outline-add-picture",
        enty: true,
      },
      {
        id: "4",
        link: "i-icon-park-outline-add-picture",
        enty: true,
      },
    ]);
  } else if (pictures.length < 4) {
    return (pictures = [
      ...pictures,
      ...Array(4 - pictures.length).fill({
        link: "i-icon-park-outline-add-picture",
        enty: true,
      }),
    ]);
  }
  return pictures;
}

function verificarGaleria() {
  pictures.value = crearGaleria(pictures.value);
}

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
  const errors = []

  if (state.puntaje === '') errors.push({ path: 'puntaje', message: 'Este campo es obligatorio' })

  if (state.precio === '') errors.push({ path: 'precio', message: 'Este campo es obligatorio' })
  
  if(state.muestra.muestra && !state.muestra.muestraGratis && state.muestra.precio <= 0) errors.push({ path: 'muestra.precio', message: 'El precio tiene que ser mayor que 0' })

  if(state.muestra.muestra && !state.muestra.muestraGratis && !state.muestra.precio) errors.push({ path: 'muestra.precio', message: 'Este campo es obligatorio' })

  if(state.muestra.muestra && state.muestra.cantidad <= 0) errors.push({ path: 'muestra.cantidad', message: 'La cantidad tiene que ser mayor que 0' })

  if(state.muestra.muestra && !state.muestra.cantidad) errors.push({ path: 'muestra.cantidad', message: 'Este campo es obligatorio'})
  return errors
}


async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  loading.value = true;
  state.precio = state.precio!;
  let uploadImg;
  console.log(pictures.value)

  if (JSON.stringify(pictures.value) !== JSON.stringify(state.galeria)) {
    if (filesArray.value.length > 0) {
        console.log({uploadImg})
        uploadImg = await uploadFiles();
        if (uploadImg.status) {
          console.log({uploadImg})
          // Agregar las nuevas imágenes subidas a imgDestacadas
          pictures.value = [...pictures.value, ...uploadImg.data];
        } else {
          throw new Error(uploadImg.message);
        }
      }
  } else {
    uploadImg = { status: true };
    console.log('')
  }
  pictures.value = pictures.value.filter((objeto:any) => !objeto.enty);
  state.galeria = pictures.value;
  console.log(state.galeria)

if (uploadImg!.status) {
    try {
      // @ts-ignore

      await axios(
        // @ts-ignore
        {
          url: `${import.meta.env.VITE_URL_API
            }/api/content/item/lotes?fields={"_mby": false, "_modified": false }`,
          method: "POST",
          mode: "cors",
          headers: {
            "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
          },
          onUploadProgress: (progressEvent: any) => {
            faseUpload.value = "Actualizando el lote...";
            const progressPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            porcentaje.value = progressPercent;
          },
          data: {
            data: {
              _id: route.params.id,
              ...state,
            },
          },
        }
      )
        .then(async (res) => {
          inputFile.value = "";
          loading.value = false;
          verificarGaleria();

          const updateLoteIndice = useLotes.lotes.findIndex(
            (lote) => lote._id === route.params.id
          );

          if (updateLoteIndice !== -1) {
            useLotes.lotes[updateLoteIndice] = { ...res.data };
          }
          toast.success("Se ha editado el lote satisfactoriamente",{onClose:()=>{
            closeModalPicture()
          }});
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
    faseUpload.value = "error";
    loading.value = false;
  }

  loading.value = false;
}
</script>

<style></style>
