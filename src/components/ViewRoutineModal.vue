<template>
  <Modal :open="modalOpen" :closeMod="close">
    <div class="container">
      <p v-if="error.description != ''" class="error">
        {{ error.description }}
      </p>
      <div v-if="!loading && routine" class="rutina">
        <h1>{{ routine.name }}</h1>
        <div class="descripcion">
          <p>Duracion: {{ routine.metadata.duration }} minutos</p>
          <p>Dificultad: {{ routine.difficulty }}</p>
          <p>Detalles: {{ routine.detail }}</p>
        </div>
        <div class="cycle" v-for="cycle in cycles" :key="cycle.id">
          <p>{{ cycle.name }}</p>
          <div class="exercises">
            <ExerciseCard class="ejercicioItem"
              v-for="ex in cycleExercises(cycle.id)"
              :key="ex.order"
              :titulo="ex.name"
              :dificultad="ex.difficulty"
              :grupo="ex.group"
              :id="ex.id"
              :getterEx="() => getRoutine(routine.id)"
            />
          </div>
        </div>
        <div v-if="editable" class="buttons">
          <button @click="$router.push(`editar-rutina/${routine.id}`)">
            Editar
          </button>
          <button class="delete-button" @click="deleteRoutine">Eliminar</button>
        </div>
      </div>
      <Spinner :class="{ hidden: !loading }" />
    </div>
  </Modal>
</template>

<script>
import Spinner from "../components/micro-components/Spinner.vue";
import Modal from "../components/Modal.vue";
import ExerciseCard from "../components/ExerciseCard.vue";
import { Api } from "../../api/api";

export default {
  name: "ViewRoutineModal",
  components: {
    Spinner,
    Modal,
    ExerciseCard,
  },
  data() {
    return {
      routine: null,
      cycles: [],
      exercises: [],
      error: {
        description: "",
      },
      loading: true,
      modalOpen: false,
    };
  },
  props: {
    editable: {
        type: Boolean,
        default: true 
      }
  },
  methods: {
    async getRoutine(routineID) {
      this.loading = true;
      this.routine = null;
      this.cycles = [];
      this.exercises = [];

      //Rutina
      let url = `${Api.baseUrl}/routines/${routineID}`;
      try {
        const res = await Api.get(url, true);
        this.routine = res;
      } catch (e) {
        if (e.code == 99) this.error.description = "Error al cargar rutina";
        else this.error = e;
        return;
      }

      const diffMap = {
        beginner: "Principiante",
        intermediate: "Intermedio",
        advanced: "Avanzado",
      };

      this.routine.difficulty = diffMap[this.routine.difficulty];

      //Ciclos
      url = `${Api.baseUrl}/routines/${routineID}/cycles`;
      try {
        const res = await Api.get(url, true);
        this.cycles = res.content.sort((a, b) => a.order - b.order);
      } catch (e) {
        if (e.code == 99) this.error.description = "Error al cargar ciclos";
        else this.error = e;
        return;
      }

      //Ejercicios
      this.cycles.forEach(async (cycle) => {
        url = `${Api.baseUrl}/cycles/${cycle.id}/exercises`;
        try {
          const res = await Api.get(url, true);
          res.content.forEach((ex) => {
            ex.cycleID = cycle.id;
            this.exercises.push(ex);
          });
          this.exercises = this.exercises.sort((a, b) => a.order - b.order);
        } catch (e) {
          if (e.code == 99)
            this.error.description = "Error al cargar ejercicios";
          else this.error = e;
          return;
        }
      });
      this.loading = false;
    },
    async deleteRoutine() {
      //Rutina
      const url = `${Api.baseUrl}/routines/${this.routine.id}`;
      try {
        await Api.delete(url, true);
      } catch (e) {
        if (e.code == 99) this.error.description = "Error al borrar rutina";
        else this.error = e;
        return;
      }

      this.close();
      this.$router.go();
    },
    cycleExercises(cycleID) {
      let exercises = this.exercises.filter((e) => e.cycleID === cycleID);
      exercises = exercises.map((e) => ({
        name: e.exercise.name,
        group: e.exercise.metadata.grupo,
        difficulty: e.exercise.metadata.dif,
        order: e.order,
        id: e.exercise.id,
      }));
      return exercises;
    },
    open(routineID) {
      this.loading = true;
      this.modalOpen = true;
      this.getRoutine(routineID);
    },
    close() {
      this.modalOpen = false;
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  max-height: 70vh;
  width: 44vw;
  margin: auto;
  padding-right: 20px;
  padding-left: 20px;
  overflow-y: scroll;
  scroll-behavior: smooth;

  .cycle {
    display: flex;
    flex-direction: column;
    outline: #bfbfbf solid 1px;
    border-radius: 10px;
    padding-top: 18px;
    padding-bottom: 26px;
    margin-bottom: 48px;
    width: 100%;

    p {
      font-size: 1.4em;
      margin-bottom: 1em;
      padding-left: 32px;
    }

    .exercises {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      place-items: center;
      row-gap: 40px;

      .ejercicioItem {
        margin: auto;
      }
    }
  }

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
    margin-bottom: 20px;
  }

  .routine {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-content: center;
    justify-content: space-between;
    min-width: 500px;
  }

  button {
    color: #da611b;
    border: 1px solid #da611b;
    margin: 0 auto;
    width: 100px;
    height: 40px;
    border-radius: 10px;
  }

  .descripcion {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
    margin-bottom: 3em;

    p {
      margin-right: 120px;
      font-size: 20px;
      font-weight: 300;
    }
  }
}
.exercise-card {
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
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
  padding: 0;
  margin-bottom: 10px;

  button {
    margin: 0;
  }
}
</style>
