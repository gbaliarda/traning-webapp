<template>
  <div class="rutina">
    <p class="card-title">{{ titulo }}</p>
    <div class="descripcion">
      <p>Duracion: {{ duracion }} minutos</p>
      <p>Dificultad: {{ dificultad }}</p>
    </div>
    <div class="buttons">
      <button @click="$emit('details')">Detalles</button>
      <v-icon @click="$emit('share')" class="icon" size="34">mdi-share-variant</v-icon>
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
  },
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

    button:not(.icon) {
      color: #da611b;
      border: 1px solid #da611b;
      width: 100px;
      height: 40px;
      border-radius: 10px;
    }

    .icon {
      cursor: pointer;
      color: #da611b;
    }
  }
}
</style>

