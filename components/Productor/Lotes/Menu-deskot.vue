<template>
      <!-- Menu desplegable -->
      <div
      class=" hidden  md:block relative transition-width ease-in-out duration-700 shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar border-x border-inset border-gray-300 dark:border-gray-700 focus:border-2 focus:border-primary-500 dark:focus:border-primary-400 py-5 px-4"
      :class="[
        isOpen ? ' w-[237px]' : ' w-[74px]',
        lotes.length > 0 ? ' w-1/3' : 'w-1/4',
      ]"
    >
      <div class="absolute right-4">
        <div
          class="mb-4 text-xl border rounded-md p-2 flex justify-center items-center cursor-pointer"
          @click="chageMenu"
        >
          <UIcon name="i-ic-round-menu" class="" dynamic />
        </div>
      </div>
      <div class="h-full">
        <div class="flex flex-col justify-center gap-10 h-full">
          <button
            v-for="item in links"
            @click="item.accion"
            class="group text-xl border bg-white items-center rounded-md py-1 px-2 mb-4 ease-in-out duration-700 truncate flex gap-1 relative hover:cursor-pointer hover:bg-gray-100 transition-all hover:border-gray-600"
            :class="[
              {
                ' w-48': isOpen,
                'w-[38px]': !isOpen,
                ' !text-gray-500 !border-gray-500 hover:cursor-not-allowed hover:!text-gray-500 !bg-gray-200 ':
                  lotes.length === 0 && item.disable,
                '!bg-gray-300 border-gray-600': item.isActive,
              },
              item.color,
            ]"
          >
            <UIcon
              :name="item.icon"
              class="absolute left-[6px] mr-2 text-2xl transition-all duration-700 group-hover:text-gray-600"
              :class="{
                'text-white': item.isActive,
                'group-hover:text-gray-500': lotes.length === 0 && item.disable,
              }"
              dynamic
            />
            <span
              class="ml-7 transition duration-500 ease-in-out text-dar capitalize"
              :class="isOpen ? 'opacity-100' : 'opacity-0 '"
              >{{ item.label }}</span
            >
          </button>
        </div>
      </div>
    </div>
    <!-- /Menu desplegable -->
</template>

<script lang="ts" setup>
import type { Lotes } from '~/interfaces/Lotes';
import type { Link } from '~/pages/Dashboard/productor/Lotes/index.vue';


const emits = defineEmits(['chageMenu'])

const props = defineProps<{
  links:Link[], 
  isOpen: boolean,
  lotes: Lotes[]
}>()

function chageMenu(){
emits('chageMenu', !props.isOpen)
}

</script>

<style>

</style>