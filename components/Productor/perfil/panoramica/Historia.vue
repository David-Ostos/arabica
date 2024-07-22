import { PerfilProductor } from '../../../../interfaces/PerfilProductor';
<template>
  <div class="w-1/2">
        <div
          class="flex gap-1 items-center justify-between shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-full py-2 px-3 "
        >
          <div>
            <p>
              Historia de
              <b class="text-primary">{{ useProductor.perfilProductor.nombre }}</b>
            </p>
          </div>
          <UIcon
            name="i-ph-pencil-fill"
            class="cursor-pointer text-primary self-stretch text-xl p-1 box-content"
            dynamic
            @click=""
          />
        </div>
        <div class="mb-4 mt-8">
          <UTextarea
            :ui="{
              base: 'disabled:cursor-text h-[478px]'
            }"
            class="shadow-md"
            size="sm"
            disabled
            color="gray"
            variant="outline"
            placeholder="Todavia no haz proporcionado tu descripción..."
            :model-value="useProductor.perfilProductor.descripcion"
          />
        </div>
        <div>
          <div class=" shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md px-5 py-5 h-[287px] ">
            <div class="flex justify-between mb-4 ">
              <h3 class="capitalize font-medium text-xl ">Imagenes Destacadas</h3>
              <UIcon
                name="i-ph-pencil-fill"
                class="text-primary justify-self-stretch text-xl cursor-pointer"
                dynamic
              />
          </div>
            <div class="flex items-center justify-center gap-4">
              <div v-for="img in imgDestacadas" class="border p-4 h-[186px] w-full flex  justify-center items-center">
                <img v-if="img !== ''" :src="img" alt="" class="border  w-auto object-cover"/>
                <UIcon v-if="img === ''" name="i-heroicons-photo" class="text-4xl text-secundary" dynamic />
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script lang="ts" setup>
const useUser = useUserStore();
const useProductor = useProductorStore()

const imgDestacadas = [
  '',
  '',
  '',
]

</script>

<style>

</style>