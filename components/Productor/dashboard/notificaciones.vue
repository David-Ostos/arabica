<template>
  <div class="flex flex-col gap-4 md:gap-0 md:flex-row justify-between ">
    <div v-for="item in items"
      class="flex items-center gap-4 rounded-2xl border md:border-none shadow-sm md:shadow-xl p-4">
      <div class=" flex justify-center items-center h-fit w-fit  p-4 rounded-full shadow-sm" style="background-image: radial-gradient(circle at 87.5% 12.5%, #e7f000 0, #c9ed00 10%, #a8e800 20%, #86e000 30%, #5fd600 40%, #29ca0d 50%, #00bd26 60%, #00b235 70%, #00a742 80%, #009f4d 90%, #009758 100%);"> 
        <UIcon :name="item.icon" dynamic class="text-4xl text-white " />
      </div>
      <div class="flex flex-col gap-1 w-[150px]">
        <span class="font-bold text-xl">{{ item.cantidad }}</span>
        <p class="text-[#707a89] text-sm font-bold">{{ item.titulo }}</p>
        <span v-if="!useUser.dataUser.verificado" 
          class="text-primary font-bold text-xs cursor-pointer"
          @click="useModal.showModalProductorVerificate = true"
        >Verifíquese. > </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const useUser = useUserStore()

const useModal = useShowModalsStore()

const items = ref([
{
    cantidad : 0,
    titulo: 'NUEVAS SOLICITUDES DE TOSTADORES',
    icon: 'i-tabler-heart-handshake'
  },{
    cantidad : 0,
    titulo: 'MUESTRAS ENVIADAS',
    icon: 'i-hugeicons-coffee-beans'
  },{
    cantidad : 0,
    titulo: 'CONTRATOS A ENVIAR',
    icon: 'i-tabler-ship'
  },{
    cantidad : 0,
    titulo: 'CONTRATOS ENVIADOS',
    icon: 'i-heroicons-globe-alt'
  },
])

</script>

<style>

</style>