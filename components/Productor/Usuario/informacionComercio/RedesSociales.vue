<template>
  <div class="flex flex-col gap-4" >
    <div v-for="item in links" class="w-full" >
      <UFormGroup > 
        <div class=" w-full grid grid-cols-12">
          <div class="col-span-3  w-full border rounded-l-md shadow-sm 
          bg-gray-100 dark:bg-gray-900 text-gray-900 dark:-text-dar ">
          <div class=" flex items-center gap-2 h-full mx-8 w-fit">
            <UIcon :name="item.icon!" dynamic  />
            <span class="hidden md:block" >{{ item.tipoRed }}</span>
          </div>
          </div>
          <div class="col-span-9">
            <UInput v-model="item.linkUsuario" size="xl" :ui="{
              rounded: 'rounded-l-none'
            }" :placeholder="item.tipoRed !== 'web' ? `https://www.${item.linkbase}tu_usuario` : 'url de tu pagina web' "/>
          </div>
        </div>
      </UFormGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>

const useProductor = useProductorStore()

const links = useProductor.perfilProductor.redes




</script>

<style>

</style>