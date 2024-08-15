<template>
  <div class="">
    <UModal v-model="useModal.showModalCompradorPerfilCompleto" prevent-close :ui="{
      width: ' sm:max-w-screen-lg',
      
    }">
      
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800',width: ' w-[800px]', }">
        
        <div>
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
console.log(useUser.dataUser);
onMounted(()=>{
  if(!useUser.dataUser.perfilBase)
  useModal.showModalCompradorPerfilCompleto = true

})


</script>

<style>

</style>