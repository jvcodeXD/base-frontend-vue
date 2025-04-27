<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center text-center">
    <v-card class="pa-8" elevation="8" max-width="600">
      <v-card-title class="text-h4 font-weight-bold mb-4">
        Bienvenido a Mi Aplicación
      </v-card-title>
      <v-card-text class="mb-6">
        Explora las secciones públicas o inicia sesión para acceder a funciones exclusivas.
      </v-card-text>

      <v-row class="justify-center">
        <v-btn color="primary" class="ma-2" @click="goTo('Home')"> Ir a Home </v-btn>
        <v-btn color="secondary" class="ma-2" @click="goTo('About')"> Sobre Nosotros </v-btn>
        <v-btn color="success" class="ma-2" @click="goTo('Login')"> Iniciar Sesión </v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goTo = (routeName: string) => {
  router.push({ name: routeName })
}
</script>
