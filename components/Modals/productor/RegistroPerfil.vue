<template>
  <div class="">
    <UModal v-model="useModal.showModalProductorPerfilCompleto" prevent-close :ui="{
      width: ' sm:max-w-screen-lg',
      
    }">
      
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800',width: ' w-[800px]', }">
        <!-- <template #header>
          <div class="flex items-center gap-4 ">
            <img src="/img/logo_ligth.png" alt="" class="h-12 ">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Verificate con nosotros
            </h3>
          </div>
        </template> -->
        <Placeholder class="h-96" />
        <div>
          <ModalsProductorRegistroPerfilBanner/>
          <ModalsProductorRegistroPerfilBeneficios/>
          <ModalsProductorRegistroPerfilFormulario/>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
const useModal = useShowModalsStore()
const useUser = useUserStore()
console.log(useUser.dataUser);
onMounted(()=>{
  if(!useUser.dataUser.perfilBase)
  useModal.showModalProductorPerfilCompleto = true

})


</script>

<style>

</style>