<template>
  <div class="container">
    <div class="title">
      <router-link to="/rutinas">
        <v-icon class="icon" size="30">mdi-arrow-left</v-icon>
      </router-link>
      <h1 v-if="editing">Editar rutina</h1>
      <h1 v-else>Crear rutina</h1>
    </div>
    <div v-if="!loading">
      <div class="inputs">
        <div class="input">
          <p>Nombre*</p>
          <input v-model="name" type="text" />
        </div>
        <div class="input inputDificultad">
          <p>Dificultad*</p>
          <select v-model="difficulty" class="dificultadDropdown">
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
          <div class="arrow-dif"></div>
        </div>
      </div>
      <div class="inputs bottomInputs">
        <div class="input">
          <p>Descripción</p>
          <textarea v-model="detail" class="detailsTextarea"></textarea>
        </div>
        <div class="input">
          <p>Duración* <span style="font-size: .7em">(minutos)</span></p>
          <NumInput class="duration-input" v-model="duration" :min="0"/>
        </div>
      </div>
      <RoutineCycle ref="cicloCalentamiento" title="Ciclo Calentamiento" />
      <div v-for="(cycle, index) in cycles" :key="cycle.id">
        <RoutineCycle
          v-if="index != 0 && index != cycles.length - 1"
          ref="cicloEjercicio"
          :title="`Ciclo ${index}`"
          @delete="removeCycle(index)"
          :deleteable="index != 1"
        />
      </div>
      <AddButton @click="newCycle" class="add-cycle-button" />
      <RoutineCycle ref="cicloEnfriamiento" title="Ciclo Enfriamiento" />
      <p v-if="error" :class="error ? 'error-msg' : 'hidden'">{{textError}}</p>
      <div class="saveBtn">
        <Button v-if="!loadingSave" @click="saveRoutine" text="Guardar" />
        <div v-else class="loadingBtn">
          <Spinner />
        </div>
      </div>
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import Button from "../components/micro-components/Button.vue";
import { Api } from "../../api/api";
import AddButton from "../components/micro-components/AddButton.vue";
import RoutineCycle from "../components/RoutineCycle.vue";
import Modal from "../components/Modal.vue";
import NumInput from "../components/micro-components/NumInput.vue";
import Spinner from "../components/micro-components/Spinner.vue";

export default {
  name: "CreateEditRoutine",
  components: {
    Button,
    AddButton,
    RoutineCycle,
    Modal,
    NumInput,
    Spinner,
  },
  props: {
    id: String,
    editing: false,
  },
  data() {
    return {
      loading: false,
      name: "",
      detail: "",
      difficulty: "",
      cycleID: 0,
      cycles: [],
      modalOpen: true,
      repeticiones: 0,
      error: false,
      textError: '',
      duration: 0,
      loadingSave: false,
    };
  },
  methods: {
    newCycle() {
      this.cycles.push({
        name: `Ciclo ${this.cycles.length - 2}`,
        detail: "",
        type: "exercise",
        order: 2,
        repetitions: 1,
        metadata: null,
      });
    },
    removeCycle(index) {
      this.cycles.splice(index, 1);
      console.log(this.cycles);
    },
    async saveRoutine() {
      let error = false;
      this.loadingSave = true;

      if (this.name == "") {
        this.textError = "Inserte un nombre";
        this.error = true;
        this.loadingSave = false;
        return;
      }

      if (this.duration == "") {
        this.textError = "Inserte la duración";
        this.error = true;
        this.loadingSave = false;
        return;
      }

      if (this.difficulty == "") {
        this.textError = "Seleccione la dificultad";
        this.error = true;
        this.loadingSave = false;
        return;
      }

      //Post Rutina
      let rutina = {
        name: this.name,
        detail: this.detail,
        isPublic: true,
        difficulty: this.difficulty,
        metadata: {
          duration: this.duration,
        },
      };

      let routineID;
      try {
        if (this.editing) {
          const deleteUrl = `${Api.baseUrl}/routines/${this.id}`;
          await Api.delete(deleteUrl, true);
        }
        const postUrl = `${Api.baseUrl}/routines`;
        const res = await Api.post(postUrl, true, rutina);
        routineID = res.id;

        this.error = false;
      } catch (e) {
        this.error = true;
        if (e.code == 99)
          this.textError = "Error al guardar la rutina";
        else
          this.textError = e.description;
        this.loadingSave = false;
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

      cycles.forEach(async (cycle) => {
        const url = `${Api.baseUrl}/routines/${routineID}/cycles`;
        let id;
        const descansos = [];

        cycle.exercises.forEach((exercise) => {
          descansos.push(exercise.descanso);
        });

        try {
          const res = await Api.post(url, true, {
            name: cycle.name,
            detail: cycle.detail,
            repetitions: cycle.repetitions,
            order: cycle.order,
            type: cycle.type,
            metadata: {
              descansos
            },
          });
          id = res.id;
          this.error = false;
        } catch (e) {
          this.error = true;
          this.textError = e.description;
          return;
        }

        cycle.exercises.forEach(async (exercise, index) => {
          const url = `${Api.baseUrl}/cycles/${id}/exercises/${exercise.id}`;
          try {
            const res = await Api.post(url, true, {
              order: index + 1,
              repetitions: exercise.repetitions,
              duration: exercise.duration,
            });
            this.error = false;
          } catch (e) {
            this.error = true;
            this.textError = e.description;
            this.loadingSave = false;
            return;
          }
        });
      });

      this.loadingSave = false;
      this.$router.go(-1);
    },
  },
  async created() {
    if (!this.editing) {
      this.cycles = [
        {
          name: "Ciclo Calentamiento",
          detail: "",
          type: "warmup",
          order: 1,
          repetitions: 1,
          metadata: {},
        },
        {
          name: "Ciclo 1",
          detail: "",
          type: "exercise",
          order: 2,
          repetitions: 1,
          metadata: {},
        },
        {
          name: "Ciclo Enfriamiento",
          detail: "",
          type: "cooldown",
          order: 4,
          repetitions: 1,
          metadata: {},
        },
      ];
      return;
    }

    this.loading = true;

    //Rutina
    let routine;
    let url = `${Api.baseUrl}/routines/${this.id}`;
    try {
      const res = await Api.get(url, true);
      routine = res;
    } catch (e) {
      this.error = true;
      if (e.code == 99)
        this.textError = "Error al cargar rutina";
      else 
        this.textError = e.description;
      this.loading = false;
      return;
    }

    this.loading = false;

    this.difficulty = routine.difficulty;
    this.name = routine.name;
    this.detail = routine.detail;
    this.duration = routine.metadata.duration;

    //Ciclos
    url = `${Api.baseUrl}/routines/${this.id}/cycles?size=999`;
    try {
      const res = await Api.get(url, true);
      this.cycles = res.content.sort((a, b) => a.order - b.order);
    } catch (e) {
      this.error = true;
      if (e.code == 99)
        this.textError = "Error al cargar ciclos";
      else
        this.textError = e.description;
    }

    //Ejercicios
    this.cycles.forEach(async (cycle, index) => {
      url = `${Api.baseUrl}/cycles/${cycle.id}/exercises?size=999`;
      try {
        const res = await Api.get(url, true);
        let exercises = res.content
          .sort((a, b) => a.order - b.order)
          .map((e) => {
            let newEx = e.exercise;
            newEx.repetitions = e.repetitions;
            newEx.duration = e.duration;
            return newEx;
          });

        if (index == 0) {
          this.$refs.cicloCalentamiento.selectedEx = exercises;
          this.$refs.cicloCalentamiento.repetitions = cycle.repetitions;
          this.$refs.cicloCalentamiento.descansos = cycle.metadata.descansos;
        } else if (index == this.cycles.length - 1) {
          this.$refs.cicloEnfriamiento.selectedEx = exercises;
          this.$refs.cicloEnfriamiento.repetitions = cycle.repetitions;
          this.$refs.cicloEnfriamiento.descansos = cycle.metadata.descansos;
        } else {
          this.$refs.cicloEjercicio[index - 1].selectedEx = exercises;
          this.$refs.cicloEjercicio[index - 1].repetitions = cycle.repetitions;
          this.$refs.cicloEjercicio[index - 1].descansos = cycle.metadata.descansos;
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
  padding-bottom: 4em;

  .error-msg {
    font-size: 1.2em;
    color: tomato;
  }

  .add-cycle-button {
    margin-bottom: 48px;
    width: 100%;
  }

  .arrow-dif {
    width: 0; 
    height: 0; 
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    position: absolute;
    right: 65px;
    pointer-events: none;
    border-top: 10px solid #EA8D59;
    top: 67px;
    right: 5%;
  }

  .dificultadDropdown {
    cursor: pointer;
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
        resize: none;
      }
    }

    .detailsTextarea {
      resize: none;
      width: 100%;
      height: 130px;
      border: 1px solid #BFBFBF;
      border-radius: 10px;
      padding: .7em 1em;
      outline: none;
      cursor: text;
    }

    .inputDificultad {
      position: relative;
    }
  }

  .duration-input {
    width: 100%;
  }
  
  .bottomInputs {
    margin-top: 0;
  }

  .saveBtn {
    display: flex;
    justify-content: flex-end;
  }
  
  .loadingBtn {
    border: 1px solid #DA611B;
    position: relative;
    height: 42px;
    width: 88px;
    border-radius: 10px;
  }
}
</style>
