import api from '@/plugins/axios'

export const loginService = async (username: string, pass: string) => {
  const response = await api.post('/auth/login', { username, pass })
  return response.data
}

export const logoutService = async () => {
  const response = await api.post('/auth/logout')
  return response.data
}

export const refreshService = async () => {
  const response = await api.post('/auth/refresh')
  return response.data
}
