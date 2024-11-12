<template>
  <div>
    <div
      class="shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md px-5 py-5 h-[287px]">
      <div class="flex justify-between mb-4">
        <h3 class="capitalize font-medium text-xl">Imagenes Destacadas</h3>
        <UIcon @click="openModal" name="i-ph-pencil-fill"
          class="text-primary justify-self-stretch text-xl cursor-pointer" dynamic />
      </div>
      <div class="flex items-center overflow-auto gap-4">
        <!-- <div v-if="imgDestacadas.length > 0" v-for="img in imgDestacadas" :key="img._id" class="rounded-md h-[186px] w-full min-w-[120px] flex justify-center items-center">
          <img :src="img.link" alt="" class="border rounded-md h-full object-cover" />
        </div> -->

        <UCarousel v-if="imgDestacadas.length > 0" 
          ref="carouselRef"
          v-slot="{ item }" :items="imgDestacadas" 
          :ui="{ item: 'basis-full h-[144px] md:basis-1/2 lg:basis-1/3', container: ' h-[200px]' }" 
          class="rounded-lg  overflow-hidden" 
          arrows
          indicators 
          :prev-button="{
            color: 'gray',
            icon: 'i-heroicons-arrow-left-20-solid',
            class: 'start-12 top-[90%]'
          }" 
          :next-button="{
            color: 'gray',
            icon: 'i-heroicons-arrow-right-20-solid',
            class: 'end-12 top-[90%]'
          }" 
        >
          <img @click="useShowModals.productorMuestraImg = true" :src="item.link"
            class="border rounded-md h-full object-cover cursor-pointer" draggable="true" 
          />

        </UCarousel>
        <!-- Modal de muestra -->
        <ProductorPerfilModalImgMuestraImg :image="imgDestacadas" />
        <!-- /Modal de muestra -->

        <!--         <UCarousel v-if="imgDestacadas.length === 0" v-slot="{ item }" :items="imgRelleno"
          :ui="{ container: 'h-[186px] w-full min-w-[120px] gap-4 ' }" arrows 
          :prev-button="{
          color: 'gray',
          icon: 'i-heroicons-arrow-left-20-solid',
          class: 'start-12 top-full '
          }"
          :next-button="{
            color: 'gray',
            icon: 'i-heroicons-arrow-right-20-solid',
            class: 'end-12 top-full'
          }" >
          <div class="border p-4 h-[186px] w-full min-w-[120px]  flex justify-center items-center bo" draggable="true">
            <UIcon :name="item.link!" class="text-4xl text-secundary" dynamic />

          </div>

        </UCarousel> -->

        <div v-if="imgDestacadas.length === 0" v-for="img in imgRelleno" :key="img._id"
          class="border p-4 h-[186px] w-full min-w-[120px] flex justify-center items-center">
          <UIcon :name="img.link!" class="text-4xl text-secundary" dynamic />
        </div>
      </div>
    </div>

    <!-- Modal para agregar y eliminar imagenes -->
    <UModal :ui="{ width: 'sm:max-w-[900px]' }" prevent-close v-model="isOpenModal">
      <UCard :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        width: 'sm:max-w-2xl',
      }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 @click="
              console.log(imgDestacadas);
            console.log(uploadedFiles);
            " class="text-base font-semibold text-gray-900 dark:-text-dar">
              Agregar Imagenes destacadas
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="closeModal" />
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
            <div v-for="(item, index) in displayedImages" :key="item._id" class="rounded-md gap-2 col-span-1">
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
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import { toast } from "vue3-toastify";
import axios from "axios";
import type { ImgDestacadas } from "../../../../interfaces/PerfilProductor";
import { useFileUpload } from "~/composables/useFileUpload";

const useProductor = useProductorStore();
const useShowModals = useShowModalsStore();

const imgDestacadas = ref<ImgDestacadas[]>([]);
const isOpenModal = ref(false);
const loading = ref(false);
const imgRelleno = ref<ImgDestacadas[]>([]);
const inputImg = ref();
const openModalMuestra = ref(false);

const backupImages = ref<ImgDestacadas[]>([]);
const carouselRef = ref()
const { uploadedFiles, handleFileUpload, removeFile, filesArray, uploadFiles } =
  useFileUpload();

const displayedImages = computed(() => {
  return [...imgDestacadas.value, ...uploadedFiles.value];
});

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 3000)
})

onMounted(() => {
  // Asumiendo que las imágenes destacadas se cargan desde el store del productor
  imgDestacadas.value = useProductor.perfilProductor.imgDestacadas || [];
  console.log(imgDestacadas.value);
  if (imgDestacadas.value.length === 0) {
    imgRelleno.value = crearGaleria();
  }
  backupImages.value = JSON.parse(JSON.stringify(imgDestacadas.value));
});

function crearGaleria(): ImgDestacadas[] {
  return [
    { _id: "1", link: "i-icon-park-outline-add-picture", position: 1 },
    { _id: "2", link: "i-icon-park-outline-add-picture", position: 2 },
    { _id: "3", link: "i-icon-park-outline-add-picture", position: 3 },
    { _id: "4", link: "i-icon-park-outline-add-picture", position: 4 },
  ];
}

const openModal = () => {
  isOpenModal.value = true;

  backupImages.value = JSON.parse(JSON.stringify(imgDestacadas.value));
  // Resetear uploadedFiles al abrir el modal
  uploadedFiles.value = [];
};

// ... (las importaciones y el código anterior permanecen sin cambios) ...

const selectedImage = ref('')
const isImageModalOpen = ref(false)

// ... (el resto del código existente permanece sin cambios) ...

const openImageModal = (imageUrl: string) => {
  selectedImage.value = imageUrl
  isImageModalOpen.value = true
}

const closeImageModal = () => {
  isImageModalOpen.value = false
}


const clickInputFile = () => {
  inputImg.value.click();
};

const closeModal = () => {
  isOpenModal.value = false;
  imgDestacadas.value = JSON.parse(JSON.stringify(backupImages.value));
  // Descartar cambios no guardados
  uploadedFiles.value = [];
};
const removeImage = (index: number) => {
  if (index < imgDestacadas.value.length) {
    // Es una imagen existente
    imgDestacadas.value.splice(index, 1);
  } else {
    // Es una imagen nueva
    removeFile(index - imgDestacadas.value.length);
  }
};

async function UpServerImg(imgs: ImgDestacadas[]): Promise<any> {
  try {
    // @ts-ignore
    const response = await axios(
      // @ts-ignore
      {
        url: `${import.meta.env.VITE_URL_API}/api/content/item/productores`,
        method: "POST",
        mode: "cors",
        headers: {
          "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
        },
        data: {
          data: {
            _id: useProductor.perfilProductor._id,
            imgDestacadas: imgs,
          },
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
console.log(useProductor.perfilProductor._id);
async function onSubmit() {
  loading.value = true;
  try {
    // Subir nuevas imágenes
    if (filesArray.value.length > 0) {
      const uploadResult = await uploadFiles();
      if (uploadResult.status) {
        // Agregar las nuevas imágenes subidas a imgDestacadas
        imgDestacadas.value = [...imgDestacadas.value, ...uploadResult.data];
      } else {
        throw new Error(uploadResult.message);
      }
    }

    // Actualizar el store con las imágenes actualizadas
    const responseUpdateImgServer = await UpServerImg(imgDestacadas.value);
    console.log(responseUpdateImgServer);
    useProductor.imgDestacadaUpdate = imgDestacadas.value;
    useProductor.perfilProductor.imgDestacadas = imgDestacadas.value;
    backupImages.value = JSON.parse(JSON.stringify(imgDestacadas.value));

    toast.success("Imágenes destacadas actualizadas con éxito");
    closeModal();
  } catch (error) {
    console.error("Error al actualizar imágenes:", error);
    toast.error("Error al actualizar las imágenes destacadas");
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
