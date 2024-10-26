import axios from 'axios'
import type { PerfilProductor } from '~/interfaces/PerfilProductor'

export function usePerfilProductor() {
  const route = useRoute()
  const perfil = ref<PerfilProductor | null>(null)
  const isLoading = ref(true)
  const error = ref<Error | null>(null)

  const fetchPerfil = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_API}/api/content/item/productores/${route.params.id}?fields={"_state": false,"_modified": false,"_mby": false,"_created": false,"_cby": false,"verificacion": false,}&populate=1`, {
        headers: {
          "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
        },
      })
      perfil.value = response.data
      console.log(perfil.value )
    } catch (e) {
      error.value = e as Error
    } finally {
      isLoading.value = false
    }
  }

  return {
    perfil,
    isLoading,
    error,
    fetchPerfil
  }
}