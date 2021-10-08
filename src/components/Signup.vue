<template>
  <div class="signup" id="signup">
    <div class="signup-content" id="signup-content">
      <v-icon class="closeBtn">mdi-close</v-icon>
      <h2 class="title">Registrarse</h2>
      <hr>

      <div class="formContent">
        <div class="namesDiv">
          <input type="text" placeholder="nombre..." class="input nameInput" id="signupName"/>
          <input type="text" placeholder="apellido..." class="input nameInput" id="signupSurname"/>
        </div>
        <input type="email" placeholder="email..." class="input" id="signupEmail"/>
        
        <div class="passwordBox">
          <input type="password" placeholder="contraseña..." class="input" id="firstPassword" />
          <div @click="hideFirstEye">
            <v-icon class="passwordEyeBtn" id="eyeBox1_1">mdi-eye</v-icon>
            <v-icon class="passwordEyeBtn" id="eyeBox1_2">mdi-eye-off</v-icon>
          </div>
        </div>
        
        <div class="passwordBox">
          <input type="password" placeholder="confirme su contraseña..." class="input" id="secondPassword" />
          <div @click="hideSecondEye">
            <v-icon class="passwordEyeBtn" id="eyeBox2_1">mdi-eye</v-icon>
            <v-icon class="passwordEyeBtn" id="eyeBox2_2">mdi-eye-off</v-icon>
          </div>
        </div>
        <span class="restrictionText">Al menos 8 caracteres combinando letras y números</span>

        <input type="button" value="Registrarse" @click="signup()" class="registerBtn" />
        <p class="loginText">¿Ya tienes una cuenta?<br>
        <button class="loginBtn" id="registerToLogin">Inicie sesion</button> ahora</p>
      </div>
    </div>
    <div class="verifyEmail">
      <h2 class="title">Verifica tu e-mail</h2>
      <hr>
      <input type="text" placeholder="inserte el codigo..." class="input" id="verifyCode" />
      <p class="resendEmail" @click="resendEmail()">Reenviar e-mail de verificacion</p>
      <input type="button" value="Verificar" @click="verifyEmail()" class="verifyBtn" />
    </div>
    <div class="background"></div>
  </div>
</template>

<script>
import Button from './micro-components/Button.vue';
import { Credentials, SignupCredentials } from '../../api/user';
import { Api } from '../../api/api';
import { mapActions } from 'vuex';

export default {
  name: "Signup",
  components: {
    Button
  },
  data() {
    return {
      result: null,
      email: '',
      password: '',
    }
  },
  mounted: function() {
    document.querySelector(".background").addEventListener("click", () => {
      document.querySelector(".signup").style.display = "none";
    })

    document.querySelector(".signup .closeBtn").addEventListener("click", () => {
      document.querySelector(".signup").style.display = "none";
    })
  },
  methods: {
    ...mapActions('security', {
      $login: 'login',
    }),
    hideFirstEye: function() {
      var x = document.getElementById("firstPassword");
      var y = document.getElementById("eyeBox1_2");
      var z = document.getElementById("eyeBox1_1");

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
    hideSecondEye: function() {
      var x = document.getElementById("secondPassword");
      var y = document.getElementById("eyeBox2_2");
      var z = document.getElementById("eyeBox2_1");

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
    async signup() {
      try {
        const firstName = document.getElementById('signupName').value;
        const lastName = document.getElementById('signupSurname').value;
        this.email = document.getElementById('signupEmail').value;
        this.password = document.getElementById('firstPassword').value;
        const confirmPassword = document.getElementById('secondPassword').value;
        if(this.password != confirmPassword) {
          return;
        } 
        const credentials = new SignupCredentials(firstName, lastName, this.email, this.password);
        const url = `${Api.baseUrl}/users`;

        const result = await Api.post(url, false, credentials);
        
        document.querySelector('.signup-content').style.display = "none";
        document.querySelector('.verifyEmail').style.display = "block";
        console.log(result);
        this.clearResult();
      } catch(e) {
        this.setResult(e);
        console.log(e);
      }
    },
    async verifyEmail() {
      try {
        const verifyCode = document.getElementById('verifyCode').value;
        const url = `${Api.baseUrl}/users/verify_email`;

        const data = { "email": this.email, "code": verifyCode };
        const result = await Api.post(url, false, data);

        document.querySelector('.signup-content').style.display = "block";
        document.querySelector('.login-content').style.display = "block";
        document.querySelector('.verifyEmail').style.display = "none";
        document.querySelector('.verifyLoginEmail').style.display = "none";
        document.querySelector('.signup').style.display="none";
        const credentials = new Credentials(this.email, this.password);

        this.$login({credentials, rememberMe: true });
        this.clearResult();
        this.$router.push('/rutinas');
      } catch(e) {
        this.setResult(e);
        console.log(e);
      }
    },
    async resendEmail() {
      try {
        const url = `${Api.baseUrl}/users/resend_verification`;
        const data = {'email': this.email};
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

  .signup {
    display:none;
    position: fixed; 
    transition: 200ms ease-in-out;
    width: 100%;
    height: 100%;
    top: 0;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 2;

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

    .verifyEmail {
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
    }

    .background {
      background-color: rgba(0, 0, 0, 0.6);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .signup-content {
      display: block;

      height: 570px;
      width: 500px;
      background: #fff;
      padding: 20px;
      border-radius: 5px;
      position: relative;
      z-index: 10;

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

        .loginBtn {
          color: #DA611B;
        }
      }

      .registerBtn {
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

      #eyeBox1_2, #eyeBox2_2 {
        display: none;
      }
      
      #eyeBox1_1, #eyeBox2_1 {
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