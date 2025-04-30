import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: '',
    role: '',
    user: {},
  }),
  actions: {
    login(token: string, role: string, user: object) {
      this.isAuthenticated = true
      this.token = token
      this.role = role
      this.user = user
    },
    logout() {
      this.isAuthenticated = false
      this.token = ''
      this.role = ''
      this.user = {}
    },
  },
  persist: true,
})
