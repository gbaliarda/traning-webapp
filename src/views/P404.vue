<template>
  <div class="container">
    <v-icon class="icon" size="250px">mdi-emoticon-dead</v-icon>
    <p>Página no encontrada</p>
    <router-link to="/" class="go-home">Ir al inicio</router-link>
  </div>
</template>

<script>
export default {
  name: "P404",
  components: {
  }
};
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -60px;

    .icon {
      color: #EA8D59;
    }

    p {
      font-size: 2em;
      margin-bottom: 35px;
      font-weight: 300;
    }

    .go-home {
      color: #fff;
      padding: .6em 1.6em;
      background: #EA8D59;
      border-radius: 10px;
    }
  }
</style>
