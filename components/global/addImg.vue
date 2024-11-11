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

<script setup>
import {ref, defineEmits} from "vue";
import {XIcon, PlusIcon} from "lucide-vue-next";

const props = defineProps({
  maxImagenes: {
    type: Number,
    default: 4,
  },
});

const emit = defineEmits(["update:imagenes"]);

const imagenes = ref([]);
const inputArchivo = ref(null);
const indiceArrastrando = ref(null);

const activarInputArchivo = () => {
  inputArchivo.value.click();
};

const alSeleccionarArchivo = (evento) => {
  const archivos = evento.target.files;
  agregarImagenes(archivos);
};

const alSoltarArchivo = (evento) => {
  evento.preventDefault();
  const archivos = evento.dataTransfer.files;
  agregarImagenes(archivos);
};

const agregarImagenes = (archivos) => {
  for (
    let i = 0;
    i < archivos.length && imagenes.value.length < props.maxImagenes;
    i++
  ) {
    const archivo = archivos[i];
    if (archivo.type.startsWith("image/")) {
      const lector = new FileReader();
      lector.onload = (e) => {
        imagenes.value.push({
          id: Date.now() + i,
          src: e.target.result,
          alt: archivo.name,
        });
        emitirActualizacion();
      };
      lector.readAsDataURL(archivo);
    }
  }
};

const eliminarImagen = (indice) => {
  imagenes.value.splice(indice, 1);
  emitirActualizacion();
};

const iniciarArrastre = (evento, indice) => {
  indiceArrastrando.value = indice;
  evento.dataTransfer.effectAllowed = "move";
  evento.dataTransfer.setData("text/plain", indice);
};

const alSoltar = (evento, indice) => {
  const desdeIndice = evento.dataTransfer.getData("text/plain");
  const hacia = indice;
  const desde = imagenes.value.splice(desdeIndice, 1)[0];
  imagenes.value.splice(hacia, 0, desde);
  indiceArrastrando.value = null;
  emitirActualizacion();
};

const emitirActualizacion = () => {
  emit("update:imagenes", imagenes.value);
};
</script>

<style scoped>
.lista-imagenes-move {
  transition: transform 0.5s ease;
}
</style>
