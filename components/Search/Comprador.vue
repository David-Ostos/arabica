<template>
  <div>
    <UInput
    :loading="loading"
    class="[&_input]:rounded-full md:w-80"
    size="xl"
    icon="i-heroicons-magnifying-glass-20-solid"
    trailing
    placeholder="Buscar cafés, sabores, productores..."
  />
  </div>
</template>

<script lang="ts" setup>

const loading = ref(false)
</script>

<style>

</style>