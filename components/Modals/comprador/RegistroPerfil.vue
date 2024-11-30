<template>
  <div class="">
    <UModal v-model="useModal.showModalCompradorPerfilCompleto" :fullscreen="isScreenSmall" :ui="{
      inner: isScreenSmall ? 'scrollbar-hide' : 'fixed inset-0 overflow-y-auto',
      width: ' sm:max-w-screen-lg',
      
    }">
      
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800',width: ' w-[800px]', }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:-text-dar">
              Completar el Registro
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="useModal.showModalCompradorPerfilCompleto = false" />
          </div>
        </template>
        
        <div class="">
          <ModalsCompradorRegistroPerfilBanner/>
          <ModalsCompradorRegistroPerfilBeneficios/>
          <ModalsCompradorRegistroPerfilFormulario/>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
const useModal = useShowModalsStore()
const useUser = useUserStore()

const { isScreenSmall } = useGlobalComposable()

console.log(useUser.dataUser);
onMounted(()=>{
  if(!useUser.dataUser.perfilBase)
  useModal.showModalCompradorPerfilCompleto = true

})


</script>

<style>

</style>