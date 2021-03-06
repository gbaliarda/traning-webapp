<template>
  <div class="container">
    <h1 id="title">Mi perfil</h1>
    <div v-if="result && !loadingProfile" class="row">
      <div id="picture-container" @click="editProfilePicture">
        <img :src="result.avatarUrl != null ?require(`../assets/avatars/${result.avatarUrl}`):require(`../assets/avatars/default.svg`)" alt="Foto de perfil" class="avatarImg" />
      </div>
      <div id="info-container" class="d-flex">
        <div
          class="row"
          id="info-title-container"
          justify="center"
          align="center"
        >
          <h2 id="info-title">Información Básica</h2>
          <v-icon class="editIcon editProfileInfo" @click="editProfileInfo" size="32">mdi-pencil</v-icon>
          <v-icon class="confirmEdit confirmProfileInfo" @click="confirmProfileInfo" size="32">mdi-check</v-icon>
          <v-icon class="cancelEdit cancelProfileInfo" @click="cancelProfileInfo" size="32">mdi-close</v-icon>
        </div>
        <h3 class="info-item"><span class="infoTitle">Nombre:</span>
          <p class="infoName" id="infoName">{{result.firstName}}</p>
          <input type="text" id="editName" v-model="result.firstName"/>
        </h3>
        <h3 class="info-item"><span class="infoTitle">Email:</span>
          <p class="infoName" id="infoEmail">{{result.email}}</p>
          <input type="email" id="editEmail" v-model="result.email"/>
        </h3>
      </div>
    </div>
    <p v-if="!result" style="color: tomato; font-size: 1.2em">No se pudo cargar la información de perfil</p>
    <div v-else-if="loadingProfile">
      <Spinner />
    </div>
    <Modal title="Editar foto de perfil" :open="modalOpen" :closeMod="closeMod">
      <div v-if="!loadingStatus">
        <div class="pic-container">
          <ImgProfile @img-update="handleChange" :handleFinish="handleFinish" v-for="picture in pictures" :name="picture" :key="picture" />
        </div>
        <p v-if="errorStatus" class="error-msg">Error al cambiar imagen</p>
        <p v-else-if="errorStatus == false" class="success-msg">Imagen cambiada con exito</p>
      </div>
      <div v-else>
        <Spinner />
      </div>
    </Modal>
  </div>
</template>

<script>
import Spinner from "../components/micro-components/Spinner.vue"
import { mapActions, mapState } from 'vuex';
import { Api } from '../../api/api.js';
import Modal from "../components/Modal.vue";
import ImgProfile from "../components/ImgProfile.vue";

export default {
  name: "Profile",
  components: {
    Spinner,
    Modal,
    ImgProfile,
  },
  data() {
    return {
      result: {},
      bEmail: '',
      bName: '',
      loadingProfile: false,
      modalOpen: false,
      pictures: ["default", "F1", "F2", "F3", "F4", "F5", "M1", "M2", "M3"],
      loadingStatus: false,
      errorStatus: undefined,
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
    editProfileInfo() {
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
    },
    confirmProfileInfo() {
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
      const data = {"firstName": name, "email":email};
      this.changeProfileInfo(data);
    },
    cancelProfileInfo() {
      document.getElementById("infoName").style.display = "inline";
      document.getElementById("infoEmail").style.display = "inline";
      document.getElementById("editName").style.display = "none";
      document.getElementById("editEmail").style.display = "none";
      document.querySelector('.editProfileInfo').style.display = "inline";
      document.querySelector('.confirmProfileInfo').style.display = "none";
      document.querySelector('.cancelProfileInfo').style.display = "none";

      this.result.firstName = this.bName;
      this.result.email = this.bEmail;
    },
    async getCurrentUser() {
      this.loadingProfile = true;
      try {
        await this.$getCurrentUser();
      } catch(e) {
        console.log(e);
      }
      this.setResult(this.$user);
      this.loadingProfile = false;
    },
    async changeProfileInfo(data) {
      if(this.bName == data.firstName && this.bEmail == data.email)
        return;
      try {
        const url = `${Api.baseUrl}/users/current`;
        this.loadingProfile = true;
        const result = await Api.put(url, true, data);
      } catch(e) {
        console.log(e);
      }
    this.loadingProfile = false;
    },
    closeMod() {
      this.modalOpen = false;
    },
    editProfilePicture() {
      this.errorStatus = undefined;
      this.modalOpen = true;
    },
    handleChange() {
      this.loadingStatus = true;
    },
    async handleFinish(error) {
      if (error) {
        this.loadingStatus = false;
        this.errorStatus = true;
        return;
      }
      const url = `${Api.baseUrl}/users/current`; 
      try {
        const result = await Api.get(url, true);
        this.result = result;
        this.errorStatus = false;
      } catch (e) {
        console.log(e.description);
        this.errorStatus = true;
      }
      this.loadingStatus = false;
    }
  },
  created() {
    this.getCurrentUser();
  }
};
</script>

<style scoped lang="scss">
h1,
h2,
h3 {
  font-weight: 400;
}

h2 {
  font-size: 32px;
}

h3 {
  font-size: 24px;
}

#editName, #editEmail{
  border: 1px solid #aaa;
  border-radius: 10px;

  margin-left: -3px;
  margin-bottom: -1px;
  margin-top: -1px;
  display: none;
  padding: 7px;
}

.success-msg {
  color: rgb(27, 167, 27);
}

.error-msg {
  color: tomato;
}

.pic-container {
  width: 400px;
  height: 400px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 10px;
  place-items: center;
}

.editIcon {
  cursor: pointer;
  color: #DA611B;
}

.confirmEdit {
  display: none;
  cursor: pointer;
  color: #DA611B;
}

.cancelEdit {
  display: none;
  cursor: pointer;
  color: #888;
}

.infoName {
  padding: 5px;
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
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  margin: 0;
  height: 60px;
}

#title {
  margin-bottom: 100px;
}

#picture-container {
  height: 300px;
  width: 300px;
  display: grid;
  place-items: center;
  position: relative;
  margin-right: 100px;
  border: 1px solid;
  border-radius: 10px;
  border-color: rgba($color: #000000, $alpha: 0.4);
  cursor: pointer;

  .avatarImg {
    height: 270px;
  }
}

#picture-pencil {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>
