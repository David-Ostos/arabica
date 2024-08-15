<template>
<div class=" mt-10">
      <div class="flex items-center gap-4">
        <Avatar :picture="picture"/>
        <div>
          <h1 class="text-2xl font-raleway font-bold capitalize [&_b]:hover:text-primary">Bienvenido, <b class="font-bold"> {{ useUser.dataUser.nombre }} </b></h1>
          <div v-if="useUser.dataUser.verificado"
            class="flex gap-4 items-center">
          
            <div class="gap-1 flex items-center">
              <UIcon class="text-primary text-xl" name="i-tabler-rosette-discount-check-filled" dynamic/>
              <span
              >Vendedor Verificado</span>
            </div>
            
            <!-- <div class="gap-1 flex items-center">
              <UIcon class="text-primary text-xl" name="i-tabler-rosette-discount-check-filled" dynamic/>
              <span>
                Certificado EUDR
              </span>
            </div> -->
          </div>
  
          <div v-else
            class="flex gap-4 item-center">
            <span @click="" 
              class="gap-1 flex items-center hover:!text-primary cursor-pointer"
            >
              <UIcon class="text-xl" color="#e8a331"  name="i-tabler-alert-triangle-filled" dynamic/>
              <span
              >Vendedor no Verificado</span>
              <UIcon name="i-ic-round-keyboard-arrow-right" class="text-[28px] font-black  -ml-1" dynamic/>
            </span>
            
            <!-- <div class="gap-1 flex items-center">
              <UIcon class="text-xl" color="#e8a331" name="i-tabler-alert-triangle-filled" dynamic/>
              <span>
                Sin Certificación EUDR
              </span>
            </div> -->
          </div>
  
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
const useUser = useUserStore()
const useModal = useShowModalsStore()
const picture = ref()
const pictureTrue = ref(false)

onMounted(()=>{
  if(useUser.dataUser.picture){
    picture.value = useUser.dataUser.picture
    pictureTrue.value = true
  }else{
    picture.value = '/img/avatar.png'
    pictureTrue.value = false
  }
})



</script>

<style>

</style>