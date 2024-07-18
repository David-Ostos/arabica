<template>
  <div
    class="relative shadow-xl rounded-3xl"
    :class="!useUser.dataUser.verificado ? '-mt-2 z-0 block' : ''"
  >
    <div class="overflow-hidden rounded-b-3xl">
      <img
        @click="isOpen = true"
        :src="
          !useUser.perfilUser.imgPortada
            ? portada
            : useUser.perfilUser.imgPortada
        "
        alt="Imagen portada"
        height="400"
        class="h-[400px] w-full object-cover rounded-b-3xl cursor-pointer hover:brightness-75 transition-all duration-1000"
      />
    </div>
    <div
      class="absolute bottom-5 right-10 rounded-full py-1 px-4 cursor-pointer bg-white flex justify-center items-center gap-2 hover:bg-slate-200 hover:scale-105 transition-all duration-300"
    >
      <UIcon name="i-heroicons-camera-solid" class="text-lg" />
      <span>Editar foto de portada</span>
    </div>
  </div>

  <!-- modal de visualizacion de imagen de portada -->
  <div>
    <UModal
      v-if="
        useUser.perfilUser.imgPortada !== '' ||
        useUser.perfilUser.imgPortada !== undefined ||
        useUser.perfilUser.imgPortada !== null
      "
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
            useUser.perfilUser.imgPortada === '' ||
            useUser.perfilUser.imgPortada === undefined
              ? portada
              : useUser.perfilUser.imgPortada
          "
          class="max-h-[600px] object-contain rounded-3xl shadow-xl"
          alt=""
        />
        <Placeholder class="h-48" />
      </div>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import portada from "../../../../public/img/portada.jpg";
const useUser = useUserStore();
const isOpen = ref(false);
</script>

<style></style>
