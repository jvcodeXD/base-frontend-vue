import api from '@/plugins/axios'
import type { Usuario } from '@/interfaces'

export const getAllUsers = () => api.get<Usuario[]>('/users')

export const getUserById = (id: string) => api.get<Usuario>(`/users/${id}`)

export const createUser = (data: FormData) => api.post('/users', data)

export const updateUser = (id: string, data: FormData) => api.put(`/users/${id}`, data)

export const deleteUser = (id: string) => api.delete(`/users/${id}`)
