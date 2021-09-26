<template>
  <div class="container">
    <div class="title">
      <h1>Mis rutinas</h1>
      <v-icon class="icon" size="30">mdi-pencil</v-icon>
    </div>
    <div class="rutinas">
      <RoutineCard titulo="Piernas" duracion="30 minutos" dificultad="avanzada" />
      <RoutineCard titulo="Brazos" duracion="30 minutos" dificultad="avanzada" />
      <AddButton />
    </div>
  </div>
</template>

<script>
import RoutineCard from "../components/RoutineCard.vue"
import AddButton from "../components/micro-components/AddButton.vue"

export default {
  name: "Rutinas",
  components: {
    RoutineCard,
    AddButton,
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