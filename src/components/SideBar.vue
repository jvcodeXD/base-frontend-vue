<template>
  <v-navigation-drawer app :permanent="true" :width="drawer ? 240 : 72" color="primary" dark>
    <!-- Lista de navegación -->
    <v-list dense nav>
      <v-list-item link :to="{ name: 'Home' }">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <!-- Mostrar título solo si NO está colapsado -->
        <v-list-item-title v-if="drawer">Home</v-list-item-title>
      </v-list-item>

      <v-list-item link :to="{ name: 'About' }">
        <v-list-item-icon>
          <v-icon>mdi-information</v-icon>
        </v-list-item-icon>
        <v-list-item-title v-if="drawer">About</v-list-item-title>
      </v-list-item>
    </v-list>

    <!-- Botón para colapsar/expandir -->
    <v-btn icon @click="$emit('toggle-drawer')" class="mt-auto mb-4" color="secondary">
      <v-icon>{{ drawer ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
    </v-btn>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
defineProps<{ drawer: boolean }>()
defineEmits(['toggle-drawer'])
</script>
