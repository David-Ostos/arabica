<template>
  <div class="overflow-hidden rounded-full h-14 w-14" 
    :class="clases"
  >
    <USkeleton
        v-if="!loadingImg && picture"
        class="h-14 w-14 rounded-full"
        :class="clases"
        :ui="{
          background: 'bg-secundary',
        }"
      />
  
      <div  class="h-14 w-14 rounded-full" :class="clases" >
        <img v-if="picture" :src="picture" @load="loadingImg = true" class=" rounded-full" :class="clases"  alt=""/>
        <div class="flex justify-center items-center h-full bg-gray-300">
          <UIcon v-if="!picture"
          :name="icon ? icon : 'i-heroicons-photo'" 
          class=" rounded-full"
          :class="clasesIcon"
          />
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  picture: String,
  clases: String,
  clasesIcon:String,
  icon: String,
})


const loadingImg = ref(false);

</script>

<style>

</style>