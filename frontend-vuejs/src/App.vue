<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import TheWelcome from './components/TheWelcome.vue'
import HomeView from './views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const store = useAuthStore()
const route = useRoute()
</script>

<template>
  <div v-if="store.token" id="main">
    <TheWelcome />
    <main>
      <div class="grid grid-cols-12 h-screen overflow-hidden">
        <HomeView />
        <!-- Main content area -->
        <div
          v-if="route.name === 'home'"
          class="col-span-10 flex items-center justify-center bg-gray-100"
        >
          <div>Please select a chat.</div>
        </div>
        <div v-else class="col-span-10">
          <RouterView />
        </div>
      </div>
    </main>
  </div>
  <div v-else>
    <RouterView />
  </div>
</template>

<style scoped>
#main {
  height: 100vh;
  overflow: hidden;
}

#main > div {
  height: 100%;
  overflow: auto;
}
</style>
