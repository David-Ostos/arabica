<script lang="ts" setup>
const colorMode = useColorMode()

const enabled = ref(false)
if(colorMode.preference === 'dark'){
  enabled.value = true
}else {
  enabled.value = false
}
</script>

<template>
  <div>
    <Switch
    :value="$colorMode.preference"
    @click="$colorMode.preference === 'dark' ? $colorMode.preference = 'light' : $colorMode.preference = 'dark', enabled = !enabled"
    v-model="enabled"
    :class="enabled ? 'bg-gray-600 text-white' : 'bg-gray-100 border-2 border-primary text-dar'"

    class="relative inline-flex h-6 w-11 items-center rounded-full"
    >
    <span class="sr-only">Cambiar de modo ahorita esta en modo: {{ $colorMode.preference }}</span>
    <UIcon
      :name="enabled ? 'i-heroicons-moon-solid' : 'i-heroicons-sun-solid'"
      :class="enabled ? 'translate-x-6' : 'translate-x-1 '"
    />
    </Switch>
  </div>
</template>

<style scoped></style>
