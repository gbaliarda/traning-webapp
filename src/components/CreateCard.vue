<template>
  <div class="ejercicio">
    <p class="card-title">{{ titulo }}</p>
    <div class="descripcion">
      <NumInput text="Repeticiones" />
      <NumInput text="Series" />
    </div>
    <div class="buttons">
      <button>Detalles</button>
      <v-icon class="icon" size="30">mdi-delete</v-icon>
    </div>
  </div>
</template>

<script>
import NumInput from "./micro-components/NumInput.vue"

export default {
  name: "CreateCard",
  components: {
    NumInput,
  },
  props: {
    titulo: String,
  }
};
</script>

<style scoped lang="scss">
  .ejercicio {
    padding: 2em 1.5em;
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

    .buttons {
      display: flex;
      justify-content: space-between;

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