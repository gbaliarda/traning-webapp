<template>
  <div class="container">
    <div class="title">
      <h1>Mis ejercicios</h1>
      <v-icon class="icon" size="30">mdi-pencil</v-icon>
    </div>
    <div class="ejercicios">
      <ExerciseCard titulo="Sentadillas" grupo="piernas" dificultad="avanzada" />
      <ExerciseCard titulo="Sentadillas" grupo="piernas" dificultad="avanzada" />
      <AddButton />
    </div>
  </div>
</template>

<script>
import ExerciseCard from "../components/ExerciseCard.vue"
import AddButton from "../components/micro-components/AddButton.vue"

export default {
  name: "Ejercicios",
  components: {
    ExerciseCard,
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
    
    .ejercicios {
      display: flex; // quizas cambiar a grid
      flex-wrap: wrap;
      margin-top: 5em;
    }
  }
</style>