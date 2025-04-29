<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center text-center">
    <v-card class="pa-8" elevation="8" max-width="400">
      <v-card-title class="text-h5 font-weight-bold mb-4"> Iniciar Sesión </v-card-title>
      <v-text-field label="Usuario" v-model="username" outlined dense />
      <v-text-field label="Contraseña" v-model="pass" type="password" outlined dense />
      <v-btn color="primary" class="mt-4" @click="login">Ingresar</v-btn>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { loginService } from '@/services/auth.service'

const router = useRouter()
const authStore = useAuthStore()
const username = ref('')
const pass = ref('')
const errorMessage = ref('')

const login = async () => {
  try {
    const response = await loginService(username.value, pass.value)

    authStore.login(response.accessToken, response.user.role)

    if (response.user.role === 'admin') {
      router.push('admin-dashboard')
    } else {
      router.push('user-dashboard')
    }
  } catch (error) {
    errorMessage.value = 'Usuario o contraseña incorrectos'
  }
}
</script>
