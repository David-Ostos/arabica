<template>
  <div>
    <div
      class=" shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md px-5 py-5 h-[287px] ">
      <div class="flex justify-between mb-4 ">
        <h3 class="capitalize font-medium text-xl ">Imagenes Destacadas</h3>
        <UIcon @click="isOpenModal = true" name="i-ph-pencil-fill" class="text-primary justify-self-stretch text-xl cursor-pointer" dynamic />
      </div>
      <div class="flex items-center  overflow-auto gap-4">
          <div v-for="img in imgDestacadas" class="border p-4 h-[186px] w-full min-w-[120px] flex justify-center items-center">
            <img v-if="img.link !== 'i-icon-park-outline-add-picture'" :src="img.link" alt="" class="border w-auto  object-cover" />
            <UIcon v-if="img.link === 'i-icon-park-outline-add-picture'" name="i-heroicons-photo" class="text-4xl text-secundary" dynamic />
          </div>
      </div>
    </div>

    <div>
      <UModal
            :ui="{
              width: 'sm:max-w-2xl',
            }"
            prevent-close
            v-model="isOpenModal"
          >
            <UCard
              :ui="{
                ring: '',
                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                width: 'sm:max-w-2xl',
              }"
            >
              <template #header>
                <div class="flex items-center justify-between">
                  <h3
                    class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                  >
                    Agregar Premios
                  </h3>
                  <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-x-mark-20-solid"
                    class="-my-1"
                    @click="closeModal"
                  />
                </div>
              </template>

              <div>
                <div class="flex justify-between items-center">
                  <h1
                    v-if="imgDestacadas!.length === 0"
                    class="text-gray-700 text-sm font-medium"
                  >
                    No hay imagenes agregadas
                  </h1>
                  <h1
                    @click=""
                    v-else-if="imgDestacadas!.length === 1"
                    class="text-gray-700 text-sm font-medium"
                  >
                    1 imagen
                  </h1>
                  <h1 v-else class="text-gray-700 text-sm font-medium">
                    {{ imgDestacadas!.length }} imagenes
                  </h1>
                  
                </div>
                <div>
                  <!-- // todo -->
                </div>
                <UButton
                  type="button"
                  :loading="loading"
                  class="w-fit self-end px-3 h-10 font-bold"
                  @click="onSumit"
                >
                  <UIcon
                    name="i-ic-baseline-add-circle-outline"
                    class="text-white text-2xl font-bold"
                    dynamic
                  />
                  Actualizar los premios
                </UButton>
              </div>
            </UCard>
          </UModal>
    </div>

  </div>
</template>

<script lang="ts" setup>
import type { ImgDestacadas } from '../../../../interfaces/PerfilProductor';
const useProductor = useProductorStore()

const imgDestacadas = ref([] as ImgDestacadas[])
const isOpenModal = ref(false)
const loading = ref(false)
const prueba = ref([]as any)

onMounted(()=>{
  verificarGaleria()
})

const closeModal = ()=>{
  isOpenModal.value = false
}

function crearGaleria(pictures: ImgDestacadas[]) {
  pictures = useProductor.perfilProductor.imgDestacadas ?? []
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
    let count = pictures.length
    return (pictures = [
      ...pictures,
      ...Array(4 - pictures.length).fill({
        link: "i-icon-park-outline-add-picture",
        position: count++,
      }),
    ]);
  }
  console.log(pictures);
  return pictures;
}

function verificarGaleria() {
  imgDestacadas.value = crearGaleria(imgDestacadas.value);
}

const images = ref([]);

const onFileChange = (event:any) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = (e) => {
      prueba.value.push({ ...imgDestacadas.value,  link: e.target!.result });
      console.log(prueba.value);
    };
    reader.readAsDataURL(files[i]);
  }
};


async function onSumit(){

}



</script>

<style></style>