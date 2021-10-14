<template>
  <div class="ejercicio" :style="cssVars">
    <p class="card-title">{{ titulo }}</p>
    <div class="descripcion">
      <div class="select-relative-container">
        <select v-model="inputType">
          <option value="repetitions">Repeticiones</option>
          <option value="seconds">Segundos</option>
          <option value="minutes">Minutos </option>
        </select>
        <div class="select-arrow"/>
      </div>
      
      <NumInput v-if="inputType == 'minutes'" :max="15" class="num-input-root" v-model="numInput"/>
      <NumInput v-else class="num-input-root" v-model="numInput"/>
      <div class="descanso-container">
        <span style="margin-left: .11em">Descanso</span>
        <div style="margin-right: .35em">
          <input type="number" min="0" v-model="descanso" />
          s
        </div>
      </div>
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
    startRepetitions: Number,
    startDuration: Number,
    startDescanso: String,
  },
  data() {
    return {
      initialized: false,
      numInput: 1,
      inputType: "repetitions",
      modalOpen: false
      descanso: 0,
    }
  },
  computed: {
    cssVars() {
      return {
        '--margin-right': this.marginRight,
        '--margin-bottom': this.marginBottom
      }
    },
    duration() {
      if(this.inputType == "minutes") return this.numInput * 60;
      else if(this.inputType == "seconds") return this.numInput;
      else return 0;
    },
    repetitions() {
      if(this.inputType == "repetitions") return this.numInput;
      else return 0;
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
    if(this.initialized) return;

    if(this.startRepetitions) {
      this.numInput = this.startRepetitions;
      this.inputType = "repetitions";
    }
      
    if(this.startDuration) {
      if(this.startDuration < 60){
        this.inputType = "seconds";
        this.numInput = this.startDuration;
      }
      else {
        this.inputType = "minutes"
        this.numInput = Math.floor(this.startDuration / 60);
      }
    }
    
    if(this.startDescanso)
        this.descanso = this.startDescanso;
        
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

    .descanso-container {
      display: flex;
      justify-content: space-between;

      input {
        text-align: right;
        width: 40px;
      }
    }

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
    .descripcion {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      select {
        height: 100%;
        width: 100%;
        outline: 1px solid #bfbfbf;
        border-radius: 10px;
        padding-right: 25px;
        padding-left: 5px;
      }
      
      .num-input-root {
        width: 50px;
      }
    }
  }

  .select-relative-container {
    position: relative;
  }

  .select-arrow {
    width: 0; 
    height: 0; 
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    position: absolute;
    right: 65px;
    pointer-events: none;
    border-top: 10px solid #EA8D59;
    top: 40%;
    right: 5%;
  }

  /* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>