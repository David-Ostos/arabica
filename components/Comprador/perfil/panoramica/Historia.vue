<template>
  <div class="flex flex-col gap-8">
        <div
          class="flex gap-1 items-center justify-between shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-full py-2 px-3 "
        >
          <div>
            <p>
              Historia de
              <b class="text-primary capitalize">{{ nombre }}</b>
            </p>
          </div>
          
        </div>
        <div class="">
          <UTextarea
            :ui="{
              base: 'disabled:cursor-text h-[333px]'
            }"
            class="shadow-md"
            size="sm"
            disabled
            color="gray"
            variant="outline"
            placeholder="Todavia no se ha proporcionado la descripción..."
            :model-value="info"
          />
        </div>
        <CompradorPerfilPanoramicaImagenesDestacadas/>
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