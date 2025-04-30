import { defineStore } from 'pinia'
import type { AuthUser, Usuario } from '@/interfaces'
import { ref } from 'vue'

const user = ref<AuthUser | null>(null)

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: '',
    role: '',
    user: <Usuario>{},
  }),
  actions: {
    login(accessToken: string, userData: AuthUser) {
      this.token = accessToken
      this.user = userData
      this.role = userData.role
      this.isAuthenticated = true
    },
    logout() {
      this.isAuthenticated = false
      this.token = ''
      this.role = ''
      this.user = <Usuario>{}
    },
  },
  persist: true,
})
