import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Login from '@/views/auth/Login.vue'
import AdminDashboard from '@/views/dashboard/AdminDashboard.vue'
import UserDashboard from '@/views/dashboard/UserDashboard.vue'
import NotFound from '@/views/NotFound.vue'
import { useAuthStore } from '@/store/auth'

// Definición de rutas
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/user-dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true, role: 'user' },
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Middleware Global
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 1. Proteger rutas privadas
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      next({ name: 'Login' })
      return
    }

    if (to.meta.role && to.meta.role !== authStore.role) {
      if (authStore.role === 'admin') {
        next({ name: 'AdminDashboard' })
      } else if (authStore.role === 'user') {
        next({ name: 'UserDashboard' })
      } else {
        next({ name: 'Home' })
      }
      return
    }
  }

  // 2. Proteger rutas públicas para logueados
  const publicRoutes = ['Home', 'About', 'Login']
  if (authStore.isAuthenticated && publicRoutes.includes(to.name as string)) {
    if (authStore.role === 'admin') {
      next({ name: 'AdminDashboard' })
    } else if (authStore.role === 'user') {
      next({ name: 'UserDashboard' })
    } else {
      next({ name: 'Home' })
    }
    return
  }

  next()
})

export default router
