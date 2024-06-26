<script lang="ts" setup>
const useUser = useUserStore()
definePageMeta({
  middleware: 'productor',
  layout: 'productor'
})
</script>

<template>
  <div class="min-h-screen mx-20">
    <div class=" mt-10">
      <div class="flex items-center gap-4">
        <UAvatar :size="useUser.dataUser.picture !== null ? 'xl' : '2xl'" :src=" useUser.dataUser.picture !== null ? useUser.dataUser.picture : '/img/avatar.png'" />
        <div>
          <h1 class="text-2xl font-raleway font-bold capitalize [&_b]:hover:text-primary">Bienvenido, <b class="font-bold"> {{ useUser.dataUser.nombre }} </b></h1>
          <div v-if="!useUser.dataUser.verificado"
            class="flex gap-4 items-center">
          
            <div class="gap-1 flex items-center">
              <UIcon class="text-primary text-xl" name="i-tabler-rosette-discount-check-filled" dynamic/>
              <span
              >Vendedor Verificado</span>
            </div>
            
            <div class="gap-1 flex items-center">
              <UIcon class="text-primary text-xl" name="i-tabler-rosette-discount-check-filled" dynamic/>
              <span>
                Certificado EUDR
              </span>
            </div>
          </div>
  
          <div v-else
            class="flex gap-4 item-center">
            <div class="gap-1 flex items-center">
              <UIcon class="text-xl" color="#e8a331"  name="i-tabler-alert-triangle-filled" dynamic/>
              <span
              >Vendedor no Verificado</span>
            </div>
            
            <div class="gap-1 flex items-center">
              <UIcon class="text-xl" color="#e8a331" name="i-tabler-alert-triangle-filled" dynamic/>
              <span>
                Sin Certificación EUDR
              </span>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  
    <ProductorVerifiquese/>
  </div>

</template>

<style scoped></style>
