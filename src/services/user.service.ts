import api from '@/plugins/axios'
import type { Usuario } from '@/interfaces'

export const getAllUsers = () => api.get<Usuario[]>('/users')

export const getUserById = (id: string) => api.get<Usuario>(`/users/${id}`)

export const createUser = (data: Partial<Usuario>) => api.post('/users', data)

export const updateUser = (id: string, data: Partial<Usuario>) => api.put(`/users/${id}`, data)

export const deleteUser = (id: string) => api.delete(`/users/${id}`)
