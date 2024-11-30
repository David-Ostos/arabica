<template>
  <div class="w-full space-y-4">
    <div v-for="(item, index) in accordionItems" :key="index" class="border-b border-gray-200">
      <button
        @click="toggleItem(item.id)"
        class="flex justify-between items-center w-full py-4  text-lg font-semibold text-left text-gray-800 hover:text-primary-600 focus:outline-none transition-colors duration-300"
      >
        <span>{{ item.label }}</span>
        <span class="transform transition-transform duration-300" :class="{ 'rotate-180': item.isActive }"><UIcon name="i-ic-baseline-keyboard-arrow-down" dynamic /></span>
      </button>
      <transition v-for="key in Object.keys(item.contenido)"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-show="item.isActive" class=" flex gap-1 justify-between border-b mx-2 py-2 text-sm  text-gray-600 capitalize overflow-hidden">
          <UTooltip :text="key">
            <p  class="text-gray-800 max-h-5 truncate"> {{ key }}:</p>
          </UTooltip>
          <UTooltip :text="item.contenido[key]">
            <p class=" max-h-5 truncate "> {{ item.contenido[key] }}</p>
          </UTooltip>

        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface AccordionItem {
  id: number,
  label: string,
  slot: string,
  contenido: any,
  isActive: boolean,
}

const props = defineProps<{items:AccordionItem [] }>()

const accordionItems = ref(props.items as AccordionItem[])

const toggleItem = (index: number) => {+
  console.log(index);
  accordionItems.value = accordionItems.value.map((item, i) => ({
    ...item,
    isActive: i === index ? !item.isActive : item.isActive
  }))
}
</script>