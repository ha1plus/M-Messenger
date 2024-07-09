<script setup>
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  conversation: Object
})
</script>

<template>
  <RouterLink
    :to="'/conversation/' + conversation._id"
    class="flex items-center text-sm rounded-full md:pl-3 mb-3 w-full text-left"
  >
    <div class="bg-white text-black py-2 px-3 rounded-full">
      {{ props.conversation.name.substring(0, 1).toUpperCase() }}
    </div>
    <div class="flex-1 ml-3">
      <h3 class="text-lg text-gray-100">
        {{ props.conversation.name }}
      </h3>
    </div>
  </RouterLink>
</template>
