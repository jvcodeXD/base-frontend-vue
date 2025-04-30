import axios from 'axios'
import { useAuthStore, useLoadingStore } from '@/store'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  timeout: 10000,
})

// Interceptor: agregar token
api.interceptors.request.use(config => {
  const authStore = useAuthStore()
  const loadingStore = useLoadingStore()

  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }

  loadingStore.start()
  return config
})

// Interceptor: manejar errores y detener loading
api.interceptors.response.use(
  response => {
    const loadingStore = useLoadingStore()
    loadingStore.stop()
    return response
  },
  error => {
    const loadingStore = useLoadingStore()
    loadingStore.stop()

    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      // Redirigir si es necesario
    }

    return Promise.reject(error)
  }
)

export default api
