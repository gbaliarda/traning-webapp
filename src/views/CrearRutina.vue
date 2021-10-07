<template>
  <div class="container">
    <div class="title">
      <router-link to="/rutinas">
        <v-icon class="icon" size="30">mdi-arrow-left</v-icon>
      </router-link>
      <h1>Crear rutina</h1>
    </div>
    <div class="inputs">
      <div class="input">
        <p>Nombre</p>
        <input type="text">
      </div>
      <div class="input">
        <p>Dificultad</p>
        <!-- Reemplazar por select -->
        <input type="text">
      </div>
      <div class="input">
        <p>Duración</p>
        <div class="duration-box">
          <input type="number" min="0">
          <!-- Reemplazar por select -->
          <input type="text">
        </div>
      </div>
    </div>
    <p>Ejercicios</p>
    <div class="ejercicios">
      <CreateCard titulo="Sentadillas" />
      <CreateCard titulo="Estocadas" />
    </div>
    <Button text="Guardar" />
  </div>
</template>

<script>
import Button from "../components/micro-components/Button.vue"
import CreateCard from "../components/CreateCard.vue"

export default {
  name: "CrearRutina",
  components: {
    Button,
    CreateCard,
  }
};
</script>

<style scoped lang="scss">
  .container {
    width: 80%;
    margin: auto;
    margin-top: 4em;

    .ejercicios {
      display: flex;
      flex-wrap: wrap;
    }

    p {
      font-size: 1.4em;
      margin-bottom: 1em;
    }

    button {
      position: fixed;
      right: 50px;
      bottom: 50px;
      padding-left: 1.3em;
      padding-right: 1.3em;
    }

    .title {
      display: flex;

      h1 {
        font-weight: 400;
      }

      .icon {
        color: #DA611B;
        cursor: pointer;
        position: absolute;
        margin-left: -2em;
        margin-top: .15em;
      }
    }

    .inputs {
      margin-top: 3em;
      width: 80%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .input {
        width: 45%;
        margin-bottom: 2em;
        
        input {
          width: 100%;
          border: 1px solid #BFBFBF;
          border-radius: 10px;
          padding: .7em 1em;
          outline: none;
        }
      }

      .duration-box {
        display: flex;
        width: 100%;
        justify-content: space-between;

        input {
          width: 45%;
        }
      }
    }
  }
</style>