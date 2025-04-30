import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Login from '@/views/auth/Login.vue'
import AdminDashboard from '@/views/dashboard/AdminDashboard.vue'
import UserDashboard from '@/views/dashboard/UserDashboard.vue'
import NotFound from '@/views/NotFound.vue'
import { useAuthStore } from '@/store/auth'
import Users from '@/views/admin/users/Users.vue'

// Definición de rutas
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'auth' },
  },
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
  {
    path: '/user-dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true, role: 'user' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { layout: 'error' },
  },
]

// Crear router
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Middleware Global de protección de rutas
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Si la ruta requiere autenticación
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

  // Si estás autenticado y quieres ir al Login
  if (authStore.isAuthenticated && to.name === 'Login') {
    if (authStore.role === 'admin') {
      next({ name: 'AdminDashboard' })
    } else if (authStore.role === 'user') {
      next({ name: 'UserDashboard' })
    } else {
      next({ name: 'Home' })
    }
    return
  }

  // Permitir todo lo demás
  next()
})

export default router
