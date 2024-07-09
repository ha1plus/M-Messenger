<script setup>
const props = defineProps({
  receiver: {
    type: Object,
    default: () => null
  }
})
</script>

<template>
  <div class="navbar bg-base-300 flex items-center justify-between">
    <div class="bg-black text-white py-2 px-3 rounded-full">
      {{ props.receiver?.name.substring(0, 1).toUpperCase()}}
    </div>
    <RouterLink to="/home" class="btn bg-black text-white hover:bg-red-500">
    Back
  </RouterLink>
  </div>
</template>

<style scoped>
/* Add scoped styles as needed */
</style>
