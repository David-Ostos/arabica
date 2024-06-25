<template>
  <div class=" py-4 md:py-20 ">
    <div class="flex flex-col-reverse md:flex-row gap-4 md:gap-0 md:justify-between mx-4 md:mx-40">
      <div class="basis-1/2 pr-4 mx-8 sm:mx-0">
        <span class="text-primary uppercase"> Quiénes Somos </span>
        <h2 class="text-xl md:text-5xl font-bold leading-[1.2] mt-4">¡Compre café que provenga de productores, no de comerciantes!</h2>
        <p class="leading-5 mt-4">
          ¡Elija café obtenido directamente de los productores, no de
          intermediarios! Apoyar una cadena de suministro justa y transparente.
        </p>

        <BotonPrimary class="mt-6 text-center md:text-start" contenido="Registrate" link="/auth/registro" />
      </div>

      <img class="basis-1/3 w-screen md:w-[600px]" src="/img/home-about.jpg" />

      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BotonPrimary from "../Botones/BotonPrimary.vue";
</script>

<style></style>
