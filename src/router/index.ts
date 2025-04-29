import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Login from '@/views/auth/Login.vue'
import AdminDashboard from '@/views/dashboard/AdminDashboard.vue'
import UserDashboard from '@/views/dashboard/UserDashboard.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/login', name: 'Login', component: Login },
  { path: '/admin-dashboard', name: 'AdminDashboard', component: AdminDashboard },
  { path: '/user-dashboard', name: 'UserDashboard', component: UserDashboard },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
