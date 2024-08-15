<template>
  <div class="flex flex-col gap-8">
        <div
          class="flex gap-1 items-center justify-between shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-full py-2 px-3 "
        >
          <div>
            <p>
              Historia de
              <b class="text-primary">{{ useProductor.perfilProductor.nombre }}</b>
            </p>
          </div>
          <UIcon
            name="i-ph-pencil-fill"
            class="cursor-pointer text-primary self-stretch text-xl p-1 box-content"
            dynamic
            @click=""
          />
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
            placeholder="Todavia no haz proporcionado tu descripción..."
            :model-value="useProductor.perfilProductor.descripcion"
          />
        </div>
        <ProductorPerfilPanoramicaImagenesDestacadas/>
      </div>
</template>

<script lang="ts" setup>
const useUser = useUserStore();
const useProductor = useProductorStore()



</script>

<style>

</style>