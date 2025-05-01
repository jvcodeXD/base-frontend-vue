import api from '@/plugins/axios'
import type { Usuario } from '@/interfaces'

export const getAllUsers = async (): Promise<Usuario[]> => {
  const response = await api.get('/users')
  return response.data
}

export const getUserById = async (id: string): Promise<Usuario> => {
  const response = await api.get(`/users/${id}`)
  return response.data
}

export const createUser = async (data: FormData): Promise<Usuario> => {
  const response = await api.post('/users', data)
  return response.data
}

export const updateUser = async (id: string, data: FormData): Promise<Usuario> => {
  const response = await api.put(`/users/${id}`, data)
  return response.data
}

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`)
}
