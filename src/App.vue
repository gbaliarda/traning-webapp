<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import {mapState, mapGetters} from 'vuex'

export default {
  name: "App",
  components: {
    Navbar,
  },
  data() {
    return {
      result: null,
    }
  },
  computed: {
    ...mapState('security', {
      $user: state => state.user,
    }),
    ...mapGetters('security', {
      $isLoggedIn: 'isLoggedIn'
    }),
    canCreate() {
      return this.$isLoggedIn && !this.sport
    },
    canOperate() {
      return this.$isLoggedIn && this.sport
    },
    canAbort() {
      return this.$isLoggedIn && this.controller
    }
  },
};

</script>

<style lang="scss">
  * {
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  html {
    scroll-behavior: smooth;
  }

  html::-webkit-scrollbar {
      width: 10px;
  }
  
  html::-webkit-scrollbar-track {
      border-radius: 150px;
      background: white;
  }
  
  html::-webkit-scrollbar-thumb {
      background:#DA611B;
      border-radius: 150px;
  }
</style>
