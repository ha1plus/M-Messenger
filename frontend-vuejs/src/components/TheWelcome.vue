<script setup>
import { useAuthStore } from '@/stores/auth'
import { getCurrentInstance, ref, onMounted } from 'vue'
import router from '../router/index'

const store = useAuthStore()
const { appContext } = getCurrentInstance()
const { $axios } = appContext.config.globalProperties

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

onMounted(() => {
  fetchData()
})

const fetchData = () => {
  $axios
    .get('/user', {
      headers: {
        Authorization: `Bearer ${store.token}`
      }
    })
    .then((response) => {
      store.setUser(response.data)
    })
    .catch((error) => {
      console.error('Error fetching user data:', error)
    })
}

const logout = () => {
  store.clearUser()
  store.clearToken()
  document.cookie = 'auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
  router.push('/login')
}
</script>

<template>
  <nav class="bg-gray border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >M Messenger</span
        >
      </a>
      <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button
          type="button"
          class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          @click="toggleDropdown"
        >
          <span class="sr-only">Open user menu</span>
          <p v-if="store.user" class="text-white py-2 px-3 circle-text">
            {{ store.user.name ? store.user.name.substring(0, 1).toUpperCase() : '' }}
          </p>
        </button>
        <!-- Dropdown menu -->
        <div
          class="z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-14 right-0 w-48"
          v-show="isDropdownOpen"
          @click="isDropdownOpen = false"
        >
          <div class="px-4 py-3" v-if="store.user">
            <span class="block text-sm text-gray-900 dark:text-white">{{ store.user.name }}</span>
            <span class="block text-sm text-gray-500 truncate dark:text-gray-400">{{
              store.user.email
            }}</span>
          </div>
          <ul class="py-2">
            <li>
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >Settings</a
              >
            </li>
            <li>
              <a
                href="#"
                @click="logout"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >Sign out</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
#user-menu-button:hover + #user-menu,
#user-menu:hover {
  display: block;
}

#user-menu {
  display: none;
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
}

#user-menu::before {
  content: '';
  position: absolute;
  top: -10px;
  right: 10px;
  width: 10px;
  height: 10px;
  background: red;
}
</style>
