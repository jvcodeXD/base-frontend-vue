<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h4"> Bienvenido </v-card-title>
      <v-card-text>
        <p>Esta es la página de inicio pública.</p>
        <p>Si estás autenticado, serás redirigido automáticamente a tu panel.</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { onMounted } from 'vue'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  if (authStore.isAuthenticated) {
    if (authStore.role === 'admin') {
      router.replace({ name: 'AdminDashboard' })
    } else if (authStore.role === 'user') {
      router.replace({ name: 'UserDashboard' })
    }
  }
})
</script>
