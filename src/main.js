import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  async beforeCreate() {
    await this.$store.dispatch('security/initialize')
  },
  render: (h) => h(App),
}).$mount("#app");
