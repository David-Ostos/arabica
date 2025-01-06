<template>
  <div class="relative search-component">
    <UInput
      v-model="searchQuery"
      :loading="loading"
      class="[&_input]:rounded-full md:w-80"
      size="xl"
      icon="i-heroicons-magnifying-glass-20-solid"
      trailing
      placeholder="Buscar cafés, sabores, productores..."
      @input="debouncedSearch"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <!-- Contenedor de resultados de búsqueda -->
    <div v-if="showResults" class="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg max-h-96 overflow-y-auto">
      <div>
        <p v-if="searchResultsCount === 1 " class="capitalize mt-2 mx-4 text-sm text-gray-600">{{ searchResultsCount }} resultado encontrado</p>
        <p v-else class="mt-2 mx-4 text-sm text-gray-600 capitalize">{{ searchResultsCount }} resultados encontrados</p>
      </div>
      <div class="w-full" v-for="lote in filteredLotes" :key="lote._id" @click="searchQuery = ''">
        <NuxtLink :to="`/lote/${lote._id}`">
          <div class="p-4 border-b border-gray-200 flex items-center space-x-4 transform transition-all duration-300 ease-in-out hover:bg-primary-100">
            <img 
              :src="lote.galeria && lote.galeria.length > 0 ? lote.galeria[0].link : '/placeholder.svg?height=80&width=80'" 
              :alt="lote.nombre"
              class="w-20 h-20 object-cover rounded-md"
            />
            <div class="w-full max-w-full overflow-hidden">
              <h3 class="font-semibold text-gray-800 capitalize truncate">{{ lote.nombre }}</h3>
              <div class="flex gap-1  text-gray-600 capitalize truncate">
                <p class="">{{ lote.pais }}</p>
                <p class="">{{ lote.origen }}</p>
              </div>
              <p class="text-sm text-gray-600 capitalize truncate">{{ lote.productor?.nombre || 'Productor desconocido' }}</p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import debounce from 'lodash/debounce'
import type { Lotes } from '~/interfaces/Lotes';

const lotesStore = useLotesStore()
const loading = ref(false)
const searchQuery = ref('')
const isFocused = ref(false)
const isVisible = ref(false)

const filteredLotes = computed(() => {
  if (!searchQuery.value.trim()) return lotesStore.lotes.slice(0, 6)

  const query = searchQuery.value.toLowerCase().trim()
  return lotesStore.lotes.filter((lote: Lotes) => {
    return (
      (lote.nombre && lote.nombre.toLowerCase().includes(query)) ||
      (lote.pais && lote.pais.toLowerCase().includes(query)) ||
      (lote.origen && lote.origen.toLowerCase().includes(query)) ||
      (lote.productores && lote.productores.toLowerCase().includes(query)) ||
      (lote.variedad && lote.variedad.toLowerCase().includes(query)) ||
      (lote.proceso && lote.proceso.toLowerCase().includes(query)) ||
      (lote.perfil && lote.perfil.toLowerCase().includes(query)) ||
      (lote.certificaciones && lote.certificaciones.toLowerCase().includes(query)) ||
      (lote.cantidadLote && lote.cantidadLote.toLowerCase().includes(query)) ||
      (lote.descripcion && lote.descripcion.toLowerCase().includes(query)) ||
      (lote.productor?.nombre && lote.productor.nombre.toLowerCase().includes(query))
    )
  })
})

const showResults = computed(() => isVisible.value && (isFocused.value || searchQuery.value.trim().length > 0))

const displayedLotes = computed(() => {
  if (!searchQuery.value.trim()) {
    return lotesStore.lotes.slice(0, 6)
  }
  return filteredLotes.value
})

const searchResultsCount = computed(() => displayedLotes.value.length)

const performSearch = () => {
  loading.value = true
  // Aquí normalmente harías una llamada a la API o realizarías una búsqueda más compleja
  console.log('Resultados de la búsqueda:', displayedLotes.value)
  loading.value = false
}

const debouncedSearch = debounce(performSearch, 300)

const handleFocus = () => {
  isFocused.value = true
  isVisible.value = true
}

const handleBlur = () => {
  // Pequeño retraso para permitir que el clic en los resultados se registre antes de ocultarlos
  setTimeout(() => {
    isFocused.value = false
  }, 200)
}

const handleClickOutside = (event: MouseEvent) => {
  const componentEl = document.querySelector('.search-component')
  if (componentEl && !componentEl.contains(event.target as Node)) {
    isVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  debouncedSearch.cancel()
})

// Exponemos filteredLotes para el componente padre o para uso futuro
defineExpose({
  filteredLotes
})
</script>

<style scoped>
/* Agrega estilos específicos aquí si es necesario */
</style>

