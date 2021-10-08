<template>
  <div class="login" id="login">
    <div class="login-content" id="login-content">
      <v-icon class="closeBtn">mdi-close</v-icon>
      <h2 class="title">Iniciar Sesion</h2>
      <hr class="loginBar">

      <div class="formContent">
        <input type="email" placeholder="email..." class="input" id="loginUser" />
        
        <div class="passwordBox">
          <input type="password" placeholder="contraseña..." class="input" id="loginPassword" />
          <div @click="hideFirstEye">
            <v-icon class="passwordEyeBtn" id="loginEyeBox1_1">mdi-eye</v-icon>
            <v-icon class="passwordEyeBtn" id="loginEyeBox1_2">mdi-eye-off</v-icon>
          </div>
        </div>
        <a class="restrictionText">¿Olvidaste tu contraseña?</a>

        <button @click="login()" class="loginBtn" >Iniciar Sesion</button>
        <p class="loginText">No tienes una cuenta?<br>
        <button class="registerText" id="loginToRegister">Registrate</button> ahora</p>
      </div>
    </div>
    <div class="verifyLoginEmail">
      <h2 class="title">Verifica tu e-mail</h2>
      <hr>
      <input type="text" placeholder="inserte el codigo..." class="input" id="verifyLoginCode" /> 
      <p class="resendEmail" @click="resendLoginEmail()">Reenviar e-mail de verifiacion</p>
      <input type="button" value="Verificar" @click="verifyLoginEmail()" class="verifyBtn" />
    </div>
    <div class="loginBackground"></div>
  </div>
</template>

<script>
import Button from './micro-components/Button.vue';
import { Credentials } from '../../api/user';
import { Api } from '../../api/api';
import { mapActions } from 'vuex';

export default {
  name: "login",
  components: {
    Button,
    Credentials,
  },
  data() {
    return {
      result: null,
      user: '',
      password: '',
    }
  },
  mounted: function() {
    document.querySelector(".loginBackground").addEventListener("click", () => {
      document.querySelector(".login").style.display = "none";
    })

    document.querySelector(".login .closeBtn").addEventListener("click", () => {
      document.querySelector(".login").style.display = "none";
    })
  },
  methods: {
    ...mapActions('security', {
      $login: 'login',
    }),
    hideFirstEye: function() {
      var x = document.getElementById("loginPassword");
      var y = document.getElementById("loginEyeBox1_2");
      var z = document.getElementById("loginEyeBox1_1");

      if(x.type === 'password') {
        x.type = "text";
        y.style.display = "block";
        z.style.display = "none";
      } else {
        x.type = "password";
        y.style.display = "none";
        z.style.display = "block";
      }
    },
    setResult(result){
      this.result = JSON.stringify(result, null, 2)
    },
    clearResult() {
      this.result = null
    },
    async login() {
      try {
        this.user = document.getElementById('loginUser').value;
        this.password = document.getElementById('loginPassword').value;
        const credentials = new Credentials(this.user, this.password);
        console.log(credentials);
        await this.$login({credentials, rememberMe: true });
        this.clearResult();
        document.querySelector(".login").style.display = "none";
        this.$router.push('/rutinas');
      } catch (e) {
        this.setResult(e);
        if(e.code === 8 && e.details[0] === 'Email not verified') {
          document.querySelector('.login-content').style.display = "none";
          document.querySelector('.verifyLoginEmail').style.display = "block";
        }
        console.log(e);
      }
    },
    async verifyLoginEmail() {
      try {
        const verifyCode = document.getElementById('verifyLoginCode').value;
        const url = `${Api.baseUrl}/users/verify_email`;

        const data = { "email": this.user, "code": verifyCode };
        const result = await Api.post(url, false, data);

        document.querySelector('.signup-content').style.display = "block";
        document.querySelector('.login-content').style.display = "block";
        document.querySelector('.verifyLoginEmail').style.display = "none";
        document.querySelector('.verifyEmail').style.display = "none";
        document.querySelector('.login').style.display="none";
        const credentials = new Credentials(this.user, this.password);

        this.$login({credentials, rememberMe: true });
        this.clearResult();
        this.$router.push('/rutinas');
      } catch(e) {
        this.setResult(e);
        console.log(e);
      }
    },
    async resendLoginEmail() {
      try {
        const url = `${Api.baseUrl}/users/resend_verification`;
        const data = {'email': this.user};
        const result = await Api.post(url ,false, data);
        this.clearResult();
      } catch(e) {
        this.setResult(e);
        console.log(e);
      }
    },
  }
}
</script>

<style scoped lang="scss">
  .login {
    display: none;
    position: fixed; 
    transition: 200ms ease-in-out;
    width: 100%;
    height: 100%;
    top: 0;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 2;

    .verifyLoginEmail {
      display: none;

      height: 350px;
      width: 600px;
      background: #fff;
      padding: 20px;
      border-radius: 5px;
      position: relative;
      z-index: 10;

      .resendEmail {
        color: #444;
        margin-top: 0.6em;
        margin-left: 2.4em;
        cursor: pointer;
        text-align: left;
      }

      .input {
        margin-top: 2.5em;
        border: 1px solid #bfbfbf;
        border-radius: 10px;
        width: 90%;
        height: 40px;
        padding-left: .8em;
      }

      .verifyBtn {
        margin-top: 3.5em;
        width: 35%;
        background: #DA611B;
        padding: 0.7em;
        border-radius: .6em;
        color: #fff;
      }

      .title {
      font-size: 30px;
      font-weight: 300;
      margin-bottom: .3em;
      margin-top: .5em;
      }

      hr {
        width: 90%;
        background-color: #DA611B;
        height: 1px;
        border: none;
        margin: auto;
        margin-bottom: .5em;
      }
    }

    .loginBackground {
      background-color: rgba(0, 0, 0, 0.6);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .login-content {
      height: 500px;
      width: 500px;
      background: #fff;
      padding: 20px;
      border-radius: 5px;
      position: relative;
      z-index: 10;

      .title {
        font-size: 30px;
        font-weight: 300;
        margin-bottom: .3em;
        margin-top: .5em;
      }

      hr {
        width: 90%;
        background-color: #DA611B;
        height: 1px;
        border: none;
        margin: auto;
        margin-bottom: .5em;
      }

      .loginBar {
        margin-bottom: 3em;
      }

      .closeBtn {
        position: absolute;
        right: 10px;
        top: 10px;
        color: #D6601D;
        cursor: pointer;
      }
    }


    .formContent {
      .loginText {
        margin-top: 1.5em;
        font-size: 16px;

        .registerText {
          color: #DA611B;
        }
      }

      .loginBtn {
        margin-top: 2.5em;
        width: 35%;
        background: #DA611B;
        padding: 0.7em;
        border-radius: .6em;
        color: #fff;
      }

      .restrictionText {
        color: black;
        opacity: 0.5;
        font-size: 14px;
        display: block;
        text-align: left;
        margin-top: .5em;
        margin-left: 2em;
        cursor: pointer;
      }

      .namesDiv {
        display: flex;
        justify-content: space-around;
      }
      
      .input {
        margin-top: 1.5em;
        border: 1px solid #bfbfbf;
        border-radius: 10px;
        width: 90%;
        height: 40px;
        padding-left: .8em;
      }

      .passwordBox {
        position: relative;
      }

      #loginEyeBox1_2, #eyeBox2_2 {
        display: none;
      }
      
      #loginEyeBox1_1, #eyeBox2_1 {
        display: block;
      }

      .passwordEyeBtn {
        position: absolute;
        right: 1.5em;
        top: 1.3em;
        cursor: pointer;
      }

      .input.nameInput {
        width: 40%;
      }
    }

  }
</style>