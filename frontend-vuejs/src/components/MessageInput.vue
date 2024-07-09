<script setup>
import { getCurrentInstance, defineProps, ref } from 'vue'
import NewMessageInput from './NewMessageInput.vue'

const props = defineProps({
  chatId: {
    type: Number,
    required: true
  }
})

const newMessage = ref('')
const messageSending = ref(false)
const { appContext } = getCurrentInstance()
const { $axios } = appContext.config.globalProperties

const onSendClick = () => {
  if (newMessage.value.trim() === '') {
    console.log('Please provide a message or upload attachments')
    return
  }

  messageSending.value = true
  console.log('Sending message:', newMessage.value)
  console.log('chat id:', props.chatId)

  $axios
    .post(`/message`, {
      content: newMessage.value,
      chatId: props.chatId
    })
    .then((response) => {
      console.log('Message sent successfully:', response.data)
      newMessage.value = '' // Clear input after successful submission
      messageSending.value = false
    })
    .catch((error) => {
      console.error('Error sending message:', error.message)
      messageSending.value = false
    })
}
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
