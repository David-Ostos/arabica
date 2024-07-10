<template>
  <div>
    <UModal v-model="useModal.showModalProductorVerificate" :ui="{
      width: ' sm:max-w-screen-lg'
    }">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800',width: ' w-[800px]' }">
        <template #header>
          <div class="flex items-center justify-between ">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Verificate con nosotros
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 rounded-full border-none" @click="useModal.showModalProductorVerificate = false" />
          </div>
        </template>
        <Placeholder class="h-96" />
        <div>
          <ModalsProductorVerificarseBanner/>
          <ModalsProductorVerificarseBeneficios/>
          <ModalsProductorVerificarseFormulario/>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts" setup>

const useUser = useUserStore()
const useModal = useShowModalsStore()

if(!useUser.dataUser.verificado){
  useModal.showModalProductorVerificate = true
}

</script>

<style>

</style>