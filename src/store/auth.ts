import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: '',
    role: '',
    user: {
      name: 'Juan Pérez',
      photo: 'https://i.pravatar.cc/150?img=3',
    },
  }),
  actions: {
    login(token: string, role: string) {
      this.isAuthenticated = true
      this.token = token
      this.role = role
    },
    logout() {
      this.isAuthenticated = false
      this.token = ''
      this.role = ''
    },
  },
  persist: true,
})
