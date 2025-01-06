<template>
  <div v-if="isOpen && !$route.path.includes('usuario') && !useUser.dataUser.perfilBase " :class="['mx-4 my-8 sm:my-0 md:m-8 md:mx-20 rounded-3xl shadow-md border-b-2']">
    <div class="px-4 md:px-8 py-4 rounded-3xl border-2 bg-gray-200 font-medium ">
      <div class="flex justify-between ">
        <h3 class="text-xl md:text-2xl mb-4 font-bold ">Complete su perﬁl para solicitar la veriﬁcación.</h3>
        <div class="flex justify-center items-center w-fit h-full p-1 shadow-inner cursor-pointer bg-white rounded-full">
          <UIcon class="text-2xl" name="i-heroicons-x-mark-16-solid" @click="isOpen = false"/>
        </div>
      </div>
      <p class=" text-secundary" > Añada detalles sobre su empresa en la sección "Acerca de" y realce su perfil con imágenes atractivas de perfil y portada. ¡Un perfil completo le permitirá destacarse y ser más visible para los tostadores!</p>
      <p class="text-secundary mt-8" >Una vez veriﬁcado podrás comenzar a ofrecer tu café en Arabicagc.</p>
      <button class="capitalize mt-4 px-3 py-2 text-base w-fit rounded-xl bg-primary text-white font-bold" contenido="">
        ¡saber más!
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>

const isOpen = ref(true)
const useUser = useUserStore()



</script>

<style>

</style>