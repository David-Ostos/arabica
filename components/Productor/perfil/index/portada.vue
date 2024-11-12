<template>
  <div
    class="relative shadow-xl rounded-3xl"
    :class="!useUser.dataUser.verificado ? '-mt-2 z-0 block' : ''"
  >
    <div class="overflow-hidden rounded-b-3xl md:h-[400px]  object-center transition-all duration-700">
      <USkeleton v-show="loadingImg" class="w-full h-full transition-all duration-700" :ui="{
								background: 'bg-secundary'
							}" />
      <img
        @click="isOpen = true"
        :src="
          !useProductor.perfilProductor.imgPortada
            ? portada
            : useProductor.perfilProductor.imgPortada
        "
        alt="Imagen portada"
        height="400"
        @load="loadingImg = false"
        class="md:h-[400px] w-full object-cover object-center rounded-b-3xl cursor-pointer hover:brightness-75 transition-all duration-1000"
      />
    </div>
    <div class=" hidden absolute bottom-5 right-10 rounded-full py-1 px-4 cursor-pointer bg-white md:flex justify-center items-center gap-2 hover:bg-slate-200 
      hover:scale-105 transition-all duration-300"
      @click="isOpenModalEdit = true"
    >
      <UIcon name="i-heroicons-camera-solid" class="sm:text-lg" />
      <span class="text-sm sm:text-base">Editar foto de portada</span>
    </div>
  </div>


  <!-- modal de visualizacion de imagen de portada -->
  <div>
    <UModal
      v-model="isOpen"
      :ui="{
        width: 'sm:max-w-fit',
        container: 'items-center'
      }"
    >
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Imagen de portada
            </h3>
            <div class="flex gap-2 items-center">
              <UTooltip text="Editar foto del perfil" :shortcuts="['⌘', 'O']">
                <UIcon name="i-ph-pencil-fill" class="-my-1" @click="" dynamic />
              </UTooltip>
  
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
            </div>           
          </div>
        </template>

        <div>
          <img
          :src="
            !useProductor.perfilProductor.imgPortada ? portada
              : useProductor.perfilProductor.imgPortada
          "
          class="max-h-[600px] object-contain rounded-3xl shadow-xl"
          alt=""
        />
        </div>
      </UCard>

    </UModal>
  </div>
  <!-- /modal de visualizacion de imagen de portada -->
</template>

<script lang="ts" setup>
import portada from "../../../../public/img/portada.jpg";
const useUser = useUserStore();
const useProductor = useProductorStore()
const isOpen = ref(false);
const loadingImg = ref(true);
const isOpenModalEdit = ref(false)
</script>

<style></style>
