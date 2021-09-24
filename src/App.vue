<template>
  <Navbar />
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {

  name: "App",
  components: {
    Navbar,
  },
  data: () => ({
    //
  }),
};

</script>

<style lang="scss">
  * {
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
</style>
