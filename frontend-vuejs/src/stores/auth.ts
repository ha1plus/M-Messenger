import { defineStore } from 'pinia';
import axios from 'axios';

interface AuthState {
  token: string | null;
  user: {
    _id: string;
    name: string;
    email: string;
  } | null;
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    token: null,
    user: null
  }),
  actions: {
    initializeTokenFromCookie() {
      const tokenFromCookie = this.getTokenFromCookie();
      if (tokenFromCookie) {
        this.setToken(tokenFromCookie);
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        this.fetchUserData(); // Example: Fetch user data after setting token
      }
    },
    setToken(token: string | null) {
      this.token = token;
    },
    setUser(user: { _id: string; name: string; email: string }) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
    clearToken() {
      this.token = '';
    },
    async fetchUserData() {
      try {
        const response = await axios.get('/user', {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        this.setUser(response.data); // Assuming API returns user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    getTokenFromCookie(): string | null {
      const name = 'auth=';
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookie.split(';');
      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
        }
      }
      return null;
    }
  }
});
