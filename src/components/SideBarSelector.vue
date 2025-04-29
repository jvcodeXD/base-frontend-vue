<template>
  <component :is="sidebarComponent" :drawer="drawer" @toggle-drawer="$emit('toggle-drawer')" />
</template>

<script setup lang="ts">
import { AdminSideBar, PublicSideBar, UserSideBar } from './sidebars'
import { useAuthStore } from '@/store/auth'
import { computed } from 'vue'

const props = defineProps<{ drawer: boolean }>()
const emit = defineEmits(['toggle-drawer'])

const authStore = useAuthStore()

const sidebarComponent = computed(() => {
  if (authStore.isAuthenticated) {
    if (authStore.role === 'admin') {
      return AdminSideBar
    } else if (authStore.role === 'user') {
      return UserSideBar
    }
  }
  return PublicSideBar
})
</script>
