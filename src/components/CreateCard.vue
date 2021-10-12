<template>
  <div class="ejercicio" :style="cssVars">
    <p class="card-title">{{ titulo }}</p>
    <div class="descripcion">
      <NumInput v-model="repetitions" text="Repeticiones" />
    </div>
    <div class="buttons">
      <button @click="openModal">Detalles</button>
      <v-icon @click="$emit('delete')" class="icon" size="30">mdi-delete</v-icon>
    </div>
    <Modal title="Detalles" :open="modalOpen" :closeMod="closeModal">
      <CreateExe :id="id" :getterEx="() => {}" :editable="false" />
    </Modal>
  </div>
</template>

<script>
import NumInput from "./micro-components/NumInput.vue"
import Modal from "./Modal.vue";
import CreateExe from "./CreateExe.vue";

export default {
  name: "CreateCard",
  components: {
    NumInput,
    Modal,
    CreateExe
  },
  props: {
    id: Number,
    titulo: String,
    marginRight: {
      type: String,
      default: "3em"
    },
    marginBottom: {
      type: String,
      default: "2em"
    },
    startRepetitions: Number
  },
  data() {
    return {
      initialized: false,
      repetitions: 1,
      modalOpen: false
    }
  },
  computed: {
    cssVars() {
      return {
        '--margin-right': this.marginRight,
        '--margin-bottom': this.marginBottom
      }
    }
  },
  methods: {
    closeModal() {
      this.modalOpen = false;
    },
    openModal() {
      this.modalOpen = true;
    }
  },
  created() {
    if(this.initialized || !this.startRepetitions) return;

    this.repetitions = this.startRepetitions;
    this.initialized = true;
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

      button:not(.icon) {
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