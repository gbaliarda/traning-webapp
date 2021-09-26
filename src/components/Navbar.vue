<template>
  <div>
    <nav>
      <router-link to="/" class="logo">traning</router-link>
      <div class="links">
        <router-link to="/">Inicio</router-link>
        <a href="#herramientas">Herramientas</a>
        <button class="register" id="register">Registrarse</button>
        <button id="loginBtn">Acceder</button>
      </div>
    </nav>
    <Signup />
    <Login />
  </div>
</template>

<script>
import Signup from './Signup.vue'
import Login from './Login.vue'


export default {
  name: "Navbar",
  components: {
    Signup,
    Login
  },
  mounted: function() {
    document.getElementById("register").addEventListener("click", function() {
      document.querySelector(".signup").style.display = "flex";
    });

    document.getElementById("loginBtn").addEventListener("click", function() {
      document.querySelector(".login").style.display = "flex";
    });

    document.getElementById("loginToRegister").addEventListener("click", function() {
      document.querySelector(".signup").style.display = "flex";
      document.querySelector(".login").style.display = "none";
    });

    document.getElementById("registerToLogin").addEventListener("click", function() {
      document.querySelector(".signup").style.display = "none";
      document.querySelector(".login").style.display = "flex";
    });
  }
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
        text-transform: none;
        font-weight: 400;
        box-shadow: none;
        letter-spacing: inherit;
        font-size: inherit;
      }
    }
  }

</style>
