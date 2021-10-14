<template>
  <div class="login" id="login">
    <div class="login-content" id="login-content">
      <v-icon class="closeBtn">mdi-close</v-icon>
      <h2 class="title">Iniciar Sesion</h2>
      <hr class="loginBar">

      <div class="formContent">
        <input type="email" placeholder="Email*" class="input" id="loginUser" :class="{ 'error' : invalidUsername()}" />
        <div class="errorTextBox">
          <p class="errorText" :class="{ 'showError' : invalidUsername()}">Usuario invalido</p>
        </div>
        <div class="passwordBox">
          <input type="password" placeholder="Contraseña*" class="input" id="loginPassword" :class="{ 'error' : invalidPassword()}" />
          <div @click="hideFirstEye">
            <v-icon class="passwordEyeBtn" id="loginEyeBox1_1">mdi-eye</v-icon>
            <v-icon class="passwordEyeBtn" id="loginEyeBox1_2">mdi-eye-off</v-icon>
          </div>
          <div class="errorTextBox">
            <p class="errorText" :class="{ 'showError' : invalidPassword()}">Contraseña invalida</p>
          </div>
        </div>
        <a class="restrictionText">¿Olvidaste tu contraseña?</a>

        <div class="registerBtnBox">
          <button v-if="!loading" @click="login()" class="loginBtn" >Iniciar Sesion</button>
          <div v-else class="loadingBtn">
            <Spinner />
          </div>
        </div>
        <p class="loginText">No tienes una cuenta?<br>
        <button class="registerText" id="loginToRegister">Registrate</button> ahora</p>
      </div>
    </div>
    <div class="verifyLoginEmail">
      <v-icon class="goBackArrow" size="30" @click="goBackToLogin">mdi-arrow-left</v-icon>
      <h2 class="title">Verifica tu e-mail</h2>
      <hr>
      <input type="text" placeholder="Inserte el codigo" class="input" id="verifyLoginCode" :class="{ 'error' : invalidEmailVerification()}" /> 
      <div class="errorTextBox">
        <p class="errorText" :class="{ 'showError' : invalidEmailVerification()}">El codigo es invalido</p>
      </div>
      <p class="resendEmail" @click="resendLoginEmail()">Reenviar e-mail de verifiacion</p>

      <div class="registerBtnBox">
        <input v-if="!loadingVerify" type="button" value="Verificar" @click="verifyLoginEmail()" class="verifyBtn" />
        <div v-else class="loadingBtn">
          <Spinner />
        </div>
      </div>
      <div v-if="showVerifyLoginMessage" class="showVerifyLoginMessage" @click="showVerifyLoginMessage = false">
        <p>Codigo de verificacion reenviado</p>
      </div> 
    </div>
    <div class="loginBackground"></div>
  </div>
</template>

<script>
import Button from './micro-components/Button.vue';
import Spinner from "./micro-components/Spinner.vue";
import { Credentials } from '../../api/user';
import { Api } from '../../api/api';
import { mapActions } from 'vuex';

export default {
  name: "login",
  components: {
    Button,
    Credentials,
    Spinner,
  },
  data() {
    return {
      result: '',
      user: '',
      password: '',
      loading: false,
      loadingVerify: false,
      showVerifyLoginMessage: false,
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
    invalidUsername() {
      return this.result.code == 4 && this.result.details[0] === 'Username does not exist';
    },
    invalidPassword() {
      return this.result.code == 4 && this.result.details[0] === 'Password does not match';
    },
    invalidEmailVerification() {
      return this.result.code == 8 && this.result.details[0] == "Invalid verification code";
    },
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
      this.result = result
    },
    clearResult() {
      this.result = ''
    },
    async login() {
      try {
        this.user = document.getElementById('loginUser').value;
        this.password = document.getElementById('loginPassword').value;
        const credentials = new Credentials(this.user, this.password);
        this.loading = true;
        await this.$login({credentials, rememberMe: true });
        this.loading = false;
        this.clearResult();
        document.querySelector(".login").style.display = "none";
        if(this.$router.path != '/rutinas')
          this.$router.push('/rutinas');
      } catch (e) {
        this.setResult(e);
        if(e.code === 8 && e.details[0] === 'Email not verified') {
          document.querySelector('.login-content').style.display = "none";
          document.querySelector('.verifyLoginEmail').style.display = "block";
        }
      }
      this.loading = false;
    },
    async verifyLoginEmail() {
      try {
        const verifyCode = document.getElementById('verifyLoginCode').value;
        const url = `${Api.baseUrl}/users/verify_email`;

        const data = { "email": this.user, "code": verifyCode };
        this.loading = true;
        const result = await Api.post(url, false, data);

        document.querySelector('.signup-content').style.display = "block";
        document.querySelector('.login-content').style.display = "block";
        document.querySelector('.verifyLoginEmail').style.display = "none";
        document.querySelector('.verifyEmail').style.display = "none";
        document.querySelector('.login').style.display="none";
        const credentials = new Credentials(this.user, this.password);

        this.$login({credentials, rememberMe: true });
        this.loading = false;
        this.clearResult();
        this.$router.push('/rutinas');
      } catch(e) {
        this.setResult(e);
        console.log(e);
      }
      this.loading = false;
    },
    async resendLoginEmail() {
      try {
        const url = `${Api.baseUrl}/users/resend_verification`;
        const data = {'email': this.user};
        const result = await Api.post(url ,false, data);
        this.showVerifyLoginMessage = true;
        setTimeout(() => this.showVerifyLoginMessage = false, 4000);
        this.clearResult();
      } catch(e) {
        this.setResult(e);
        console.log(e);
      }
    },
    goBackToLogin() {
      document.querySelector('.login-content').style.display = "block";
      document.querySelector('.verifyLoginEmail').style.display = "none";
    },
  },
  watch: {
    result: function (res) {
      switch(res.code) {
        case 4: {
          switch(res.details[0]) {
            case 'Username does not exist':
              document.querySelector('#loginUser').focus();
              break;
            case 'Password does not match':
              document.querySelector('#loginPassword').focus();
              break;
          }
          break;
        }
      }
    }
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

    .registerBtnBox {
      display: flex;
      justify-content: center;
    }

    .loadingBtn {
      position: relative;
      margin-top: 2.5em;
      width: 35%;
      height: 42px;
      background: #fff;
      padding: 0.7em;
      border: 1px solid #DA611B;
      border-radius: .6em;
      color: #DA611B;
    }


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

    .errorTextBox {
      text-align: left;
    }

    .error{
      border: 1px solid red !important;
    }

    .error:focus {
      outline: none !important;
      border: 2.5px solid red !important;
    }

    .errorText{
      display: none;
      color: red;
      font-size: 14px;
      margin-left: 3em;
    }

    .showError {
      display: inline !important;
      text-align: left !important;
    }

    .goBackArrow {
      color: #da611b;
      cursor: pointer;
      position: absolute;
      left: 3%;
      top: 5%;
      z-index: 11;
    }

    .showVerifyLoginMessage {
      position: fixed;
      background: #333;
      color: white;
      padding: 1em;
      bottom: 20px;
      left: 40%;
      border-radius: 10px;
      cursor: pointer;
    }
  }

  ::-ms-reveal {
    display: none !important;
}
</style>