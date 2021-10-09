<template>
  <div class="container">
    <div class="title">
      <h1>Mis ejercicios</h1>
      <v-icon class="icon" size="30">mdi-pencil</v-icon>
    </div>
    <p :class="error.description!='' ? 'error' : 'hidden'">{{ error.description }}</p>
    <div :class="loading ? 'hidden' : 'ejercicios'">
      <ExerciseCard v-for="ex in exercises" :key="id" :titulo="ex.title" :grupo="ex.metadata.grupo" :dificultad="ex.metadata.dif" />
      <div @click="openModal">
        <AddButton />
      </div>
    </div>
    <Spinner :class="{'hidden': !loading}" />
    <Modal title="Crear ejercicio">
      <CreateExe />
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
    }
  },
  methods: {
    openModal() {
      this.$store.commit("setShowing", true);
    }
  },
  async created() {
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

    .title {
      display: flex;

      h1 {
        font-weight: 400;
        margin-right: .8em;
      }

      .icon {
        color: #DA611B;
        cursor: pointer;
      }
    }
    
    .ejercicios {
      display: flex; // quizas cambiar a grid
      flex-wrap: wrap;
      margin-top: 5em;
    }
  }
</style>