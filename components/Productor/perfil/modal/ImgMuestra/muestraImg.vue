<template>
  <div>

    <UModal :ui="{ width: 'sm:max-w-[900px]' }" prevent-close v-model="useShowModal.productorMuestraImg">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', width: 'sm:max-w-2xl' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 @click="console.log(image)" class="text-base font-semibold text-gray-900 dark:-text-dar">
              Estas son las Imagenes Destacadas
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 " @click="closeModal" />
          </div>
        </template>

        <UCarousel v-if="image!.length > 0" v-slot="{ item }" :items="image"
          :ui="{ container: ' w-full' }" indicators arrows >
          <img :src="item.link" class="max-h-[500px] w-full object-cover cursor-pointer" draggable="true" />
        </UCarousel>

        
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts" setup>

const useShowModal = useShowModalsStore()

const props = defineProps({
  image:{
    type:  Array,
    default: [],
    required: true
  },
})

onMounted(()=>{
  console.log(props.image);
})

function closeModal(){
  useShowModal.productorMuestraImg = false
}


</script>

<style>

</style>