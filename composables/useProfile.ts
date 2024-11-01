import { ref, computed } from 'vue'
import type { PerfilProductor } from '~/interfaces/PerfilProductor'
import { useGlobalStore } from '~/stores/global'

export function useProfile() {
  const globalStore = useGlobalStore()
  const route = useRoute()

  const profile= computed(() => globalStore.perfilComercial as PerfilProductor )
  const isLoading = ref(false)

  async function fetchProfile(id: string) {
    if (globalStore.perfilComercial && globalStore.perfilComercial._id === id) {
      return
    }

    isLoading.value = true
    try {
      await globalStore.getPerfil(id)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    profile,
    isLoading,
    fetchProfile
  }
}