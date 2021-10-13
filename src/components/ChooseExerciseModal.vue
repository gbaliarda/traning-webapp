<template>
  <div class="container">
    <p :class="error.description!='' ? 'error' : 'hidden'">{{ error.description }}</p>
    <div v-if="notSelectedExercises.length > 0" class='ejercicios'>
        <div v-for="ex in notSelectedExercises" :key="ex.id" class="ejercicio">
            <p class="card-title">{{ ex.name }}</p>
            <div class="descripcion">
                <p>Grupo: {{ ex.metadata.grupo }}</p>
                <p>Dificultad: {{ ex.metadata.dif }}</p>
            </div>
            <button @click="() => $emit('choose', ex)">Elegir</button>
        </div>
    </div>
    <div v-else style="text-align: center">
      <p>No hay ejercicios creados.</p>
      <br /><br />
      <router-link to="/ejercicios">
        <Button text="Crear ejercicios"></Button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Spinner from "../components/micro-components/Spinner.vue"
import Button from './micro-components/Button.vue';

export default {
  name: "ChooseExerciseModal",
  props: {
    notSelectedExercises: Array,
  },
  components: {
    Spinner,
    Button,
  },
  data() {
    return {
      error: {
        description: "",
      },
    }
  },
};
</script>

<style scoped lang="scss">
  .container {
    width: 600px;

    .hidden {
      display: none;
    }

    .error {
      margin-top: 1em;
      color: tomato;
      font-size: 1.2rem;
    }

    h1 {
      font-weight: 400;
    }
    
    .ejercicios {
      padding: 10px 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 30px;
      place-items: center;
      margin-top: 4em;
      width: 100%;
      max-height: 470px;
      overflow-y: scroll;
    }
  }
  .ejercicio {
    padding: 1em 1em;
    width: 250px;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-shrink: 0;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    .card-title {
      font-size: 1.4em;
      text-align: center;
    }

    .descripcion {
      p {
        padding: 5px;
      }
    }

    button {
      color: #DA611B;
      border: 1px solid #DA611B;
      margin: 0 auto;
      width: 100px;
      height: 40px;
      border-radius: 10px;
    }
  }
</style>