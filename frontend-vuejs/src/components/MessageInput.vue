<script setup>
import { getCurrentInstance, defineProps, ref, onMounted, onUnmounted, watch } from 'vue'
import NewMessageInput from './NewMessageInput.vue'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000/')

const props = defineProps({
  chatId: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Object
  }
})

const newMessage = ref('')
const messageSending = ref(false)
const { appContext } = getCurrentInstance()
const { $axios } = appContext.config.globalProperties

const emit = defineEmits(['update:modelValue'])

const onSendClick = () => {
  if (newMessage.value.trim() === '') {
    console.log('Please provide a message or upload attachments')
    return
  }

  messageSending.value = true
  $axios
    .post(`/message`, {
      content: newMessage.value,
      chatId: props.chatId
    })
    .then((response) => {
      const newMessageEmit = {
        _id: response.data._id,
        content: response.data.content,
        sender: response.data?.sender._id,
        receiver: response.data?.receiver._id,
        chatId: props.chatId
      }
      newMessage.value = ''
      messageSending.value = false
      socket.emit('new message', newMessageEmit)
    })
    .catch((error) => {
      console.error('Error sending message:', error)
      messageSending.value = false
    })
}

watch(
  () => props.chatId,
  (newValue) => {
    socket.emit('join chat', newValue)
  }
)

onMounted(() => {
  socket.on('new message', (receivedMessage) => {
    console.log('New message received:', receivedMessage)
    emit('update:modelValue', receivedMessage)
  })
})

onUnmounted(() => {
  socket.off('new message') // Clean up the event listener when the component is unmounted
})
</script>

<template>
  <div class="flex flex-wrap items-start border-t border-slate-700 py-3">
    <div class="order-1 px-3 xs:p-0 min-w-[220px] basis-full xs:basis-0 xs:order-2 flex-1 relative">
      <div class="flex">
        <NewMessageInput v-model="newMessage" />
        <button
          class="btn btn-info text-white rounded-l-none"
          @click="onSendClick"
          :disabled="messageSending"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles needed */
</style>
