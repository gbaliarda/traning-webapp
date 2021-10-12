<template>
  <div class="container">
    <div class="title">
      <router-link to="/rutinas">
        <v-icon class="icon" size="30">mdi-arrow-left</v-icon>
      </router-link>
      <h1>Editar rutina</h1>
    </div>
    <div v-if="!loading">
      <div class="inputs">
        <div class="input">
          <p>Nombre</p>
          <input v-model="name" type="text" />
        </div>
        <div class="input">
          <p>Dificultad</p>
          <select v-model="difficulty">
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
        </div>
      </div>
      <RoutineCycle ref="cicloCalentamiento" title="Ciclo Calentamiento" />
      <div v-for="(cycle, index) in cycles" :key="cycle.id">
        <RoutineCycle
        v-if="index != 0 && index != cycles.length - 1"
        ref="cicloEjercicio"
        :title="`Ciclo Ejercicio ${index}`"
        @delete="removeCycle(index)"
        deleteable
      />
      </div>
      <AddButton @click="newCycle" class="add-cycle-button" />
      <RoutineCycle ref="cicloEnfriamiento" title="Ciclo Enfriamiento" />
      <Button @click="editRoutine" text="Guardar" />
    </div>
  </div>
</template>

<script>
import Button from "../components/micro-components/Button.vue";
import { Api } from "../../api/api";
import AddButton from "../components/micro-components/AddButton.vue";
import RoutineCycle from "../components/RoutineCycle.vue";
import Modal from "../components/Modal.vue";

export default {
  name: "EditarRutina",
  components: {
    Button,
    AddButton,
    RoutineCycle,
    Modal,
  },
  props: {
    id: String,
  },
  data() {
    return {
      loading: true,
      name: "",
      detail: "",
      difficulty: "",
      cycleID: 0,
      cycles: [],
      modalOpen: true,
      repeticiones: 0,
    };
  },
  methods: {
    newCycle() {
      this.cycles.push(this.cycleID++);
      console.log(this.cycles);
    },
    removeCycle(index) {
      this.cycles.splice(index, 1);
      console.log(this.cycles);
    },
    async editRoutine() {
      let name = this.name;
      let detail = this.detail;
      let isPublic = true;
      let difficulty = this.difficulty;

      let error = false;
      if (name == "") {
        console.log("Error: Nombre vacío");
        error = true;
      }

      if (detail == "") {
        console.log("Error: Descripción vacía");
        error = true;
      }

      if (difficulty == "") {
        console.log("Error: dificultad vacía");
        error = true;
      }

      if (error) return;

      //Post Rutina
      let rutina = {
        name,
        detail,
        isPublic,
        difficulty,
      };

      let routineID;
      try {
        const deleteUrl = `${Api.baseUrl}/routines/${this.id}`;
        const postUrl = `${Api.baseUrl}/routines`;
        await Api.delete(deleteUrl, true);
        const res = await Api.post(postUrl, true, rutina);
        routineID = res.id;
      } catch (e) {
        console.log(e);
        return;
      }

      let cycles = [
        {
          name: this.$refs.cicloCalentamiento.title,
          type: "warmup",
          repetitions: this.$refs.cicloCalentamiento.repetitions,
          order: 1,
          detail: "",
          exercises: this.$refs.cicloCalentamiento.apiExercises,
        },
      ];

      if (this.$refs.cicloEjercicio) {
        this.$refs.cicloEjercicio.forEach((ciclo, index) => {
          cycles.push({
            name: ciclo.title,
            type: "exercise",
            repetitions: ciclo.repetitions,
            order: index + 2,
            detail: "",
            exercises: ciclo.apiExercises,
          });
        });
      }

      let exCount = this.$refs.cicloEjercicio
        ? this.$refs.cicloEjercicio.length
        : 0;

      cycles.push({
        name: this.$refs.cicloEnfriamiento.title,
        type: "cooldown",
        repetitions: this.$refs.cicloEnfriamiento.repetitions,
        order: exCount + 2,
        detail: "",
        exercises: this.$refs.cicloEnfriamiento.apiExercises,
      });

      cycles.forEach(async (cycle, index) => {
        const url = `${Api.baseUrl}/routines/${routineID}/cycles`;
        let id;
        try {
          const res = await Api.post(url, true, {
            name: cycle.name,
            detail: cycle.detail,
            repetitions: cycle.repetitions,
            order: cycle.order,
            type: cycle.type,
          });
          id = res.id;
        } catch (e) {
          console.log(e);
          return;
        }

        cycle.exercises.forEach(async (exercise, index) => {
          const url = `${Api.baseUrl}/cycles/${id}/exercises/${exercise.id}`;
          try {
            const res = await Api.post(url, true, {
              order: index + 1,
              repetitions: exercise.repetitions,
              duration: 0,
            });
          } catch (e) {
            console.log(e);
            return;
          }
        });
      });

      this.$router.go(-1);
    },
  },
  async created() {
    this.loading = true;

    //Rutina
    let routine;
    let url = `${Api.baseUrl}/routines/${this.id}`;
    try {
      const res = await Api.get(url, true);
      routine = res;
    } catch (e) {
      if (e.code == 99) this.error.description = "Error al cargar rutina";
      else this.error = e;
      return;
    }

    this.difficulty = routine.difficulty;
    this.name = routine.name;
    this.detail = routine.detail;

    //Ciclos
    url = `${Api.baseUrl}/routines/${this.id}/cycles`;
    try {
      const res = await Api.get(url, true);
      this.cycles = res.content.sort((a, b) => a.order - b.order);
    } catch (e) {
      if (e.code == 99) this.error.description = "Error al cargar ciclos";
      else this.error = e;
      return;
    }

    //Ejercicios
    this.cycles.forEach(async (cycle, index) => {
      url = `${Api.baseUrl}/cycles/${cycle.id}/exercises`;
      try {
        const res = await Api.get(url, true);
        let exercises = res.content.sort((a, b) => a.order - b.order).map((e) => {
          let newEx = e.exercise;
          newEx.repetitions = e.repetitions;
          return newEx;
        });

        if(index == 0) {
          this.$refs.cicloCalentamiento.exercises = exercises;
          this.$refs.cicloCalentamiento.repetitions = cycle.repetitions;
        }
        else if(index == this.cycles.length - 1) {
          this.$refs.cicloEnfriamiento.exercises = exercises;
          this.$refs.cicloEnfriamiento.repetitions = cycle.repetitions;
        }
        else {
          this.$refs.cicloEjercicio[index-1].exercises = exercises;
          this.$refs.cicloEjercicio[index-1].repetitions = cycle.repetitions;
        }
      } catch (e) {
        if (e.code == 99) this.error.description = "Error al cargar ejercicios";
        else this.error = e;
        return;
      }
    });
    this.loading = false;
  },
};
</script>

<style scoped lang="scss">
.container {
  width: 80%;
  margin: auto;
  margin-top: 4em;

  .add-cycle-button {
    margin-bottom: 48px;
    width: 100%;
  }

  p {
    font-size: 1.4em;
    margin-bottom: 1em;
  }

  .title {
    display: flex;

    h1 {
      font-weight: 400;
    }

    .icon {
      color: #da611b;
      cursor: pointer;
      position: absolute;
      margin-left: -2em;
      margin-top: 0.15em;
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

      input,
      select {
        width: 100%;
        border: 1px solid #bfbfbf;
        border-radius: 10px;
        padding: 0.7em 1em;
        outline: none;
      }
    }
  }
}
</style>