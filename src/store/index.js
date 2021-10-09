import Vue from 'vue';
import Vuex from 'vuex';
import security from '@/store/modules/security';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showing: false
  },
  mutations: {
    setShowing(state, showing) {
      state.showing = showing;
    }
  },
  actions: {
  },
  modules: {
    security,
  }
})
