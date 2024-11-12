<template>
  <!-- tipo de usuario -->

  <div>
    <h3
      class="pb-4 text-xl sm:text-2xl text-center text-gray-800 dark:-text-dar"
    >
      Elija su tipo de cuenta <b class="text-red-500 text-base absolute">*</b>
    </h3>
    <div class="flex justify-around items-center mb-8 ">
      <div
        v-for="item in items"
        class=" transition-all duration-500 w-[90px] sm:w-[190px] h-[130px] sm:h-[180px] flex flex-col justify-start bg-gray-100 hover:bg-white shadow items-center p-4 border dark:-text-dar  hover:text-primary hover:border-primary dark:border-white rounded-md hover:dark:border-primary hover:dark:text-primary cursor-pointer"
        :class="tipo === item.show ? 'text-primary border-primary' : ''"
        @click="tipo = item.show , $emit('tipoProductor', item.tipo)"
      >
        <UIcon :name="item.icon" class="text-5xl lg:text-8xl" dynamic />
        <span class="font-medium text-center text-xs md:text-base ">{{ item.titulo }}</span>
      </div>
    </div>
  </div>
  <!-- /tipo de usuario -->
</template>

<script lang="ts" setup>
import type { TipoProductor } from '~/interfaces/PerfilProductor';


const tipo:Ref<number> = ref(0)

const items = ref([
{
    titulo: 'Agricultor, individual o farmer',
    icon: 'i-material-symbols-person',
    tipo:'individual',
    show: 1
  },{
    titulo: 'Asociación',
    icon: 'i-ph-farm-thin',
    tipo:'asociacion',
    show: 2
  },{
    titulo: 'Cooperativa',
    icon: 'i-tabler-heart-handshake',
    tipo:'cooperativa',
    show: 3
  },
])

</script>

<style></style>
