<template>
  <div class="ejercicio">
    <p class="card-title">{{ titulo }}</p>
    <div class="descripcion">
      <p v-if="grupo">Grupo: {{ grupo }}</p>
      <p v-if="dificultad">Dificultad: {{ dificultad }}</p>
      <p v-if="duration">{{ duration }}</p>
    </div>
    <button @click="openModal">Detalles</button>
    <Modal title="Detalles" :open="modalOpen" :closeMod="closeMod">
      <CreateExe :id="id" :closeMod="closeMod" :getterEx="getterEx" />
    </Modal>
  </div>
</template>

<script>
import Modal from "./Modal.vue"
import CreateExe from "./CreateExe.vue"

export default {
  name: "ExerciseCard",
  components: {
    Modal,
    CreateExe,
  },
  data() {
    return {
      modalOpen: false
    }
  },
  props: {
    titulo: String,
    grupo: String,
    dificultad: String,
    id: Number,
    getterEx: Function,
    duration: String,
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeMod() {
      this.modalOpen = false;
    }
  },
};
</script>

<style scoped lang="scss">
  .ejercicio {
    padding: 2em 1em;
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
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