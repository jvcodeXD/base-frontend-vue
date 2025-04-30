<template>
  <v-container>
    <v-row>
      <v-btn color="primary" class="mb-4" @click="openCreate">Crear usuario</v-btn>

      <CreateUser v-model="modalCreate" @saved="reloadUsuarios" />
      <EditUser
        v-if="selectedUser"
        v-model="modalEdit"
        :user="selectedUser"
        @saved="reloadUsuarios"
      />

      <v-col v-for="user in usuarios" :key="user.id" cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-img :src="`http://localhost:4000${user.picture}`" height="180" cover />
          <v-card-title>{{ user.fullName }}</v-card-title>
          <v-card-subtitle>{{ user.username }}</v-card-subtitle>
          <v-card-text>Rol: {{ user.role }}</v-card-text>
          <v-card-actions>
            <v-btn variant="elevated" color="primary" density="compact" @click="editUser(user)">
              <v-icon start>mdi-pencil</v-icon>
              Editar
            </v-btn>

            <v-btn variant="elevated" color="error" density="compact" @click="confirmDelete(user)">
              <v-icon start>mdi-delete</v-icon>
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useGet } from '@/composables/api/useGet'
import { useDelete } from '@/composables/api/useDelete'
import { useConfirmDialog } from '@/composables/useConfirmDialog'
import { CreateUser, EditUser } from '.'
import { Usuario } from '@/interfaces'
import { ref } from 'vue'

const { data: usuarios, execute: reloadUsuarios } = useGet<Usuario[]>('/users')
const { show } = useConfirmDialog()

const modalCreate = ref(false)
const modalEdit = ref(false)
const selectedUser = ref<Usuario | null>(null)

const openCreate = () => {
  selectedUser.value = null
  modalCreate.value = true
}

const editUser = (user: Usuario) => {
  selectedUser.value = user
  modalEdit.value = true
}

const confirmDelete = async (usuario: Usuario) => {
  const confirmed = await show(`¿Deseas eliminar a ${usuario.fullName}?`, 'warning')
  if (!confirmed) return

  const { execute } = useDelete(`/usuarios/${usuario.id}`)
  await execute()
  reloadUsuarios()
}
</script>
