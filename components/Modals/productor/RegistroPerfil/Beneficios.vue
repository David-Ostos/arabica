<template>
  <div class="mt-10 flex flex-col justify-center items-center font-roboto">
    <h3 class="text-center text-3xl font-bold ">Beneficios para los productores verificados</h3>
    <p class="font-medium text-gray-800 mt-6 max-w-[700px] text-center">Como productor verificado tendrá más visibilidad y potencial de venta. Una etiqueta de productor verificado es un signo de confianza y una celebración de la transparencia y la calidad.</p>
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
    titulo:'Vender más cafés',
    descripcion: 'Añadiremos una etiqueta de productor verificado a su perfil y un listado para que sus cafés se destaquen.',
  },{
    icon: 'i-tabler-heart-handshake',
    titulo:'Construir nuevas relaciones',
    descripcion: 'Su perfil tiene más visibilidad y aparecerá en una lista dedicada e incluso hay un filtro de búsqueda para encontrar productores verificados.',
  },{
    icon: 'i-heroicons-inbox-stack-20-solid',
    titulo:'Crear lotes de café',
    descripcion: 'Usted mismo podrá crear lotes de café en la plataforma para promocionar su café.',
  },
]

</script>

<style>

</style>