<template>
  <v-navigation-drawer app :permanent="true" :width="drawer ? 240 : 72" color="primary" dark>
    <v-list dense nav>
      <v-list-item link :to="{ name: 'Home' }">
        <v-icon>mdi-home</v-icon>
        <v-list-item-title v-if="drawer">Home</v-list-item-title>
      </v-list-item>

      <v-list-item link :to="{ name: 'About' }">
        <v-icon>mdi-information</v-icon>
        <v-list-item-title v-if="drawer">About</v-list-item-title>
      </v-list-item>

      <v-list-item @click="handleAuth">
        <v-icon>{{ authStore.isAuthenticated ? 'mdi-logout' : 'mdi-login' }}</v-icon>

        <v-list-item-title v-if="drawer">
          {{ authStore.isAuthenticated ? 'Cerrar Sesión' : 'Iniciar Sesión' }}
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <v-btn icon @click="$emit('toggle-drawer')" class="mt-auto mb-4" color="secondary">
      <v-icon>{{ drawer ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
    </v-btn>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { logoutService } from '@/services/auth.service'

const props = defineProps<{ drawer: boolean }>()
const emit = defineEmits(['toggle-drawer'])
const router = useRouter()
const authStore = useAuthStore()

const handleAuth = async () => {
  if (authStore.isAuthenticated) {
    try {
      await logoutService()
    } catch (error) {
      console.error('Error en logout, ignorando...')
    } finally {
      authStore.logout()
      router.push({ name: 'Home' })
    }
  } else {
    router.push({ name: 'Login' })
  }
}
</script>
