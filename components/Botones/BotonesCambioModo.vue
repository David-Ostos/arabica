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
<!--   <div>
    <span
      v-if="$colorMode.preference === 'light'"
      @click="$colorMode.preference = 'dark'"
      class="px-3 py-4 lg:py-2 flex items-center uppercase font-bold cursor-pointer"
    >
      <UIcon
        name="i-heroicons-moon-solid" 
        class="dark:text-white text-2xl leading-lg"
      />
    </span>
    <span
      class=" px-3 py-4 lg:py-2 flex items-center uppercase font-bold cursor-pointer"
      v-if="$colorMode.preference === 'dark'"
      @click="$colorMode.preference = 'light'"
    >
      <UIcon
        name="i-heroicons-sun-solid"
        class="text-2xl leading-lg"
      />

      <span class="lg:hidden inline-block ml-2">Modo</span>
    </span>
  </div> -->
  <div>
    <Switch
    :value="$colorMode.preference"
    @click="$colorMode.preference === 'dark' ? $colorMode.preference = 'light' : $colorMode.preference = 'dark', enabled = !enabled, console.log(!enabled)"
    v-model="enabled"
    :class="enabled ? 'bg-gray-600 text-white' : 'bg-gray-100 border-2 border-dark text-dark'"

    class="relative inline-flex h-6 w-11 items-center rounded-full"
    >
    <span class="sr-only">Enable notifications</span>
    <UIcon
      :name="enabled ? 'i-heroicons-moon-solid' : 'i-heroicons-sun-solid'"
      :class="enabled ? 'translate-x-6' : 'translate-x-1'"
    />
    </Switch>
  </div>
</template>

<style scoped></style>
