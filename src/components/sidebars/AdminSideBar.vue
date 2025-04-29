<template>
  <v-navigation-drawer app :permanent="true" :width="drawer ? 240 : 72" color="primary" dark>
    <v-list dense nav>
      <v-list-item @click="goTo('Home')">
        <v-icon>mdi-home</v-icon>
        <v-list-item-title v-if="drawer">Home</v-list-item-title>
      </v-list-item>

      <v-list-item @click="goTo('About')">
        <v-icon>mdi-information</v-icon>
        <v-list-item-title v-if="drawer">About</v-list-item-title>
      </v-list-item>

      <v-list-item @click="goTo('AdminDashboard')">
        <v-icon>mdi-view-dashboard</v-icon>
        <v-list-item-title v-if="drawer">Admin Panel</v-list-item-title>
      </v-list-item>

      <v-list-item @click="logout">
        <v-icon>mdi-logout</v-icon>
        <v-list-item-title v-if="drawer">Cerrar Sesión</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-btn icon @click="$emit('toggle-drawer')" class="mt-auto mb-4" color="secondary">
      <v-icon>{{ drawer ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
    </v-btn>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { logoutService } from '@/services/auth.service'

const props = defineProps<{ drawer: boolean }>()
const emit = defineEmits(['toggle-drawer'])

const router = useRouter()
const authStore = useAuthStore()

const goTo = (routeName: string) => {
  router.push({ name: routeName })
}

const logout = async () => {
  try {
    await logoutService()
  } catch (error) {
    console.error('Error en logout')
  } finally {
    authStore.logout()
    router.push({ name: 'Home' })
  }
}
</script>
