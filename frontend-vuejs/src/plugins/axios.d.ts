declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: typeof axios;
  }
}

export default {
  install: (app: any) => {
    app.config.globalProperties.$axios = instance;
  }
};
