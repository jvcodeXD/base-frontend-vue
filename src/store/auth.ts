import { defineStore } from 'pinia'

interface User {
  name: string
  photo: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: '',
    role: '',
    user: <User>{},
  }),
  actions: {
    login(token: string, role: string, user: User) {
      this.isAuthenticated = true
      this.token = token
      this.role = role
      this.user = user
    },
    logout() {
      this.isAuthenticated = false
      this.token = ''
      this.role = ''
      this.user = <User>{}
    },
  },
  persist: true,
})
