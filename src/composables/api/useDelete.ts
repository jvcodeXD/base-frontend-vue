import { ref } from 'vue'
import api from '@/plugins/axios'

export const useDelete = <T = any>(url: string) => {
  const data = ref<T | null>(null)
  const error = ref<any>(null)
  const loading = ref(false)

  const execute = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.delete<T>(url)
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
