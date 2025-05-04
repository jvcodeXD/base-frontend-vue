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
        <UserCard :user="user" @edit="editUser" @delete="confirmDelete" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useConfirmDialog, useToastNotify } from '@/composables'
import { getAllUsers, deleteUser } from '@/services'
import { Usuario } from '@/interfaces'
import { CreateUser, EditUser, UserCard } from '.'

const usuarios = ref<Usuario[]>([])
const { show } = useConfirmDialog()

const modalCreate = ref(false)
const modalEdit = ref(false)
const selectedUser = ref<Usuario | null>(null)
const notify = useToastNotify()

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
  try {
    await deleteUser(usuario.id)
    notify.success('Usuario eliminado correctamente')
    reloadUsuarios()
  } catch (error) {
    notify.error('Error al eliminar el usuario')
  }
}

const reloadUsuarios = async () => {
  const response = await getAllUsers()
  usuarios.value = response
}

onMounted(() => {
  reloadUsuarios()
})
</script>
