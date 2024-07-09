<script setup>
import { getCurrentInstance, ref, onMounted, onUpdated, watch } from 'vue'
import { useRoute } from 'vue-router'
import ConversationHeader from './ConversationHeader.vue'
import MessageInput from './MessageInput.vue'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const store = useAuthStore()
const { appContext } = getCurrentInstance()
const { $axios } = appContext.config.globalProperties
const receiver = ref(null)
const chatId = ref(0)
const lastestMessage = ref(null)

const fetchAndAccessChats = async () => {
  try {
    const response = await $axios.get(`/conversation/${route.params.id}`)
    const users = response.data.users
    lastestMessage.value = response.data.lastestMessage
    receiver.value = users.find((user) => user._id !== store?.user._id)
    chatId.value = response.data._id
  } catch (error) {
    console.error('Error fetching conversation:', error)
  }
}

onMounted(() => {
  fetchAndAccessChats()
})

watch(
  () => route.params.id,
  () => {
    fetchAndAccessChats()
  }
)
</script>

<template>
  <div class="flex flex-col h-screen relative">
    <div class="flex-grow overflow-auto">
      <ConversationHeader :receiver="receiver" />
      <div class="px-3">
        <div v-if="store?.user._id != lastestMessage?.receiver">
          <div class="chat chat-end">
            <div class="chat-bubble">{{ lastestMessage?.content }}</div>
          </div>
        </div>
        <div v-else>
          <div v-if="lastestMessage?.content">
            <div class="chat chat-start">
              <div class="chat-bubble">{{ lastestMessage?.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="input-container">
      <MessageInput :chatId="chatId" />
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
