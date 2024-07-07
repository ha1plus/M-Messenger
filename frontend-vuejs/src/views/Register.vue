<script setup>
import { reactive } from 'vue'
import { getCurrentInstance } from 'vue'
import { useAuthStore } from '../stores/auth'
import router from '../router/index'

const { appContext } = getCurrentInstance()
const { $axios } = appContext.config.globalProperties

const store = useAuthStore()

// Define reactive properties for form data
const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Function to handle form submission
const handleRegister = async (event) => {
  event.preventDefault()

  if (formData.password !== formData.confirmPassword) {
    console.error('Passwords do not match')
    return
  }

  try {
    $axios
      .post('/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      .then((response) => {
        if (response.status === 201) {
          const { token } = response.data
          store.setToken(token)
          document.cookie = `auth=${token};`
          $axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          router.push({ name: 'home' })
        }
      })
  } catch (error) {
    console.error('Error registering user:', error)
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <form @submit="handleRegister" class="max-w-sm w-full">
      <div class="relative z-0 w-full mb-5 group">
        <input
          v-model="formData.name"
          type="text"
          name="floating_name"
          id="floating_name"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_name"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >User Name</label
        >
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input
          v-model="formData.email"
          type="email"
          name="floating_email"
          id="floating_email"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_email"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Email address</label
        >
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input
          v-model="formData.password"
          type="password"
          name="floating_password"
          id="floating_password"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_password"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Password</label
        >
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input
          v-model="formData.confirmPassword"
          type="password"
          name="repeat_password"
          id="floating_repeat_password"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_repeat_password"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Confirm password</label
        >
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Register
      </button>
      <p class="text-center mt-4">
        Already have an account
        <a
          href="/login"
          class="text-blue-700 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-300"
          >Log in</a
        >
      </p>
    </form>
  </div>
</template>
