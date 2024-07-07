import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/'
});

export default {
  install: (app) => {
    app.config.globalProperties.$axios = instance;
  }
};
