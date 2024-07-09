import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Conversation from '../components/Conversation.vue'
import { useAuthStore } from '../stores/auth' // Adjust path as needed

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home', // Redirect '/' to '/home'
    },
    {
      path: '/conversation/:id',
      name: 'conversation',
      component: Conversation,
      meta: { requiresAuth: true } // Requires authentication
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true } // Requires authentication
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresNoAuth: true } // No authentication required
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresNoAuth: true } // No authentication required
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue') // Lazy-loaded component
    }
  ]
})


router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  // Ensure that the token is initialized from cookie
  store.initializeTokenFromCookie()
  // Check if route requires authentication
  if (to.meta.requiresAuth && !store.token) {
    // If user needs authentication and no token exists, redirect to login
    next({ name: 'login' })
  } else if (to.meta.requiresNoAuth && store.token) {
    // If user is authenticated and tries to access login or register, redirect to home
    next({ name: 'home' })
  } else {
    next() // Proceed to the requested route
  }
})


export default router
