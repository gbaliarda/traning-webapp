<template>
  <div class="container">
    <div class="title">
      <h1>Mis rutinas</h1>
      <v-icon class="icon" size="30">mdi-pencil</v-icon>
    </div>
    <div class="rutinas">
      <RoutineCard v-for="rutina in rutinas" :key="rutina.id" :titulo="rutina.name" :dificultad="rutina.difficulty" />
      <router-link to="/crear-rutina">
        <AddButton />
      </router-link>
    </div>
  </div>
</template>

<script>
import RoutineCard from "../components/RoutineCard.vue"
import AddButton from "../components/micro-components/AddButton.vue"
import {Rutina} from "../../api/rutinas";
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: "Rutinas",
  components: {
    RoutineCard,
    AddButton,
  },
  data(){
    return{
      rutinas: []
    }
  },
  methods: {
    ...mapActions('rutinas', {
      $deleteRutina: 'delete',
      $getRutina: 'get',
      $getAllRutinas: 'getAll'
    })
  },
  mounted() {
    this.$nextTick(async () => {
      try {
        this.rutinas = (await this.$getAllRutinas()).content;
        console.log(this.rutinas);
      }
      catch(err) {
        console.log(err);
      }
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