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
    </div>
    <div class="my-4">
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
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  picture: String,
  nombre: String,
  origen: String,
  tipoProductor: String
})

</script>

<style scoped lang="scss">
</style>
