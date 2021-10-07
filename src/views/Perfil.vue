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
        <v-icon id="picture-pencil" color="#DA611B">mdi-pencil</v-icon>
      </div>
      <div id="info-container" class="d-flex">
        <div
          class="row"
          id="info-title-container"
          justify="center"
          align="center"
        >
          <h2 id="info-title">Información Básica</h2>
          <v-icon color="#DA611B">mdi-pencil</v-icon>
        </div>
        <h3 class="info-item">Nombre: Bruno Peralta</h3>
        <h3 class="info-item">Email: bperalta96@gmail.com</h3>
        <button id="pass-btn" class="button">Cambiar contraseña</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
};
</script>

<style scoped lang="scss">
h1,
h2,
h3 {
  font-weight: 400;
}

.container {
  width: 80%;
  margin: auto;
  margin-top: 4em;
}

.button {
  color: #da611b;
  border: 1px solid #da611b;
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
