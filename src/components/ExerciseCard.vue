<template>
  <div class="ejercicio">
    <p class="card-title">{{ titulo }}</p>
    <div class="descripcion">
      <p>Grupo: {{ grupo }}</p>
      <p>Dificultad: {{ dificultad }}</p>
    </div>
    <button>Detalles</button>
  </div>
</template>

<script>
export default {
  name: "ExerciseCard",
  props: {
    titulo: String,
    grupo: String,
    dificultad: String,
  }
};
</script>

<style scoped lang="scss">
  .ejercicio {
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

    button {
      color: #DA611B;
      border: 1px solid #DA611B;
      margin: 0 auto;
      width: 100px;
      height: 40px;
      border-radius: 10px;
    }
  }
</style>