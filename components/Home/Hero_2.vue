<template>
  <div class="mt-4 text-white bg-[url('/img/hero.jpg')] bg-reverse h-[80vh] -scale-x-100  bg-cover text-center flex flex-col justify-center items-center">
    <div class=" max-w-2xl flex flex-col justify-center items-center -scale-x-100 mx-8 sm:mx-0">

      <h1 class="text-2xl md:text-6xl font-bold md:leading-[1.2] mt-4">
        Los buenos días comienzan con un buen café
      </h1>
  
      <p class="leading-5  mt-4 text-sm   sm:text-base ">
        Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al
        sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.
      </p>
  
      <BotonPrimary class="mt-6 text-center md:text-start" contenido="Uneté a nosotros" link="/auth/registro" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import BotonPrimary from "../Botones/BotonPrimary.vue";
</script>

<style></style>
