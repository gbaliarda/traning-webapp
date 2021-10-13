<template>
  <div class="container">
    <div class="title">
      <h1>Mis rutinas</h1>
    </div>
    <div class="rutinas">
      <RoutineCard 
        v-for="routine in routines"
        :key="routine.id"
        :titulo="routine.name"
        :dificultad="routine.difficulty"
        @details="openModal(routine.id)"
      />
      <router-link to="/crear-rutina">
        <AddButton />
      </router-link>
    </div>
    <ViewRoutineModal ref="modal"/>
  </div>
</template>

<script>
import RoutineCard from "../components/RoutineCard.vue"
import AddButton from "../components/micro-components/AddButton.vue"
import ViewRoutineModal from "../components/ViewRoutineModal.vue";
import { Api } from "../../api/api";

export default {
  name: "Rutinas",
  components: {
    RoutineCard,
    AddButton,
    ViewRoutineModal
  },
  data(){
    return{
      routines: []
    }
  },
  methods: {
    async getRoutines() {
      let url = `${Api.baseUrl}/routines`;
      try {
        const res = await Api.get(url, true);
        this.routines = res.content;
      } catch (e) {
        console.log(`Error al obtener rutinas: ${e}`);
        return;
      }

      const diffMap = {
        "beginner": "Principiante",
        "intermediate": "Intermedio",
        "advanced": "Avanzado"
      }

      this.routines = this.routines.map((routine) => {
        routine.difficulty = diffMap[routine.difficulty];
        return routine;
      })
      
    },
    openModal(routineID) {
      this.$refs.modal.open(routineID);
    },
    closeModal() {
      this.$refs.modal.close();
    }
  },
  mounted() {
    this.$nextTick(async () => {
      this.getRoutines();
    })
  } 
};
</script>

<style scoped lang="scss">
  .container {
    width: 80%;
    margin: auto;
    margin-top: 4em;

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
    
    .rutinas {
      display: flex; // quizas cambiar a grid
      flex-wrap: wrap;
      margin-top: 5em;
    }
  }
</style>