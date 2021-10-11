<template>
    <div class="relative-container">
        <Modal :open="modalOpen" title="Elegir Ejercicio" :closeMod="()=>{this.modalOpen = false}">
            <ChooseExerciseModal @choose="chooseEx"/>
        </Modal>
        <div class="column">
        <div class="title-row row">
            <p class="title">{{title}}</p>
            <NumInput v-model="repetitions" class="input" text="Repeticiones"/>
        </div>
        <div class="row">
            <CreateCard v-for="ex in exercises" ref="exercise" :key="ex.id" :titulo="ex.name" />
            <AddButton @click="modalOpen = true" class="add-button"/>
        </div>
        <v-icon v-if="deleteable" @click="$emit('delete')" class="icon" size="30">mdi-delete</v-icon>
        </div>
    </div>
</template>

<script>
import CreateCard from "../components/CreateCard.vue"
import AddButton from "../components/micro-components/AddButton.vue"
import NumInput from "../components/micro-components/NumInput.vue"
import Modal from "../components/Modal.vue"
import ChooseExerciseModal from "../components/ChooseExerciseModal.vue"

export default {
    name: "RoutineCycle",
    data() {
        return {
            repetitions: 0,
            modalOpen: false,
            exercises: []
        }
    },
    components: {
        CreateCard,
        AddButton,
        NumInput,
        Modal,
        ChooseExerciseModal
    },
    props: {
        title: {
            type: String,
            required: true
        },
        deleteable: {
            type: Boolean,
            default: false
        }
    },
    computed: {
      apiExercises() {
        return this.exercises.map((ex, index) => ({
          id: ex.id,
          duration: 0,
          repetitions: this.$refs.exercise[index].repetitions
        }))
      }
    },
    methods: {
      chooseEx(exercise) {
        this.modalOpen = false;
        this.exercises.push(exercise);
      }
    }
}
</script>

<style scoped lang="scss">
    .relative-container {
        position: relative;
        margin: 0;
        padding: 0;
        width: 100%;
    }

    .add-button {
      margin-right: 32px;
      margin-bottom: 32px;
    }

    .row, .column {
      display: flex;
      flex-wrap: wrap;
    }

    .column {
      flex-direction: column;
      outline: #BFBFBF solid 1px;
      border-radius: 10px;
      padding-top: 18px;
      padding-left: 32px;
      margin-bottom: 48px;
    }

    .row {
      flex-direction: row;
      align-items: center;
      flex-grow: 0;
      flex-shrink: 0;
    }

    .title {
      margin: 0;
    }
    
    .title-row {
      margin-bottom: 1em;
      justify-content: space-between;
    }

    .input {
      padding-top: 4px;
      margin-left: 24px;
      margin-right: 24px;
      width: 150px;
    }

    .icon {
        position: absolute;
        bottom: 24px;
        right: 24px;
        color: #DA611B;
        cursor: pointer;
    }

    p {
      font-size: 1.4em;
      margin-bottom: 1em;
    }
</style>