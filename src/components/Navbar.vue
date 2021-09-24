<template>
  <nav>
    <router-link to="/" class="logo">traning</router-link>
    <div class="links">
      <router-link to="/">Inicio</router-link>
      <a href="#herramientas">Herramientas</a>
      <button class="register">Registrarse</button>
      <button>Acceder</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped lang="scss">
  nav {
    display: flex;
    width: 90%;
    margin: auto;
    justify-content: space-between;
    align-items: center;
    height: 70px;

    .logo {
      font-size: 1.6em;
    }

    .links {
      * {
        margin-left: 1.3em;
      }

      .register {
        background: #DA611B;
        padding: 0.7em;
        border-radius: .6em;
        color: #fff;
      }
    }
  }
</style>
