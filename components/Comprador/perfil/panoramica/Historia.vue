<template>
  <div class="flex flex-col gap-8">
        
    <div
      class=" bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar border rounded-md py-5 px-4"
    >
    <div class="flex justify-between pb-4">
        <h2 class=" font-medium text-lg text-gray-600"
        >Historia de
          <b class="text-primary capitalize">{{ nombre }}</b>
        </h2>
      </div>
          <p class=" text-sm text-secundary text-justify" >{{ info }}</p>
        </div>
      </div>
</template>

<script lang="ts" setup>
const useUser = useUserStore();
const useProductor = useProductorStore()

const props = defineProps({
  nombre : String,
  info: String

  
})


</script>

<style>

</style>