import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const instance = axios.create({
    baseURL: 'http://localhost:3000/'
});

instance.interceptors.request.use(config => {
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers['Authorization'] = `Bearer ${authStore.token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default {
  install: (app) => {
    app.config.globalProperties.$axios = instance;
  }
};
