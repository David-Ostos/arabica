<template>
 <div class="text-gray-800 my-8 border-b">
    <h1 @click="prueba()">pulsa</h1>
    <div>
      <UForm :schema="schema" :state="state" :validate="validate" class="space-y-4" @submit="onSubmit">
      <div class="grid grid-cols-9 grid-rows-2 gap-4 relative h-full align-top mb-12">


        <div class="col-span-3 row-span-2 relative h-full">
          <UFormGroup label="Foto" name="picture" :ui="{ container :'h-full', wrapper: 'h-full'}">

            <div class="border rounded-md h-full flex items-center justify-center max-h-[138px] box-border" :class="{'border-rose-500': pictureNull}">
            <div v-if="equipoModal && equipoModal.picture" class="relative flex justify-center items-center h-full w-full " >
              <img  :src="equipoModal.picture" class=" h-40 w-40 object-cover rounded-md max-h-[130px]" alt="">
              <button type="button" class="p-1 flex justify-center items-center bg-white rounded-full absolute right-1 top-1 hover:bg-gray-300" @click="deletePicture">
                <UIcon name="i-heroicons-trash" class="text-red-500" />
              </button>
            </div>
              <div v-else class="flex flex-col justify-center items-center" >
                <UIcon name="i-heroicons-photo" class="w-20 h-20 text-gray-500 "/>
                <UButton class="font-bold" color="gray" icon="i-heroicons-plus-circle" variant="outline"  @click="clickInputFile" type="button"  
                >Agregar
                <input ref="inputImg" type="file" @change="handleFileUpload" class="hidden" />
                </UButton>
              </div>
            </div>
          
          </UFormGroup>
        </div>

        <div class="col-span-3 row-span-1 relative">
          <UFormGroup label="Nombre" name="nombre">
            <UInput v-model="state.nombre" />
          </UFormGroup>
        </div>

        <div class="col-span-3 row-span-1 relative">
          <UFormGroup label="Apellido" name="apellido">
            <UInput v-model="state.apellido" />
          </UFormGroup>
        </div>


        <div class="col-span-3 row-span-1 relative">
          <UFormGroup label="Posición" name="rol">
            <UInput v-model="state.rol" />
          </UFormGroup>
        </div>

        <UButton :loading="loading" icon="i-heroicons-plus-circle" variant="outline" class="col-span-3 row-span-1 col-end-10 w-fit h-fit relative top-6 left-0 font-bold" type="submit" dynamic  >Guardar</UButton>

        <UProgress :value="porcentaje" :color="color" class="col-span-9 mt-2" :class="{'hidden': !progreso}">
              <template #indicator="{percent}">
                <div
                  class="text-right"
                  :style="{width: `${percent < 10 && faseUpload !== 'none' ? percent + 15: percent}%`}"
                >
                  <span v-if="faseUpload === 'none'" class="text-gray-500 w-fit"
                    >Esperando...</span
                  >
                  <span
                    v-else-if="faseUpload === 'Subiendo Imagen...'"
                    class="text-blue-500 w-fit"
                    >{{ faseUpload }}</span
                  >
                  <span
                    v-else-if="faseUpload === 'Actualizando datos...'"
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
import { object, string, type InferType } from 'yup'
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { Equipo} from "~/interfaces/PerfilProductor";
import { toast } from 'vue3-toastify';
import axios from 'axios';

const props = defineProps<{
  equipo?: Equipo,
  index: number
}>();

defineEmits({

})


const useProductor = useProductorStore()
const equipoModal = ref()
const inputImg = ref()
const loading = ref(false)

const pictureNull = ref(false)
const progreso = ref(false)
const equipoCopia = ref()

onMounted(()=>{
  equipoModal.value = props.equipo;
  console.log(equipoModal.value);
  equipoModal.value._id = props.index.toString()
  equipoCopia.value = props.equipo
  
})

function prueba(){
  console.log();
  console.log(state);
}

const schema = object({
  nombre: string().required('Requerido'),
  apellido: string().required('Requerido'),
  picture: string().required('Requerido'),
  rol: string().required('Requerido'),
})

type Schema = InferType<typeof schema>

const state = reactive<Equipo>({
  _id: equipoModal.value?._id ?? props.index.toString(),
  nombre: props.equipo?.nombre ?? undefined,
  apellido: props.equipo?.apellido ?? undefined,
  picture: props.equipo?.picture ?? undefined,
  rol: props.equipo?.rol ?? undefined,
})
 

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.picture) {
    errors.push({ path: 'picture', message: 'La foto es requerida' })
    pictureNull.value = true;
  }else{
    pictureNull.value = false;
  }
  return errors
}

const deletePicture = ()=>{
  equipoModal.value.picture = undefined;
  state.picture = undefined
} 

const fileSave = ref() , imgIntegrante = ref() ;
const faseUpload = ref(
  "none" as
    | "none"
    | "Subiendo Imagen..."
    | "Actualizando datos..."
    | "Subida Completada"
    | "error"
);
const color = computed(() => {
  switch (true) {
    case faseUpload.value === "none":
      return "gray";
    case faseUpload.value === "Subiendo Imagen...":
      return "blue";
    case faseUpload.value === "Actualizando datos...":
      return "orange";
    case faseUpload.value === "error":
      return "red";
    default:
      return "primary";
  }
});

const porcentaje = ref(0);


const clickInputFile = (event:any)=>{
  inputImg.value.click();
}

async function handleFileUpload(event: any) {
  const file = event.target.files[0]; // Tomamos solo el primer archivo

  fileSave.value = file; // Guardamos el archivo individual
   fileSave.value
  imgIntegrante.value = null; // Inicializamos imgIntegrante como null

  const archivosPermitidos = [
    "image/gif",
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/webp",
    "image/*",
  ];

  if (file && archivosPermitidos.includes(file.type)) {
    const reader = new FileReader();

    try {
      const dataURL = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      equipoModal.value.picture = dataURL;
      state.picture = dataURL;
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      toast.error("Hubo un error al cargar la imagen. Por favor, intenta de nuevo.");
    }
  } else {
    toast.error(
      "Solo se aceptan archivos de formato .gif, .png, .jpg, .jpeg, webp"
    );
  }
}

/* async function UploadFiles(file: any) {
  let status;
  console.log(file);
  if (file) {
    const formData = new FormData();
    formData.append("files[]", file);
    

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
            faseUpload.value = "Subiendo Imagen...";
            const progressPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            porcentaje.value = progressPercent;
            // Actualiza tu interfaz con el porcentaje de progreso
          },
        }
      )
        .then((res) => {
          console.log(res.data);
          state.picture = `https://cockpit.arabicagc.com/storage/uploads${res.data.assets[0].path}`
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

async function addIntegranteEquipo(equipo: any){
  console.log(equipo);

  const equipoCompleto = useProductor.perfilProductor.equipo ?? []
  console.log(equipoCompleto);
  equipoCompleto?.push(equipo)
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
          data: {data:{ _id: useProductor.perfilProductor._id, equipo: equipoCompleto} },
          onUploadProgress: (progressEvent) => {
            console.log(progressEvent);
            faseUpload.value = "Actualizando datos...";
            const progressPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            porcentaje.value = progressPercent;
            // Actualiza tu interfaz con el porcentaje de progreso
          },
        }
      )
      .then((res) =>{
        console.log(res);
        faseUpload.value = 'Subida Completada'
      })
  } catch (error) {
    console.log(error);
    throw error
  }

  return true
} */

async function onSubmit (event: FormSubmitEvent<Schema>) {
  console.log(event.data);
  console.log(useProductor.equipoUpdate);
  /* @ts-ignore */
  useProductor.equipoUpdate.push({...event.data, picture: fileSave.value});
  console.log(useProductor.equipoUpdate);
}

/* async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(equipoCopia.value);
  console.log(event.data);
  if(!equipoCopia.value || equipoCopia.value !== event.data){
    console.log(equipoCopia.value)
    loading.value = true
    progreso.value = true
    // {status: true} 
    const status =  await UploadFiles(fileSave.value)
    if (status!.status) {
      loading.value = false
      const addStatus = await addIntegranteEquipo(event.data)
      if (addStatus) {
        toast.success('Se ha actualizado el integrante correctamente')
        useProductor.perfilProductor.equipo?.push(event.data)
      } else {
        toast.error('Hubo un error al actualizar el integrante')
      }
    }
    loading.value = false
    return;
  }else{
    toast.warning('Los datos son iguales, no se han actualizado')
    progreso.value = false
    loading.value = false
    return
  }
} */


/**
 *
  export type Equipo = {
  _id?: string;
  nombre?: string;
  apellido?: string;
  rol?: string;
  picture?: string;
}
 * 
 */


</script>

<style></style>
