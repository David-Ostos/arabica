<template>
 <div class="text-gray-800 my-8 border-b">
    <div>
      
      <div class="grid grid-cols-10 grid-rows-2 gap-4 relative h-full align-top mb-12">


        <div class="col-span-3 row-span-2 relative h-full">
          <UFormGroup label="Foto" name="picture" :ui="{ container :'h-full', wrapper: 'h-full'}">

            <div class="border rounded-md h-full flex items-center justify-center max-h-[138px] box-border" :class="{'border-rose-500': pictureNull}">
            <div v-if="useProductor.equipoUpdate[props.index] && useProductor.equipoUpdate[props.index].picture" class="relative flex justify-center items-center h-full w-full " >
              <img  :src="useProductor.equipoUpdate[props.index].picture" class=" h-40 w-40 object-cover rounded-md max-h-[130px]" alt="">
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
            <UInput v-model="nombreFormateado" />
          </UFormGroup>
        </div>

        <div  class="col-span-3 row-span-1 relative">
          <UFormGroup label="Apellido" name="apellido">
            <UInput v-model="apellidoFormateado" />
          </UFormGroup>
        </div>

        <div class="col-span-1 row-span-1 relative">
          <UIcon
            name="i-clarity-remove-line"
            class="text-rose-500 text-3xl absolute top-6 cursor-pointer"
            dynamic
            @click="deleteEquipo()"
          />
        </div>

        <div  class="col-span-3 row-span-1 relative">
          <UFormGroup label="Posición" name="rol">
            <UInput v-model="rolFormateado" />
          </UFormGroup>
        </div>

        
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Equipo} from "~/interfaces/PerfilProductor";
import { toast } from 'vue3-toastify';

const props = defineProps<{
  equipo?: Equipo,
  index: number
}>();

const emits = defineEmits()

const useProductor = useProductorStore()
const equipoModal = ref()
const inputImg = ref()

const pictureNull = ref(false)

onMounted(()=>{
  useProductor.equipoUpdate[props.index]._id = props.index.toString()
})


// function prueba(){
//   console.log(useProductor.equipoUpdate[props.index]);
//   console.log(useProductor.equipoUpdate);
// }

const deletePicture = ()=>{
  useProductor.equipoUpdate[props.index].picture = undefined;
} 

const fileSave = ref() , imgIntegrante = ref() ;

const clickInputFile = (event:any)=>{
  inputImg.value.click();
}

async function handleFileUpload(event: any) {
  const file = event.target.files[0]; // Tomamos solo el primer archivo

  fileSave.value = file; // Guardamos el archivo individual
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

      useProductor.equipoUpdate[props.index].picture = dataURL;
      useProductor.equipoUpdate[props.index].fileSave = fileSave.value
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

function deleteEquipo() {
  useProductor.equipoUpdate = useProductor.equipoUpdate.filter((_, i) => i !== props.index);
  toast.info('Debe "actualizar los miembros del equipo" para que se guarden los cambios.');
}

const rolFormateado = computed({
  get: () => useProductor.equipoUpdate[props.index]?.rol ?? '',
  set: (value: string) => {
    if (useProductor.equipoUpdate[props.index]) {
      useProductor.equipoUpdate[props.index].rol = value.trim().toLowerCase()
    }
    if (value !== value.toLowerCase()) {
    toast.info('El campo se va a guardar en minuscula, pero cuando se muestre en la página, las primeras letras seran en mayusculas.')
  }
  }
})

const nombreFormateado = computed({
  get: () => useProductor.equipoUpdate[props.index]?.nombre ?? '',
  set: (value: string) => {
    if (useProductor.equipoUpdate[props.index]) {
      useProductor.equipoUpdate[props.index].nombre = value.trim().toLowerCase()
    }
    if (value !== value.toLowerCase()) {
    toast.info('El campo se va a guardar en minuscula, pero cuando se muestre en la página, las primeras letras seran en mayusculas.')
  }
  }
})

const apellidoFormateado = computed({
  get: () => useProductor.equipoUpdate[props.index]?.apellido ?? '',
  set: (value: string) => {
    if (useProductor.equipoUpdate[props.index]) {
      useProductor.equipoUpdate[props.index].apellido = value.trim().toLowerCase()
    }
    if (value !== value.toLowerCase()) {
    toast.info('El campo se va a guardar en minuscula, pero cuando se muestre en la página, las primeras letras seran en mayusculas.')
  }
  }
})

</script>

<style></style>
