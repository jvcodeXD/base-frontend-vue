<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h5"
        >Bienvenido a tu Frontend Base 🚀</v-card-title
      >
      <v-card-text>
        <p>
          Este es tu componente Home. Aquí puedes empezar a construir tu
          aplicación.
        </p>
        <v-btn color="primary" @click="goToAbout">Ir a About</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToAbout = () => {
  router.push({ name: "About" });
};
</script>
