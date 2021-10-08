<template>
  <div class="container">
    <h1 id="title">Mi perfil</h1>
    <div class="row">
      <div id="picture-container">
        <img
          src="../assets/account_circle.svg"
          width="300"
          alt="Foto de perfil"
        />
        <v-icon id="picture-pencil" class="editIcon">mdi-pencil</v-icon>
      </div>
      <div id="info-container" class="d-flex">
        <div
          class="row"
          id="info-title-container"
          justify="center"
          align="center"
        >
          <h2 id="info-title">Información Básica</h2>
          <v-icon class="editIcon editProfileInfo">mdi-pencil</v-icon>
          <v-icon class="confirmEdit confirmProfileInfo">mdi-check</v-icon>
          <v-icon class="cancelEdit cancelProfileInfo">mdi-close</v-icon>
        </div>
        <h3 class="info-item"><span class="infoTitle">Nombre:</span>
          <p class="infoName" id="infoName">{{result.firstName}}</p>
          <input type="text" id="editName" v-model="result.firstName"/>
        </h3>
        <h3 class="info-item"><span class="infoTitle">Email:</span>
          <p class="infoName" id="infoEmail">{{result.email}}</p>
          <input type="email" id="editEmail" v-model="result.email"/>
        </h3>
        <button id="pass-btn" class="button">Cambiar contraseña</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Api } from '../../api/api.js';

export default {
  name: "Profile",
  data() {
    return {
      result: {},
      bEmail: '',
      bName: '',
    }
  },
  computed: {
    ...mapState('security', {
      $user: state => state.user,
    })
  },
  methods: {
    ...mapActions('security', {
      $getCurrentUser: 'getCurrentUser',
    }),
    setResult(result){
      this.result = result
    },
    clearResult() {
      this.result = null
    },
    async getCurrentUser() {
      await this.$getCurrentUser()
      this.setResult(this.$user)
    },
    async changeProfileInfo(data) {
      try {
        const url = `${Api.baseUrl}/users/current`;

        const result = await Api.put(url, true, data);
      } catch(e) {
        console.log(e);
      }
    },
  },
  beforeMount() {
    this.getCurrentUser();
  },
  mounted() {
    document.querySelector('.editProfileInfo').addEventListener('click', () => {
      this.bEmail = this.result.email;
      this.bName = this.result.firstName;

      document.getElementById("infoName").style.display = "none";
      document.getElementById("infoEmail").style.display = "none";
      document.getElementById("editName").style.display = "inline";
      document.getElementById("editEmail").style.display = "inline";
      document.getElementById("editName").focus();
      document.querySelector('.editProfileInfo').style.display = "none";
      document.querySelector('.confirmProfileInfo').style.display = "inline";
      document.querySelector('.cancelProfileInfo').style.display = "inline";

    });

    document.querySelector('.confirmProfileInfo').addEventListener('click', () => {
      const nameEl = document.getElementById("editName");
      const emailEl = document.getElementById("editEmail");

      document.getElementById("infoName").style.display = "inline";
      document.getElementById("infoEmail").style.display = "inline";
      nameEl.style.display = "none";
      emailEl.style.display = "none";
      document.querySelector('.editProfileInfo').style.display = "inline";
      document.querySelector('.confirmProfileInfo').style.display = "none";
      document.querySelector('.cancelProfileInfo').style.display = "none";

      const name = nameEl.value;
      const email = emailEl.value;
      const data = {"firstName": name, "email":email, "username":email};
      this.changeProfileInfo(data);
    });

    document.querySelector('.cancelProfileInfo').addEventListener('click', () => {
      document.getElementById("infoName").style.display = "inline";
      document.getElementById("infoEmail").style.display = "inline";
      document.getElementById("editName").style.display = "none";
      document.getElementById("editEmail").style.display = "none";
      document.querySelector('.editProfileInfo').style.display = "inline";
      document.querySelector('.confirmProfileInfo').style.display = "none";
      document.querySelector('.cancelProfileInfo').style.display = "none";

      this.result.firstName = this.bName;
      this.result.email = this.bEmail;
    });
  }
};
</script>

<style scoped lang="scss">
h1,
h2,
h3 {
  font-weight: 400;
}

#editName, #editEmail{
  border: 1px solid #aaa;
  border-radius: 7px;
  padding-left: 2px;
  margin-left: -3px;
  margin-bottom: -1px;
  margin-top: -1px;
  display: none;
}

.editIcon {
  cursor: pointer;
  color: #DA611B;
}

.confirmEdit {
  display: none;
  cursor: pointer;
  color: green;
}

.cancelEdit {
  display: none;
  cursor: pointer;
  color: red;
}

.infoName {
  display: inline;
}

.infoTitle {
  margin-right: .6em;
}

.container {
  width: 80%;
  margin: auto;
  margin-top: 4em;
}

.button {
  color: white;
  background: #ea8d59;
  padding: 10px;
  border-radius: 10px;
}

.row {
  display: flex;
  flex-direction: row;
}

#pass-btn {
  margin-top: 20px;
}

#info-title-container {
  margin-bottom: 50px;
  margin-left: 0;
}

#info-title {
  margin-right: 10px;
}

.info-item {
  margin-bottom: 25px;
}

#title {
  margin-bottom: 100px;
}

#picture-container {
  position: relative;
  margin-right: 100px;
  border: 1px solid;
  border-radius: 10px;
  border-color: rgba($color: #000000, $alpha: 0.4);
}

#picture-pencil {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>
