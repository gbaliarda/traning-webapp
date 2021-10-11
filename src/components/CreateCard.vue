<template>
  <div class="ejercicio" :style="cssVars">
    <p class="card-title">{{ titulo }}</p>
    <div class="descripcion">
      <NumInput v-model="repetitions" text="Repeticiones" />
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
    marginRight: {
      type: String,
      default: "3em"
    },
    marginBottom: {
      type: String,
      default: "2em"
    }
  },
  data() {
    return {
      repetitions: 0
    }
  },
  computed: {
    cssVars() {
      return {
        '--margin-right': this.marginRight,
        '--margin-bottom': this.marginBottom
      }
    }
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
    flex-shrink: 0;
    justify-content: space-between;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin-right: var(--margin-right);
    margin-bottom: var(--margin-bottom);

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