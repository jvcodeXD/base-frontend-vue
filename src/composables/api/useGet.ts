import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

interface GetOptions {
  immediate?: boolean
}

export const useGet = <T = any>(url: string, options: GetOptions = { immediate: true }) => {
  const data = ref<T | null>(null)
  const error = ref<any>(null)
  const loading = ref(false)

  const execute = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get<T>(url)
      data.value = response.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  if (options.immediate) {
    onMounted(execute)
  }

  return {
    data,
    error,
    loading,
    execute,
  }
}
