import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: '',
    role: '',
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
