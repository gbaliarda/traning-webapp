<template>
  <div class="container">
    <h1>Mis ejercicios</h1>
    <p :class="error.description!='' ? 'error' : 'hidden'">{{ error.description }}</p>
    <div :class="loading ? 'hidden' : 'ejercicios'">
      <ExerciseCard v-for="ex in exercises" :key="ex.id" :titulo="ex.name" :grupo="ex.metadata.grupo" :dificultad="ex.metadata.dif" :id="ex.id" :getterEx="getExercises" :editable="true" />
      <div @click="openModal">
        <AddButton />
      </div>
    </div>
    <Spinner :class="{'hidden': !loading}" />
    <Modal title="Crear ejercicio" :open="modalOpen" :closeMod="closeMod">
      <CreateExe :getterEx="getExercises" :closeMod="closeMod" :editable="true" />
    </Modal>
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
  name: "Ejercicios",
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
      modalOpen: false,
    }
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    async getExAmount() {
      const url = `${Api.baseUrl}/exercises?size=1`;
      try {
        const res = await Api.get(url, true);
        return res.totalCount;
      } catch(e) {
        if (e.code == 99)
          this.error.description = "Error al cargar ejercicios";
        else
          this.error = e;
      }
      return 10;
    },
    async getExercises() {
      const totalExercises = await this.getExAmount();
      let url = `${Api.baseUrl}/exercises?size=${totalExercises}`;
      if(!totalExercises) 
        url = `${Api.baseUrl}/exercises`;
      
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
    },
    closeMod() {
      this.modalOpen = false;
    }
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
</style>