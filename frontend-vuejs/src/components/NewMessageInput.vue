<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <input
    type="text"
    placeholder="Type a message"
    class="w-full p-2 border border-gray-300 rounded-l resize-none overflow-y-auto max-h-40"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<style scoped>
/* Add any additional styles needed */
</style>
