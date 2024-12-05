<template>
  <div class="w-full">
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <TransitionGroup name="lista-imagenes">
        <div
          v-for="(imagen, indice) in imagenes"
          :key="imagen.id"
          class="relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-move"
          :class="{'opacity-50': indiceArrastrando === indice}"
          draggable="true"
          @dragstart="iniciarArrastre($event, indice)"
          @dragover.prevent
          @dragenter.prevent
          @drop="alSoltar($event, indice)"
        >
          <img
            :src="imagen.src"
            :alt="imagen.alt"
            class="w-full h-full object-cover"
          />
          <button @click="eliminarImagen(indice)" class="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md 
        hover:bg-red-500 hover:text-white transition-colors duration-200">
            <XIcon class="w-4 h-4" />
          </button>
        </div>
      </TransitionGroup>
      <div
        class="flex flex-col items-center justify-center aspect-square rounded-lg 
        border-2 border-dashed border-gray-300 cursor-pointer 
        hover:bg-gray-50 transition-colors duration-200"
        @click="activarInputArchivo"
        @dragover.prevent
        @dragenter.prevent
        @drop="alSoltarArchivo"
      >
        <input
          type="file"
          ref="inputArchivo"
          @change="alSeleccionarArchivo"
          accept="image/*"
          multiple
          class="hidden"
        />
        <PlusIcon class="w-8 h-8 text-gray-400" />
        <span class="mt-2 text-sm text-gray-500">Agregar Imagen</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XIcon, PlusIcon } from "lucide-vue-next";

interface Imagen {
  id: string;
  src: string;
  alt: string;
  file: File;
}

const props = defineProps<{
  maxImagenes: number;
}>();

const emit = defineEmits(["update:imagenes"]);

const imagenes = ref<Imagen[]>([]);
const inputArchivo = ref<HTMLInputElement | null>(null);
const indiceArrastrando = ref<number | null>(null);

const activarInputArchivo = (): void => {
  if (inputArchivo.value) {
    inputArchivo.value.click();
  }
};

const alSeleccionarArchivo = (evento: Event): void => {
  const target = evento.target as HTMLInputElement;
  if (target.files) {
    agregarImagenes(target.files);
  }
};

const alSoltarArchivo = (evento: DragEvent): void => {
  evento.preventDefault();
  if (evento.dataTransfer?.files) {
    agregarImagenes(evento.dataTransfer.files);
  }
};

const agregarImagenes = (archivos: FileList): void => {
  for (
    let i = 0;
    i < archivos.length && imagenes.value.length < props.maxImagenes;
    i++
  ) {
    const archivo = archivos[i];
    if (archivo.type.startsWith("image/")) {
      const lector = new FileReader();
      lector.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          imagenes.value.push({
            id: Date.now() + i.toString(),
            src: e.target.result as string,
            alt: archivo.name,
            file: archivo  // Guardamos el archivo original
          });
          emitirActualizacion();
        }
      };
      lector.readAsDataURL(archivo);
    }
  }
};


const eliminarImagen = (indice: number): void => {
  imagenes.value.splice(indice, 1);
  emitirActualizacion();
};

const iniciarArrastre = (evento: DragEvent, indice: number): void => {
  indiceArrastrando.value = indice;
  evento.dataTransfer!.effectAllowed = "move";
  evento.dataTransfer!.setData("text/plain", indice.toString());
};

const alSoltar = (evento: DragEvent, indice: number): void => {
  const desdeIndice = parseInt(evento.dataTransfer!.getData("text/plain"), 10);
  const hacia = indice;
  const [desde] = imagenes.value.splice(desdeIndice, 1);
  imagenes.value.splice(hacia, 0, desde);
  indiceArrastrando.value = null;
  emitirActualizacion();
};

const emitirActualizacion = (): void => {
  emit("update:imagenes", imagenes.value);
};

const enviarImagenesAlBackend = async () => {
  const formData = new FormData();
  
  imagenes.value.forEach((imagen, index) => {
    formData.append(`imagen${index}`, imagen.file, imagen.alt);
  });

  try {
    const response = await fetch('/api/imagenes', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      // Aquí puedes manejar la respuesta exitosa
    } else {
      console.error('Error al enviar las imágenes');
      // Aquí puedes manejar el error
    }
  } catch (error) {
    console.error('Error de red:', error);
    // Aquí puedes manejar errores de red
  }
};
defineExpose({ enviarImagenesAlBackend });
</script>

<style scoped>
.lista-imagenes-move {
  transition: transform 0.5s ease;
}
</style>