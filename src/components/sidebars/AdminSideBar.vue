<template>
  <v-navigation-drawer app :permanent="true" :width="drawer ? 200 : 72" color="primary" dark>
    <v-list dense nav>
      <!-- Perfil -->
      <SidebarProfile
        :name="authStore.user?.name || 'Usuario'"
        :photo="authStore.user?.photo"
        :showName="drawer"
      />

      <v-divider class="my-2" />

      <!-- Navegación -->
      <v-list-item @click="goTo('Home')">
        <v-icon>mdi-home</v-icon>
        <v-list-item-title v-if="drawer">Home</v-list-item-title>
      </v-list-item>

      <v-list-item @click="goTo('About')">
        <v-icon>mdi-information</v-icon>
        <v-list-item-title v-if="drawer">About</v-list-item-title>
      </v-list-item>

      <v-list-item @click="logout">
        <v-icon>mdi-logout</v-icon>
        <v-list-item-title v-if="drawer">Cerrar Sesión</v-list-item-title>
      </v-list-item>
    </v-list>

    <!-- Botón de colapso -->
    <v-btn icon @click="$emit('toggle-drawer')" class="mt-auto mb-4" color="secondary">
      <v-icon>{{ drawer ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
    </v-btn>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore, useToastStore } from '@/store'
import { logoutService } from '@/services'
import { SidebarProfile } from '.'
import { useConfirmDialog, useToastNotify } from '@/composables'

const props = defineProps<{ drawer: boolean }>()
const emit = defineEmits(['toggle-drawer'])

const router = useRouter()
const authStore = useAuthStore()
const toastStore = useToastStore()
const notify = useToastNotify()

const goTo = (routeName: string) => {
  router.push({ name: routeName })
}

const { show } = useConfirmDialog()

const logout = async () => {
  try {
    const confirm = await show('¿Estás seguro de cerrar sesión?', 'info')

    if (!confirm) return

    await logoutService()
    toastStore.addToast('info', 'Sesión cerrada correctamente')
    authStore.logout()
    router.push({ name: 'Home' })
  } catch (error) {
    notify.error('Error en logout')
  }
}
</script>
