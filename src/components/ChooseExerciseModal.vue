<template>
  <div class="container">
    <p :class="error.description!='' ? 'error' : 'hidden'">{{ error.description }}</p>
    <div :class="loading ? 'hidden' : 'ejercicios'">
        <div v-for="ex in exercises" :key="ex.id" class="ejercicio">
            <p class="card-title">{{ ex.name }}</p>
            <div class="descripcion">
                <p>Grupo: {{ ex.metadata.grupo }}</p>
                <p>Dificultad: {{ ex.metadata.dif }}</p>
            </div>
            <button @click="$emit('choose', ex)">Elegir</button>
        </div>
    </div>
    <Spinner :class="{'hidden': !loading}" />
  </div>
</template>

<script>
import ExerciseCard from "../components/ExerciseCard.vue"
import AddButton from "../components/micro-components/AddButton.vue"
import Modal from "../components/Modal.vue"
import CreateExe from "../components/CreateExe.vue"
import Spinner from "../components/micro-components/Spinner.vue"
import { Api } from "../../api/api"

export default {
  name: "ChooseExerciseModal",
  components: {
    ExerciseCard,
    AddButton,
    Modal,
    CreateExe,
    Spinner,
  },
  data() {
    return {
      exercises: [],
      error: {
        description: "",
      },
      loading: true,
    }
  },
  methods: {
    async getExercises() {
      const url = `${Api.baseUrl}/exercises`;
      try {
        const res = await Api.get(url, true);
        this.exercises = res.content;
      } catch(e) {
        if (e.code == 99)
          this.error.description = "Error al cargar ejercicios";
        else
          this.error = e;
      }
      this.loading = false;
    }
  },
  choose(id) {

  },
  created() {
    this.getExercises();
  }
};
</script>

<style scoped lang="scss">
  .container {
    width: 80%;
    margin: auto;
    margin-top: 4em;

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
      display: flex; // quizas cambiar a grid
      flex-wrap: wrap;
      margin-top: 5em;
    }
  }
  .ejercicio {
    padding: 2em 1em;
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-shrink: 0;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin-right: 3em;
    margin-bottom: 2em;

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