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
        <input v-model="name" type="text">
      </div>
      <div class="input inputDificultad">
        <p>Dificultad</p>
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
        <p>Descripcion</p>
        <textarea v-model="detail" class="detailsTextarea"></textarea>
      </div>
      <div class="input">
        <p>Duración (minutos)</p>
        <input v-model="duration" type="number" min="0">
      </div>
    </div>
    <RoutineCycle ref="cicloCalentamiento" title="Ciclo Calentamiento" />
    <RoutineCycle v-for="(n, index) in cycles" ref="cicloEjercicio" :key="n" :title="`Ciclo ${index+1}`" @delete="removeCycle(index)" deleteable/>
    <AddButton @click="newCycle" class="add-cycle-button"/>
    <RoutineCycle ref="cicloEnfriamiento" title="Ciclo Enfriamiento" />
    <p v-if="error" :class="error ? 'error-msg' : 'hidden'">{{textError}}</p>
    <Button @click="createRutina" text="Guardar" />
  </div>
</template>

<script>
import Button from "../components/micro-components/Button.vue"
import { Api } from "../../api/api"
import AddButton from "../components/micro-components/AddButton.vue"
import RoutineCycle from "../components/RoutineCycle.vue"
import Modal from "../components/Modal.vue"

export default {
  name: "CrearRutina",
  components: {
    Button,
    AddButton,
    RoutineCycle,
    Modal
  },
  data() {
    return {
      name: '',
      detail: '',
      difficulty: '',
      cycleID: 0,
      cycles: [],
      modalOpen: true,
      repeticiones: 0,
      error: false,
      textError: '',
      duration: 0,
    }
  },
  methods: {
    newCycle() {
      this.cycles.push(this.cycleID++);
    },
    removeCycle(index) {
      this.cycles.splice(index,1);
    },
    async createRutina() {
      let name = this.name;
      let detail = this.detail;
      let isPublic = true;
      let difficulty = this.difficulty;
      let duration = this.duration;

      if(name == "") {
        this.textError = "Inserte un nombre";
        this.error = true;
        return;
      }

      if(detail == "") {
        this.textError = "Inserte una descripción";
        this.error = true;
        return;
      }

      if(difficulty == "") {
        this.textError = "Seleccione la dificultad";
        this.error = true;
        return;
      }

      //Post Rutina
      let rutina = {
        name,
        detail,
        isPublic,
        difficulty,
        metadata: {
          duration
        }
      }
      let routineID;
      const url = `${Api.baseUrl}/routines`;
      try {
        const res = await Api.post(url, true, rutina);
        routineID = res.id;
        this.error = false;
      } catch(e) {
        this.error = true;
        this.textError = e.description;
        return;
      }

      let cycles = [
        {
          id: null,
          name: this.$refs.cicloCalentamiento.title,
          type: "warmup",
          repetitions: this.$refs.cicloCalentamiento.repetitions,
          order: 1,
          detail: "",
          exercises: this.$refs.cicloCalentamiento.apiExercises
        }
      ]

      if(this.$refs.cicloEjercicio) {
        this.$refs.cicloEjercicio.forEach((ciclo, index) => {
          cycles.push({
            id: null,
            name: ciclo.title,
            type: "exercise",
            repetitions: ciclo.repetitions,
            order: index + 2,
            detail: "",
            exercises: ciclo.apiExercises
          })
        })
      }

      let exCount = this.$refs.cicloEjercicio ? this.$refs.cicloEjercicio.length : 0;

      cycles.push({
        id: null,
        name: this.$refs.cicloEnfriamiento.title,
        type: "cooldown",
        repetitions: this.$refs.cicloEnfriamiento.repetitions,
        order: exCount + 2,
        detail: "",
        exercises: this.$refs.cicloEnfriamiento.apiExercises
      })

      cycles.forEach(async (cycle, index) => {
        const url = `${Api.baseUrl}/routines/${routineID}/cycles`;
        let id;
        try {
          const res = await Api.post(url, true, {
            name: cycle.name,
            detail: cycle.detail,
            repetitions: cycle.repetitions,
            order: cycle.order,
            type: cycle.type
          });
          id = res.id;
          this.error = false;
        } catch(e) {
          this.error = true;
          this.textError = e.description;
          return;
        }

        cycle.exercises.forEach(async (exercise, index) => {
          const url = `${Api.baseUrl}/cycles/${id}/exercises/${exercise.id}`;
          try {
            const res = await Api.post(url, true, {
              order: index+1,
              repetitions: exercise.repetitions,
              duration:0
            });
            this.error = false;
          } catch(e) {
            this.error = true;
            this.textError = e.description;
            return;
          }
        })
      });
      
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
  .container {
    width: 80%;
    margin: auto;
    margin-top: 4em;
    margin-bottom: 4em;

    .error-msg {
      color: tomato;
    }

    .hidden {
      display: none;
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
        
        input,select {
          width: 100%;
          border: 1px solid #BFBFBF;
          border-radius: 10px;
          padding: .7em 1em;
          outline: none;
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
    
    .bottomInputs {
      margin-top: 0;
    }
  }
</style>