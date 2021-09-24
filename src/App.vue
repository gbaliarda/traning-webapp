<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: "App",
  components: {
    Navbar,
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
