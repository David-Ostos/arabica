<template>
  <div class="">
    <div class="-mt-16 relative w-fit">
      <Avatar
        class="ring-4 ring-offset-[3px] ring-primary bg-white"
        clases="h-[120px] w-[120px]"
        clases-icon="text-3xl"
        :picture="picture"
        alt="Avatar"
      />
      <div
        class="text-2xl absolute bottom-1 right-0 flex p-[6px] bg-slate-200 rounded-full cursor-pointer hover:bg-slate-300 transition-all duration-300"
      >
        <UIcon name="i-heroicons-camera-solid" />
      </div>

    </div>
    <div class=" my-4 ">
      <h2 v-if="useProductor.perfilProductor.nombre !== undefined"
        class="text-2xl font-bold relative w-fit pr-8"
      >
        {{ useProductor.perfilProductor.nombre }} <UIcon class=" cursor-pointer text-xl text-primary absolute top-0 right-0" name="i-ph-pencil-fill" dynamic/>
      </h2>
      <div class="flex gap-4">
        <p class="flex items-center gap-2 text-lg text-secundary capitalize"><UIcon name="i-openmoji-flag-peru" dynamic/> {{ useProductor.perfilProductor.origen }}</p>
        <p class="flex items-center gap-2 text-lg text-secundary capitalize"><UIcon name="i-bxs-leaf" class="text-primary" dynamic /> {{ useProductor.perfilProductor.tipoProductor }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const useUser = useUserStore();
const useProductor = useProductorStore();

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

</script>

<style></style>
