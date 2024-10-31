<template>
  <div>
    <UModal :ui="{ width: 'sm:max-w-[900px]' }" prevent-close :model-value="open" @close="closeModal">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', width: 'sm:max-w-2xl' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">
              Vista previa de la imagen
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="closeModal" />
          </div>
        </template>

        <div>
          <img :src="image" alt="Vista previa" class="rounded-md shadow-md w-full cursor-pointer">
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  image: {
    type: String,
    required: true
  },
  open: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}
</script>