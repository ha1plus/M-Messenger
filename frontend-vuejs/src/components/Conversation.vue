<script setup>
import { getCurrentInstance, ref, onMounted, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import ConversationHeader from './ConversationHeader.vue'
import MessageInput from './MessageInput.vue'
import { useAuthStore } from '@/stores/auth'
import { io } from 'socket.io-client'

const route = useRoute()
const store = useAuthStore()
const { appContext } = getCurrentInstance()
const { $axios } = appContext.config.globalProperties
const receiver = ref(null)
const chatId = ref(0)
const messageEmit = ref('')
const messages = ref([])

const socket = io('http://localhost:3000/')

const fetchAndAccessChats = async () => {
  try {
    const response = await $axios.get(`/conversation/${route.params.id}`)
    const users = response.data.users
    messages.value = [response.data.lastestMessage]
    receiver.value = users.find((user) => user._id !== store?.user._id)
    console.log(receiver.value)
    chatId.value = response.data._id

    // Join the chat room
    socket.emit('join chat', chatId.value)
  } catch (error) {
    console.error('Error fetching conversation:', error)
  }
}

onMounted(() => {
  fetchAndAccessChats()

  // Set up socket listener for new messages
  socket.on('new message', (message) => {
    // console.log('New message received:', message)
    messages.value.push(message) // Append new message to the messages array
  })
})

watch(
  () => route.params.id,
  () => {
    fetchAndAccessChats()
  }
)

// Clean up socket listener on unmount
onUnmounted(() => {
  socket.off('new message')
})
</script>

<template>
  <div class="flex flex-col h-screen relative">
    <div class="flex-grow overflow-auto">
      <ConversationHeader :receiver="receiver" />
      <div class="px-3">
        <div v-for="message in messages" :key="message?._id">
          <div v-if="message?.content !== undefined && message?.content !== ''">
            <div v-if="receiver?._id != message?.sender">
              <div class="chat chat-end">
                <div class="chat-bubble">{{ message?.content }}</div>
              </div>
            </div>
            <div v-else>
              <div class="chat chat-start">
                <div class="chat-bubble">{{ message?.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="input-container">
      <MessageInput :chatId="chatId" v-model="messageEmit" />
    </div>
  </div>
</template>

<style scoped>
.input-container {
  position: absolute;
  bottom: 60px;
  right: 0;
  left: 0;
  max-width: 100%;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
</style>
