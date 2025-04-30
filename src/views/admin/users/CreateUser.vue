<template>
  <v-dialog v-model="isOpen" max-width="500">
    <v-card>
      <v-card-title>Crear Usuario</v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-text-field v-model="localUser.username" label="Usuario" required />
          <v-text-field v-model="localUser.fullName" label="Nombre completo" required />
          <v-select v-model="localUser.role" :items="['admin', 'user']" label="Rol" required />
          <v-text-field v-model="localUser.picture" label="URL de imagen" />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="tonal" @click="cancel">Cancelar</v-btn>
        <v-btn variant="tonal" color="primary" @click="submit">Crear</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePost } from '@/composables/api'
import { Usuario } from '@/interfaces'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue', 'saved'])

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

const localUser = ref<Omit<Usuario, 'id'>>({
  username: '',
  fullName: '',
  role: 'user',
  picture: '',
})

const cancel = () => {
  isOpen.value = false
}

const submit = async () => {
  const { execute } = usePost('/users')
  await execute(localUser.value)
  emit('saved')
  isOpen.value = false
}
</script>
