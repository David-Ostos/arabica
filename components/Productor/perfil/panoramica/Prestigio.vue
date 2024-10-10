<template>
  <div class="flex flex-col gap-8">

    <div>
      <div
        class="shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 px-4">
        <div class="flex justify-between  border-b pb-4">
          <h2 class="uppercase font-medium text-sm text-gray-600">equipo</h2>
          <UIcon name="i-ph-pencil-fill" class="text-primary justify-self-stretch text-xl cursor-pointer" dynamic @click="isOpenModalEquipo = true"/>
        </div>
        <div class="grid grid-cols-3 gap-2 py-4 w-full overflow-x-hidden h-[144px] overflow-y-auto">
          <div v-if="equipo && equipo.length > 0" v-for="(item, index) in equipo"
            class="flex  gap-2 col-span-1 py-2 relative w-full">
            <img :src="item.picture" alt="" class="h-10 w-10 rounded-full" />
            <div class="flex flex-col w-full">
              <span class="capitalize text-sm font-semibold text-gray-700 truncate w-full max-w-36">{{ item.nombre }} {{
                item.apellido }}</span>
              <span class="capitalize text-xs text-gray-700 truncate w-full max-w-36">{{ item.rol }}</span>
            </div>
            <div aria-hidden="true" v-if="index !== 0 && index % 3 === 0"
              class="absolute -top-1 left-0 right-0 h-[1px] w-screen bg-gray-200"></div>
          </div>
          <div v-else class="col-span-3 col-start-2 flex items-center justify-center">
            <span class="w-full text-gray-600">Ningún equipo añadido</span>
          </div>
        </div>
      </div>

      <!-- Modal de equipo -->

      

    </div>



    <div>
      <div
        class="shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 px-4">
        <div class="flex justify-between border-b pb-4">
          <h2 class="uppercase font-medium text-sm text-gray-600" >
            Certificaciones
          </h2>
          <UIcon name="i-ph-pencil-fill" class="text-primary justify-self-stretch text-xl cursor-pointer" dynamic @click="isOpenModalCertificaciones = true"/>
        </div>
        <div class="grid grid-cols-3 gap-2 w-full py-4 overflow-x-hidden h-[144px] overflow-y-auto">
          <div v-if="certificaciones && certificaciones.length > 0" v-for="(item, index) in certificaciones"
            class="flex  gap-2 col-span-1 py-2 relative w-full">
            <img :src="item.picture" alt="" class="h-10 w-10 rounded-full" />
            <div class="flex flex-col">
              <span class="capitalize text-sm font-semibold text-gray-700">{{
                item.certificacion
                }}</span>
              <span class="capitalize text-xs text-gray-700 truncate w-full max-w-36">{{ item.year }}</span>
            </div>
            <div aria-hidden="true" v-if="index !== 0 && index % 3 === 0"
              class="absolute -top-1 left-0 right-0 h-[1px] w-screen bg-gray-200"></div>
          </div>
          <div v-else class="col-span-3 col-start-2 flex items-center justify-center">
            <span class="w-full text-gray-600">No se han añadido certificados</span>
          </div>
        </div>
      </div>

      <div>
    <div>
      <UModal :ui="{
            width:'sm:max-w-2xl',

      }" v-model="isOpenModalCertificaciones">
        <UCard
          :ui="{
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            width:'sm:max-w-2xl',
          }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                Agregar Certificado
              </h3>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="isOpenModalCertificaciones = false"
              />
            </div>
          </template>

          <div class="flex justify-between items-center">
            <h1  v-if="certificaciones!.length = 0" class="text-gray-700 text-sm font-medium ">
              No hay certificados
            </h1>
            <h1  v-else-if="certificaciones!.length = 1" class="text-gray-700 text-sm font-medium ">
              {{ certificaciones!.length }} Certificado
            </h1>
            <h1 v-else class="text-gray-700 text-sm font-medium ">
              {{ certificaciones!.length }} Certificados
            </h1>
            <UButton type="button" class="w-fit self-end px-3 h-10 font-bold"
              @click="certificaciones!.push({
                certificacion: '',
                picture: '',
                year: '',
              })" >
              <UIcon
                name="i-ic-baseline-add-circle-outline"
                class="text-white text-2xl font-bold"
                dynamic
              />
              Agregr certificado
            </UButton>
          </div>
          <div >
            <ProductorPerfilModalCertificados
              v-for="item, index in certificaciones || []"
              :certificaciones="item" :index="index"
            />
          </div>

        </UCard>
      </UModal>
    </div>
  </div>
    </div>


    <div
      class="shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 px-4">
      <div class="flex justify-between border-b pb-4">
        <h2 class="uppercase font-medium text-sm text-gray-600">
          Premios
        </h2>
        <UIcon name="i-ph-pencil-fill" class="text-primary justify-self-stretch text-xl cursor-pointer" dynamic />
      </div>
      <div class="grid grid-cols-3 gap-2 w-full overflow-x-hidden py-4 h-[144px] overflow-y-auto">
        <div v-if="premios && premios.length > 0" v-for="(item, index) in premios"
          class="flex  gap-2 col-span-1 py-2 relative w-full">
          <div class="flex flex-col">
            <span class="capitalize text-sm font-semibold text-gray-700">{{
              item.nombre
              }}</span>
            <span class="capitalize text-xs text-gray-700 truncate w-full max-w-36">{{ item.year }}</span>
          </div>
          <div aria-hidden="true" v-if="index !== 0 && index % 3 === 0"
            class="absolute -top-1 left-0 right-0 h-[1px] w-screen bg-gray-200"></div>
        </div>
        <div v-else class="col-span-3 col-start-2 flex items-center justify-center">
          <span class="w-full text-gray-600">No se han añadido certificados</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
const useProductor = useProductorStore();

const isOpenModalEquipo = ref(false)
const isOpenModalPremios = ref(false)
const isOpenModalCertificaciones = ref(false)


const equipo = useProductor.perfilProductor.equipo;

const premios = useProductor.perfilProductor.premios;

const certificaciones = useProductor.perfilProductor.certificaciones;

onMounted(()=>{
console.log(certificaciones?.length)
})
const stateEquipo = reactive({

})

</script>

<style></style>
