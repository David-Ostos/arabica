<template>
  <div v-if="!useUser.dataUser.perfilBase" class=" bg-[url('/img/fondo-cafe-2.jpg')] h-[550px] flex flex-col justify-center items-center text-center my-10 px-4 rounded-2xl shadow-xl bg-center gap-4 bg-cover ">
    <h1 class="text-xl md:text-4xl font-bold text-white max-w-[891px] text-stroke">Verifíquese y conviértase en un proveedor de confianza en Arabica.</h1>
    <p class="font-medium text-white max-w-[800px] ">Obtenga nuestro apoyo para el pedido de muestras, garantía de calidad, coordinación del envío, contratación e incluso financiación.</p>
    <BotonesBotonPrimary contenido="Verifiquese."  />
    <NuxtLink to="/guia/verificados" class="flex items-center gap-1 justify-center text-sm text-white"><UIcon name="i-mdi-alert-circle" dynamic/>Descubrir más</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const useModal = useShowModalsStore()
const useUser = useUserStore()
</script>

<style>

</style>