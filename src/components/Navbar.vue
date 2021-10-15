<template>
  <div>
    <nav>
      <router-link to="/" class="logo">traning</router-link>
      <div class="links">
        <div class="loggedInBtns" :hidden="!$isLoggedIn">
          <router-link to="/">Inicio</router-link>
          <router-link to="/perfil">Perfil</router-link>
          <router-link to="/ejercicios">Ejercicios</router-link>
          <router-link to="/rutinas">Rutinas</router-link>
          <button @click="logout()" id="logoutBtn">Cerrar Sesión</button>
        </div>
        <div class="noLoggedInBtns" :hidden="$isLoggedIn">
          <button class="register" id="register">Registrarse</button>
          <button id="loginBtn">Acceder</button>
        </div>
      </div>
    </nav>
    <Signup />
    <Login />
  </div>
</template>

<script>
import Signup from './Signup.vue'
import Login from './Login.vue'
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: "Navbar",
  components: {
    Signup,
    Login
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
  },
  methods: {
    ...mapActions('security', {
      $logout: 'logout',
    }),
    setResult(result){
      this.result = JSON.stringify(result, null, 2)
    },
    clearResult() {
      this.result = null
    },
    async logout() {
      await this.$logout();
      if(this.$router.path != '/')
        this.$router.push('/');
      this.clearResult();
    }
  },
  mounted: function() {
    document.getElementById("register").addEventListener("click", function(e) {
      document.querySelector(".signup").style.display = "flex";
      setTimeout(() => document.querySelector(".signup").style.opacity = 1, 5);
    });

    document.getElementById("loginBtn").addEventListener("click", function(e) {
      document.querySelector(".login").style.display = "flex";
      setTimeout(() => document.querySelector(".login").style.opacity = 1, 5);
    });

    document.getElementById("loginToRegister").addEventListener("click", function(e) {
      e.preventDefault();
      console.log("hola");
      document.querySelector(".signup").style.display = "flex";
      setTimeout(() => document.querySelector(".signup").style.opacity = 1, 5);
      
      document.querySelector(".login").style.opacity = 0;
      setTimeout(() => document.querySelector(".login").style.display = "none", 250);
    });

    document.getElementById("registerToLogin").addEventListener("click", function(e) {
      e.preventDefault();
      console.log("hola");
      document.querySelector(".login").style.display = "flex";
      setTimeout(() => document.querySelector(".login").style.opacity = 1, 5);

      document.querySelector(".signup").style.opacity = 0;
      setTimeout(() => document.querySelector(".signup").style.display = "none", 250);
    });
  }
};

</script>

<style scoped lang="scss">
  [hidden] { display: none !important; }

  .router-link-exact-active {
    color: #DA611B;
  }

  nav {
    display: flex;
    width: 90%;
    margin: auto;
    justify-content: space-between;
    align-items: center;
    height: 70px;

    .noLoginBtn {
      display: inline;
    }

    .logo {
      font-size: 1.6em;
      color: #000 !important;
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

      .loggedInBtns, .noLoggedInBtns {
        margin: 0;
        padding: 0;
        display: inline;
      }

      #logoutBtn {
        margin-left: 4rem;
      }
    }
  }

</style>
