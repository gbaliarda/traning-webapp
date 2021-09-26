<template>
  <div class="rutina">
    <p class="card-title">{{ titulo }}</p>
    <div class="descripcion">
      <p>Duracion: {{ duracion }}</p>
      <p>Dificultad: {{ dificultad }}</p>
    </div>
    <div class="buttons">
      <button>Detalles</button>
      <v-icon class="icon" size="34">mdi-share-variant</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoutineCard",
  props: {
    titulo: String,
    duracion: String,
    dificultad: String,
  }
};
</script>

<style scoped lang="scss">
  .rutina {
    padding: 2em 1em;
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin-right: 3em;
    margin-bottom: 2em;

    .card-title {
      font-size: 1.4em;
      text-align: center;
    }

    .descripcion {
      p {
        padding: 5px;
      }
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      width: 95%;
      margin: 0 auto;

      button {
        color: #DA611B;
        border: 1px solid #DA611B;
        width: 100px;
        height: 40px;
        border-radius: 10px;
      }

      .icon {
        cursor: pointer;
        color: #DA611B;
      }
    }
  }
</style>