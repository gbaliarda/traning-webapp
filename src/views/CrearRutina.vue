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
      <div class="input">
        <p>Dificultad</p>
        <!-- Reemplazar por select -->
        <select v-model="difficulty">
          <option value="beginner">Principiante</option>
          <option value="intermediate">Intermedio</option>
          <option value="advanced">Avanzado</option>
        </select>
      </div>
    </div>
    <RoutineCycle ref="cicloCalentamiento" title="Ciclo Calentamiento" />
    <RoutineCycle v-for="(n, index) in cycles" ref="cicloEjercicio" :key="n" :title="`Ciclo Ejercicio ${index+1}`" @delete="removeCycle(index)" deleteable/>
    <AddButton @click="newCycle" class="add-cycle-button"/>
    <RoutineCycle ref="cicloEnfriamiento" title="Ciclo Enfriamiento" />
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
      detail: 'asdfasdfasdf',
      difficulty: '',
      cycleID: 0,
      cycles: [],
      modalOpen: true,
      repeticiones: 0
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

      let error = false;
      if(name == "") {
        console.log("Error: Nombre vacío");
        error = true;
      }

      if(detail == "") {
        console.log("Error: Descripción vacía");
        error = true;
      }

      if(difficulty == "") {
        console.log("Error: dificultad vacía");
        error = true;
      }

      if(error) return;

      //Post Rutina
      let rutina = {
        name,
        detail,
        isPublic,
        difficulty
      }
      let routineID;
      const url = `${Api.baseUrl}/routines`;
      try {
        const res = await Api.post(url, true, rutina);
        routineID = res.id;
      } catch(e) {
        console.log(e);
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
        } catch(e) {
          console.log(e);
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
          } catch(e) {
            console.log(e);
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
    }
    
  }
</style>