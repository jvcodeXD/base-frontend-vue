import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Login from '@/views/auth/Login.vue'
import AdminDashboard from '@/views/dashboard/AdminDashboard.vue'
import UserDashboard from '@/views/dashboard/UserDashboard.vue'
import { useAuthStore } from '@/store/auth'
import NotFound from '@/views/NotFound.vue'

// Definición de rutas
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' }, // Solo Admins
  },
  {
    path: '/user-dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true, role: 'user' }, // Solo Users
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

// Crear router
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Protecciones globales (Guardias)
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

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

  next()
})

export default router
