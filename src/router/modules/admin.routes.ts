import AdminDashboard from '@/views/dashboard/AdminDashboard.vue'
import Users from '@/views/admin/users/Users.vue'

export default [
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/usuarios',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true, role: 'admin' },
  },
]
