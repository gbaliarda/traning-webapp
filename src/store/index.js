import Vue from 'vue';
import Vuex from 'vuex';
import security from '@/store/modules/security';
import rutinas from '@/store/modules/rutinas'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    security,
    rutinas
  }
})
