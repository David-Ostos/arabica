<template>

  <div class="">
    <div class="-mt-16 relative w-full">
      <Avatar
        class="ring-4 ring-offset-[3px] ring-primary bg-white"
        clases="h-[90px] w-[90px] md:h-[120px] md:w-[120px]"
        clases-icon="text-3xl"
        :picture="picture"
        alt="Avatar"
      />
    </div>
    <div class="flex items-center  justify-between w-full ">
      <div class="my-4 w-full ">
        <h2
          v-if="nombre"
          class="text-2xl font-bold relative w-fit pr-8 capitalize"
        >
          {{ nombre }}
          
        </h2>
        <div class="flex gap-4">
          <p class="flex items-center gap-2 text-lg text-secundary capitalize">
            <UIcon name="i-openmoji-flag-peru" dynamic />
            {{ origen }}
          </p>
          <p class="flex items-center gap-2 text-lg text-secundary capitalize">
            <UIcon name="i-bxs-leaf" class="text-primary" dynamic />
            {{ tipoProductor }}
          </p>
        </div>
      </div>
      <div  class=" w-fit h-full flex items-center gap-4">
        <div v-for="red, index in redes" :key="index">
          <div v-if="red.linkbase">

            <NuxtLink :to="red.linkUsuario!" target="_blank" class="flex items-center gap-4">
              <UIcon 
                :name="red.icon!" 
                class="text-2xl" 
                :class="{ 'text-blue-500' :red.tipoRed === 'facebook', 'text-rose-500' :red.tipoRed === 'instagram'}" 
                dynamic 
              />
            </NuxtLink>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>

import type { Redes } from '../../../../interfaces/PerfilComprador';

const props = defineProps({
  picture: String,
  nombre: String,
  origen: String,
  tipoProductor: String,
  redes: Array as PropType<Redes[]>
})

console.log(props.redes)

const openInNewTab = (url:string) =>{
  console.log(url)
  // window.open(url, '_blank')
}

</script>

<style scoped lang="scss">
</style>
