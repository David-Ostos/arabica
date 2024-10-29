<template>
  <div
    class="relative shadow-xl rounded-3xl"
    :class="!useUser.dataUser.verificado ? '-mt-2 z-0 block' : ''"
  >
    <div class="overflow-hidden rounded-b-3xl h-[400px]  object-center transition-all duration-700">
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
        class="h-[400px] w-full object-cover object-center rounded-b-3xl cursor-pointer hover:brightness-75 transition-all duration-1000"
      />
    </div>
  </div>

  <!-- modal de visualizacion de imagen de portada -->
  <div>
    <UModal
      v-if="useProductor.perfilProductor.imgPortada"
      v-model="isOpen"
      :ui="{
        width: 'sm:max-w-fit',
      }"
    >
      <div class="p-4 rounded-3xl relative">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="absolute top-8 right-8 rounded-full bg-white"
          @click="isOpen = false"
          :ui="{
            color: {
              gray: {
                ghost: 'focus-visible:ring-0 focus-visible:ring-white ',
              },
            },
          }"
        />
        <img
          :src="
            useProductor.perfilProductor.imgPortada ? portada
              : useProductor.perfilProductor.imgPortada
          "
          class="max-h-[600px] object-contain rounded-3xl shadow-xl"
          alt=""
        />
      </div>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import portada from "../../../../public/img/portada.jpg";
const useUser = useUserStore();
const useProductor = useProductorStore()
const isOpen = ref(false);
const loadingImg = ref(true);
</script>

<style></style>
