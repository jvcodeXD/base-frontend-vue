import { ref } from 'vue'
import api from '@/plugins/axios'

export const usePost = <T = any, P = any>(url: string) => {
  const data = ref<T | null>(null)
  const error = ref<any>(null)
  const loading = ref(false)

  const execute = async (payload: P) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.post<T>(url, payload)
      data.value = response.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    error,
    loading,
    execute,
  }
}
