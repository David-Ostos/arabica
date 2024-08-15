<template>
  <div class="mt-10 flex flex-col justify-center items-center font-roboto">
    <h3 class="text-center text-3xl font-bold ">Beneficios de Registrarse en Arábica</h3>
    <p class="font-medium text-gray-800 mt-6 max-w-[700px] text-center">Como comprador registrado en Arábica, disfrutarás de una experiencia de compra mejorada y personalizada. Aquí te presentamos algunos de los beneficios que obtendrás al registrarte:</p>
    <div  class="flex flex-col lg:flex-row justify-center my-4">
      <div v-for="item in items" class="flex flex-col gap-4 justify-center items-center md:basis-1/3 p-4 text-center">
        <div class="flex justify-center items-center w-auto h-auto p-4 rounded-full text-4xl text-white" style="background-image: radial-gradient(circle at 87.5% 12.5%, #e7f000 0, #c9ed00 10%, #a8e800 20%, #86e000 30%, #5fd600 40%, #29ca0d 50%, #00bd26 60%, #00b235 70%, #00a742 80%, #009f4d 90%, #009758 100%);">
          <UIcon :name="item.icon" dynamic/>
        </div>
        <h3 class="text-xl text-[#232933] font-bold ">{{ item.titulo }}</h3>
        <p class="h-28">{{ item.descripcion }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const items = [
{
    icon: 'i-hugeicons-coffee-beans',
    titulo:'Ofertas Exclusivas',
    descripcion: 'Accede a descuentos y promociones especiales solo para usuarios registrados.',
  },{
    icon: 'i-tabler-heart-handshake',
    titulo:'Lista de Deseos',
    descripcion: 'Guarda productos en tu lista de deseos para comprarlos más tarde o recibir notificaciones cuando estén en oferta.',
  },{
    icon: 'i-heroicons-inbox-stack-20-solid',
    titulo:'Noticias y Novedades',
    descripcion: 'Sé el primero en enterarte de nuevos productos, eventos y noticias relacionadas con el mundo del café Arábica.',
  },
]

</script>

<style>

</style>