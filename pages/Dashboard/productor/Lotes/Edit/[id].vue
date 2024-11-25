<template>

  <UModal v-model="isOpenModalPicture" :ui="{ container: 'items-center' }" prevent-close>

    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:-text-dar capitalize">
            Vista de imagen
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="closeModalPicture" />
        </div>
      </template>

      <div>
        <img :src="pictureModal" class="w-full h-full" />
      </div>

    </UCard>

  </UModal>

  <div class="mx-4 my-8 md:m-20">
    <div class="overflow-auto">
      <h1 class="text-center text-3xl text-gray-700 font-bold pt-4">
        Edite su Lote de Café
      </h1>
      <h3 class="text-2xl mb-8 text-gray-600 text-center md:text-start">Agrega las imagenes</h3>
      <div class="md:grid grid-cols-2 gap-8">
        <!-- Galerria -->
        <div
          class="col-span-1 grid-area-1 h-[510px] h-ful shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-xl p-4">
          <div class="grid grid-cols-4 col-span-2 grid-rows-4 gap-4 h-full">
            <div v-if="loading"
              class="row-span-2 col-span-4 flex justify-center items-center border rounded-xl cursor-pointer overflow-hidden brightness-75 bg-gray-100 opacity-55">
              <l-squircle size="37" stroke="5" stroke-length="0.15" bg-opacity="0.1" speed="0.9"
                color="black"></l-squircle>
            </div>

            <div v-show="!loading"
              class="row-span-2 col-span-4 rounded-xl cursor-pointer overflow-hidden hover:brightness-75" :class="!pictures[0].enty
                  ? 'flex justify-center items-center h-full w-full '
                  : 'hover:bg-gray-100 border'
                " @click="">
              <img v-if="!pictures[0].enty" @click="openModalPicture(pictures[0].link)" :src="pictures[0].link" class="rounded-xl h-full w-full object-cover"
                alt="" />
              <UIcon v-else name="i-icon-park-outline-add-picture" class="h-full w-full opacity-55 hover:scale-105"
                dynamic />
            </div>

            <div class="flex justify-around items-center row-span-2 gap-4 col-span-4 h-full w-full">
              <div v-for="img in pictures.slice(1) "
                class="h-full w-full flex items-center justify-center cursor-pointer overflow-hidden hover:brightness-75 hover:bg-gray-100 rounded-xl">
                <div v-if="loading"
                  class="flex justify-center items-center border rounded-xl w-full h-full brightness-75 bg-gray-100 opacity-55">
                  <l-squircle size="37" stroke="5" stroke-length="0.15" bg-opacity="0.1" speed="0.9"
                    color="black"></l-squircle>
                </div>
                <div v-show="!loading" v-if="img.enty === true" class="">
                  <UIcon :name="img.link" class="rounded-xl h-28 w-full object-cover opacity-55" alt="" dynamic />
                </div>
                <div v-show="!loading" v-else class="rounded-xl">
                  <img @click="openModalPicture(img.link)" :src="img.link" class="rounded-xl h-72 w-full object-cover" alt="" />
                </div>
              </div>

            </div>
            <!-- barrar de carga -->

            <UProgress :value="porcentaje" :color="color" class="col-span-4 animate-pulse">
              <template #indicator="{ percent }">
                <div class="text-right" :style="{ width: `${percent}%` }">
                  <span v-if="faseUpload === 'none'" class="text-gray-500 w-fit">Esperando...</span>
                  <span v-else-if="faseUpload === 'Subiendo Imagenes...'" class="text-blue-500 w-fit">{{ faseUpload
                    }}</span>
                  <span v-else-if="faseUpload === 'Actualizando el lote...'" class="text-amber-500 w-fit">{{ faseUpload
                    }}</span>

                  <span v-else-if="faseUpload === 'Subida Completada'" class="text-primary-500">✔ Subida
                    completada.</span>
                  <span v-else-if="faseUpload === 'error'" class="text-red-500 font-bold">X Hubo un error.</span>
                </div>
              </template>
            </UProgress>
            <!-- /barra de carga -->
          </div>
        </div>
        <!-- /Galeria -->

        <!-- Formulario -->
        <div
          class="flex flex-col w-full p-4 rounded-xl border justify-between h-ful shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400">
          <UForm :schema="schema" :state="state" @submit="onSubmit" class="grid grid-cols-6 gap-4">
            <UFormGroup label="Nombre" name="nombre" class="col-span-6 md:col-span-3">
              <UInput v-model="state.nombre" />
            </UFormGroup>

            <UFormGroup label="Sube tus imagenes" name="galeria" class="col-span-3">
              <!-- @ts-ignore -->
              <UInput type="file" icon="i-heroicons-folder" multiple accept="image/*" max="4" v-model="inputFile"
                @change="handleFileUpload" />
            </UFormGroup>
            
            <UFormGroup label="Precio" name="precio" class="col-span-3">
              <UInput v-model="state.precio" />
            </UFormGroup>

            <UFormGroup label="Origen" name="origen" class="col-span-3">
              <USelectMenu :ui="{ select: 'capitalize' }" searchable searchable-placeholder="Buscar origen..."
                class="w-full capitalize" placeholder="Selecciona el origen" :options="['chavin', 'moche', 'nasca']"
                v-model="state.origen" />
            </UFormGroup>

            <UFormGroup label="Departamento" name="departamento" class="col-span-3">
              <USelectMenu :ui="{ select: 'capitalize' }" searchable searchable-placeholder="Buscar departamento..."
                class="w-full capitalize" placeholder="Selecciona el departamento" :options="[
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
                ]" v-model="state.departamento" />
            </UFormGroup>



            <UFormGroup label="Proceso" name="proceso" class="col-span-6 md:col-span-3">
              <USelectMenu :ui="{ select: 'capitalize' }" searchable searchable-placeholder="Buscar proceso..."
                class="w-full capitalize" placeholder="Selecciona el proceso" :options="[
                  'sueves washing',
                  'anaerobic washing',
                  'honey',
                  'prolonged fermentation',
                  'natural',
                  'natural anaerobic',
                  'experimental',
                ]" v-model="state.proceso" />
            </UFormGroup>

            <UFormGroup label="Cantidad del lote" name="cantidadLote" class="col-span-6 md:col-span-3">
              <USelectMenu :ui="{ select: 'capitalize' }" searchable
                searchable-placeholder="Buscar la cantidad del lote...." class="w-full capitalize"
                placeholder="Selecciona la cantidad del lote" :options="[
                  'lotes completos',
                  'micro lote (5pp - 20qq)',
                  'nano lote',
                ]" v-model="state.cantidadLote" />
            </UFormGroup>

            <UFormGroup label="Variedad" name="variedad" class="col-span-3">
              <USelectMenu :ui="{ select: 'capitalize' }" searchable searchable-placeholder="Buscar variedad..."
                class="w-full capitalize" placeholder="Selecciona el variedad" :options="[
                  'geisha',
                  'typical',
                  'bourbon',
                  'maragogipe',
                  'pacamara',
                  'caturra',
                  'catui',
                  'tabi',
                  'new world',
                  'costa rica',
                  'castilla',
                  'catimor',
                  'otros',
                ]" v-model="state.variedad" />
            </UFormGroup>

            <UFormGroup label="Puntaje" name="puntaje" class="col-span-3">
              <USelectMenu :ui="{ select: 'capitalize' }" searchable searchable-placeholder="Buscar puntaje..."
                class="w-full capitalize" placeholder="Selecciona el puntaje" :options="['80-90+', '70-80+', '60-70+']"
                v-model="state.puntaje" />
            </UFormGroup>

            <UFormGroup label="Perfil" name="perfil" class="col-span-3">
              <USelectMenu :ui="{ select: 'capitalize' }" searchable searchable-placeholder="Buscar perfil..."
                class="w-full capitalize" placeholder="Selecciona el perfil" :options="[
                  'floral',
                  'fruit tree',
                  'vegetable',
                  'citrus o sweet',
                  'caramelized sugars',
                  'dried fruit',
                  'pecan / chocolate',
                  'clean cup',
                ]" v-model="state.perfil" />
            </UFormGroup>



            <UFormGroup label="País" name="pais" class="col-span-3">
              <USelectMenu :ui="{ select: 'capitalize' }" searchable searchable-placeholder="Buscar País..."
                class="w-full capitalize" placeholder="Selecciona el País" :options="['peru']" v-model="state.pais" />
            </UFormGroup>

            <UFormGroup
              label="¿Este lote Tiene muestra? "
              name="muestra.muestra"
              class="md:col-span-3 col-span-6"
              >
              <UToggle
              v-model="muestra"
              on-icon="i-heroicons-check-20-solid"
              off-icon="i-heroicons-x-mark-20-solid"
              />
            </UFormGroup>

            <div v-if="state.muestra?.muestra" class="col-span-6 grid grid-cols-6 gap-4"> 


              <UFormGroup
              label="¿Este lote Tiene muestra gratis? "
              name="muestra.muestraGratis"
              class="col-span-6 md:col-span-2"
              >
              <UToggle
              v-model="muestraGratis"
              on-icon="i-heroicons-check-20-solid"
              off-icon="i-heroicons-x-mark-20-solid"
              />
            </UFormGroup>

            <UFormGroup v-if="!state.muestra.muestraGratis" label="Precio" name="muestra.precio" class="col-span-3 md:col-span-2">
              <UInput v-model="state.muestra.precio" type="number" placeholder="5"> 
                <template #leading>
                  <span class="text-gray-500 dark:text-gray-400">$</span>
                </template>
              </UInput>
            </UFormGroup>

            <UFormGroup label="Cantidad" name="muestra.precio" class="col-span-3 md:col-span-2">
              <UInput v-model="state.muestra.cantidad" type="number" placeholder="1"> 
                <template #leading>
                  <span class="text-gray-500 dark:text-gray-400">lb/</span>
                </template>
              </UInput>
            </UFormGroup>

            </div>
            <UButton size="xl" :padded="true" type="submit" :loading="loading" :ui="{
              inline: 'inline-block flex item-center justify-center',
            }" class="col-start-2 text-center col-span-4">
              Editar Lote</UButton>
          </UForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { boolean, object, string, number, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import type { Galeria, Lotes } from "~/interfaces/Lotes";
import { squircle } from "ldrs";
import { toast } from "vue3-toastify";

type Schema = InferType<typeof schema>;

squircle.register();


definePageMeta({
  middleware: "productor",
  layout: "productor",
});

const useProductor = useProductorStore();
const useLotes = useLotesStore();
const route = useRoute();


const lote = useLotes.lotes.filter((lote) => lote._id === route.params.id)[0];

const isOpenModalPicture = ref(false)
const pictureModal = ref('')

const openModalPicture = (picture: string ) => {
  console.log(picture);
  pictureModal.value  = picture
  isOpenModalPicture.value = true
}
const closeModalPicture = ()=>{
  pictureModal.value = ''
  isOpenModalPicture.value = false

}

const state: Lotes = reactive({
  nombre: lote.nombre,
  origen: lote.origen,
  departamento: lote.departamento,
  variedad: lote.variedad,
  proceso: lote.proceso,
  puntaje: lote.puntaje,
  perfil: lote.perfil,
  cantidadLote: lote.cantidadLote,
  pais: lote.pais,
  precio: lote.precio,
  certificaciones: lote.certificaciones,
  descripcion: lote.descripcion,
  galeria: lote.galeria,
  productor: lote.productor,
  muestra: lote.muestra
});

const muestra = ref(state.muestra?.muestra)
const muestraGratis = ref(state.muestra?.muestraGratis)

watch(muestraGratis, (nuevoValor) => {
  state.muestra!.muestraGratis = nuevoValor
});

watch(muestra, (nuevoValor) => {
  state.muestra!.muestra = nuevoValor
});

const pictures = ref(state.galeria as any);
const loading = ref(false);
const inputFile = ref();
const filesSave = ref();
const lotes = useProductor.lotes;
verificarGaleria();

const porcentaje = ref(0);

const faseUpload = ref(
  "none" as
  | "none"
  | "Subiendo Imagenes..."
  | "Actualizando el lote..."
  | "Subida Completada"
  | "error"
);

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
  nombre: string().required("Este campo es requerido"),
  origen: string().required("Este campo es requerido"),
  departamento: string().required("Este campo es requerido"),
  variedad: string().required("Este campo es requerido"),
  proceso: string().required("Este campo es requerido"),
  puntaje: string().required("Este campo es requerido"),
  perfil: string().required("Este campo es requerido"),
  cantidadLote: string().required("Este campo es requerido"),
  pais: string().required("Este campo es requerido"),
  precio: number().positive().required("Este campo es requerido"),
  pruebaGratis: boolean(),
});

// funcion para agegar las imagenes a la galeria para que el usuario las visualice antes de subirlas
async function handleFileUpload(event: any) {
  filesSave.value = event;
  const files = [...event];


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
            resolve({ id: i, link: dataURL, enty: false });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        imagePromises.push(imagePromise);
      }

      // Espera a que todas las promesas se resuelvan (imágenes cargadas)
      const imagesData = await Promise.all(imagePromises);
      pictures.value = imagesData;
      toast.success(
        "Imagenes preparadas para subir"
      );
      state.galeria = []
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
  verificarGaleria();
}

// funcion para subir las imagenes 
async function UploadFiles(files: any) {
  if (files) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files[]", files[i]);
    }

    try {
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
          onUploadProgress: (progressEvent: any) => {
            faseUpload.value = "Subiendo Imagenes...";
            const progressPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            porcentaje.value = progressPercent;
            // Actualiza tu interfaz con el porcentaje de progreso
          },
          data: formData,
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
          return { status: true, tipo: "success" };
        })
        .catch((e) => {
          console.log(e);
          if (e.code === "ERR_NETWORK") {
            toast.info("Problemas en la conexion intente mas tarde.");
            return { status: false, tipo: "otros" };
          }
          return { status: false, tipo: "error" };
        });
      return { status: true };
    } catch (e) {
      console.log(e);
      return { status: false, tipo: "error" };
    }
  } else {
    toast.error("No hay imagenes para subir.");
    return { status: false, tipo: "otros" };
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  loading.value = true;
  state.precio = +state.precio!;
  let uploadImg;
  if (state.galeria !== lote.galeria) {
    uploadImg = await UploadFiles(filesSave.value);
  } else {
    uploadImg = { status: true };
  }
  if (uploadImg.status) {
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
          toast.success("Se ha editado el lote satisfactoriamente");
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
    if (uploadImg.tipo === "otros") {
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

<style></style>
