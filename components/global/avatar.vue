<template>
  <div class="overflow-hidden rounded-full h-14 w-14" 
    :class="clases"
  >
    <USkeleton
        v-if="!loadingImg && useUser.dataUser.picture"
        class="h-14 w-14 rounded-full"
        :class="clases"
        :ui="{
          background: 'bg-secundary',
        }"
      />
  
      <div else  class="h-14 w-14 rounded-full" :class="clases" >
        <img v-if="!picture" :src="useUser.dataUser.picture ? useUser.dataUser.picture : '/img/avatar.png' " 
        @load="loadingImg = true" class=" rounded-full" :class="clases"  alt=""/>
        <img v-else="picture" :src="picture ? picture : '/img/avatar.png' " 
        @load="loadingImg = true" class=" rounded-full" :class="clases"  alt=""/>
        <div class="flex justify-center items-center h-full bg-gray-300">
          <UIcon v-if="!useUser.dataUser.picture"
          :name="icon ? icon : 'i-heroicons-photo'" 
          class=" rounded-full"
          :class="clasesIcon"
          />
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
const useUser = useUserStore()
const props = defineProps({
  clases: String,
  clasesIcon:String,
  icon: String,
  picture: String
})


const loadingImg = ref(false);

</script>

<style>

</style>