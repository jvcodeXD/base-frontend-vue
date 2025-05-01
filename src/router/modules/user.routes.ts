import UserDashboard from '@/views/dashboard/UserDashboard.vue'

export default [
  {
    path: '/user-dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true, role: 'user' },
  },
]
