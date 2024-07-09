<script setup>
import { onMounted, ref } from 'vue'
import { getCurrentInstance } from 'vue'
import { RouterLink } from 'vue-router'
import ConversationItem from '@/components/ConversationItem.vue'

const { appContext } = getCurrentInstance()
const { $axios } = appContext.config.globalProperties
const conversations = ref([])
const searchQuery = ref('')

onMounted(() => {
  getUsers()
})

function getUsers() {
  $axios
    .get('/users')
    .then((response) => {
      if (response.status === 200) {
        conversations.value = response.data
      }
    })
    .catch((error) => {
      console.error('Error fetching conversations:', error)
    })
}
</script>

<template>
  <!-- Left sidebar -->
  <div class="col-span-2 w-full bg-black">
    <div class="transition-all w-full sm:w-[220px] md:w-full flex flex-col overflow-hidden">
      <div class="p-3">
        <label
          class="input flex items-center gap-2 border border-gray-300 rounded-lg px-2 py-1 focus-within:border-gray-300 transition-colors"
        >
          <input
            type="text"
            v-model="searchQuery"
            @keyup="onSearch"
            placeholder="Search..."
            class="w-full border-none outline-none p-2 text-base placeholder-gray-500 focus:border-gray-300"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70 transition-opacity"
          >
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div class="flex-1 overflow-auto">
        <ul>
          <li v-for="conversation in conversations" :key="conversation._id">
            <ConversationItem :conversation="conversation" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
