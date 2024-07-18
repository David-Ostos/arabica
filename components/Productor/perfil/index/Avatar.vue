<template>
  <div class="">
    <div class="-mt-16 ml-12 relative w-fit">
      <UAvatar
        class="ring-4 ring-offset-[3px] ring-primary bg-white"
        :ui="{
          background:'bg-white',
          size: {
            '3xl': 'h-[120px] w-[120px] text-3xl',
          },
        }"
        size="3xl" 
          :src="picture"
        icon="i-heroicons-photo"
        alt="Avatar"
      />
      <div
        class="text-2xl absolute bottom-1 right-0 flex p-[6px] bg-slate-200 rounded-full cursor-pointer hover:bg-slate-300 transition-all duration-300"
      >
        <UIcon name="i-heroicons-camera-solid" />
      </div>

    </div>
    <div class="mx-8 my-4 ">
      <h2 v-if="useUser.perfilUser.nombre !== undefined"
        class="text-2xl font-bold relative w-fit pr-8"
      >
        {{ useUser.perfilUser.nombre }} <UIcon class=" cursor-pointer text-xl text-primary absolute top-0 right-0" name="i-ph-pencil-fill" dynamic/>
      </h2>
      <div class="flex gap-4">
        <p class="flex items-center gap-2 text-lg text-secundary capitalize"><UIcon name="i-openmoji-flag-peru" dynamic/> {{ useUser.perfilUser.origen }}</p>
        <p class="flex items-center gap-2 text-lg text-secundary capitalize"><UIcon name="i-bxs-leaf" class="text-primary" dynamic /> {{ useUser.perfilUser.tipoProductor }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const useUser = useUserStore();

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

const data = reactive({
  nombre: undefined,
  origen: undefined,
  tipoProductor: undefined,
})

console.log();

if(Object.keys(useUser.perfilUser).length === 0){
  
}

</script>

<style></style>
