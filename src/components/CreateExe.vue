<template>
  <form @submit="handleSubmit" class="createExe">
    <v-icon v-if="editable && this.id && !editing" size="27px" class="icon-edit" @click="toggleEditing">mdi-pencil</v-icon>
    <v-icon v-else-if="editable && this.id && editing" size="27px" class="icon-edit" @click="toggleEditing">mdi-close</v-icon>
    <input v-model="nombre" required placeholder="Nombre" type="text" :disabled="!editing">
    <select required v-model="grupo" :disabled="!editing" class="groupSelect">
      <option disabled>Grupo Muscular</option>
      <option>Piernas</option>
      <option>Brazos</option>
      <option>Pecho</option>
      <option>Hombros</option>
    </select>
    <div class="arrow-grp"></div>
    <select required v-model="dif" :disabled="!editing" class="difSelect">
      <option disabled>Dificultad</option>
      <option>Principiante</option>
      <option>Intermedia</option>
      <option>Avanzada</option>
    </select>
    <div class="arrow-dif"></div>
    <textarea placeholder="Descripción" cols="30" rows="10" v-model="desc" :disabled="!editing" class="inputTextarea"></textarea>
    <p :class="error.description!='' ? 'error' : 'hidden'">{{ error.description }}</p>
    <div v-if="editable" class="buttons">
      <Button v-if="!loading" text="Guardar" class="btn" :class="{ disabled: !editing }" />
      <div v-else class="loadingBtn">
        <Spinner />
      </div>
      <div v-if="this.id" @mouseenter="displayTooltip" @mouseleave="displayTooltip" @click="deleteExercise">
        <Button v-if="!loading" text="Eliminar"  class="delete btn" />
        <div v-else class="loadingBtn">
          <Spinner />
        </div>
        <div v-if="!loading" :class="tooltip ? 'tooltip' : 'hidden'">Si elimina el ejercicio,<br> se perderá para siempre</div>
      </div>
    </div>
  </form>
</template>

<script>
import Button from "./micro-components/Button.vue"
import Spinner from "./micro-components/Spinner.vue"
import { Api } from "../../api/api"

export default {
  name: "CreateExe",
  components: {
    Button,
    Spinner,
  },
  props: {
    getterEx: Function,
    id: Number,
    closeMod: Function,
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      nombre: "",
      grupo: "Grupo Muscular",
      dif: "Dificultad",
      desc: "",
      error: {
        description: ''
      },
      loading: false,
      tooltip: false,
      editing: false,
    }
  },
  async created() {
    if (!this.id) {
      this.editing = true;
      return;
    }
    const url = `${Api.baseUrl}/exercises/${this.id}`;
    try {
      const res = await Api.get(url, true);
      this.nombre = res.name;
      this.grupo = res.metadata.grupo;
      this.dif = res.metadata.dif;
      this.desc = res.detail;
    } catch(e) {
      if (e.code == 99)
        this.error.description = "Error al cargar ejercicio";
      else
        this.error = e;
    }
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      if (this.grupo == "Grupo Muscular") {
        this.error.description = "Seleccione un grupo muscular";
        return;
      }
      if (this.dif == "Dificultad") {
        this.error.description = "Seleccione la dificultad";
        return;
      }
      if (this.nombre.length > 20) {
        this.error.description = "El nombre es demasiado largo";
        return;
      }
      const payload = {
        name: this.nombre,
        detail: this.desc,
        type: "exercise",
        metadata: {
          grupo: this.grupo,
          dif: this.dif,
        }
      }
      const url = `${Api.baseUrl}/exercises`;
      this.loading = true;
      try {
        if (!this.id)
          await Api.post(url, true, payload);
        else
          await Api.put(url+`/${this.id}`, true, payload);
        this.getterEx();
        this.closeMod();
        this.error = {};
      } catch(e) {
        if (e.code == 99)
          this.error.description = "Error al guardar ejercicio";
        else if (e.description === "Data constraint")
          this.error.description = "Nombre de ejercicio repetido";
        else
          this.error = e;
      }
      this.loading = false;
    },
    async deleteExercise(e) {
      e.preventDefault();
      const url = `${Api.baseUrl}/exercises/${this.id}`;
      this.loading = true;
      try {
        await Api.delete(url, true);
        this.error = {};
        this.getterEx();
        this.closeMod();
      } catch(e) {
        if (e.code == 99)
          this.error.description = "Error al eliminar ejercicio";
        else
          this.error = e;
      }
      this.loading = false;
    },
    displayTooltip() {
      this.tooltip = !this.tooltip;
    },
    toggleEditing() {
      this.editing = !this.editing;
    }
  }
};
</script>

<style scoped lang="scss">
.createExe {
  display: grid;
  grid-template-columns: 1;
  grid-gap: 15px;
  place-items: start;
  width: 500px;

  .inputTextarea {
    min-height: 200px;
  }

  .groupSelect, .difSelect {
    cursor: pointer;
  }

  .groupSelect:disabled, .difSelect:disabled {
    cursor: default;
  }

  .hidden {
    display: none;
  }

  .btn {
    padding: .6em 2em;
  }

  .disabled {
    background: #bbb;
    pointer-events: none;
  }

  .icon-edit {
    color: #DA611B;
    position: absolute;
    top: 9%;
    left: 62%;
    cursor: pointer;
  }

  .icon-edit::after {
    background: none;
  }

  .error {
    color: tomato;
  }

  .loadingBtn {
    border: 1px solid #DA611B;
    position: relative;
    width: 130px;
    // width: 150px;
    height: 38px;
    // height: 58px;
    border-radius: 10px;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .delete {
      background: #fff;
      border: 1px solid #DA611B;
      color: #DA611B;
      font-weight: 500;
      position: relative;
    }

    .tooltip {
      position: absolute;
      right: 10px;
      bottom: 100px;
      background: tomato;
      color: #fff;
      text-align: center;
      padding: 1em;
      border-radius: 10px;
      pointer-events: none;

      &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 10px;
        border-style: solid;
        border-color: tomato transparent transparent transparent;
      }
    }
  }
}

input, textarea, select {
  border: 1px solid #BFBFBF;
  border-radius: 10px;
  width: 100%;
  padding: .5em 1em;
}

textarea {
  resize: none;
}

.arrow-grp, .arrow-dif {
  width: 0; 
  height: 0; 
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  position: absolute;
  right: 65px;
  pointer-events: none;
  border-top: 10px solid #EA8D59;
}

.arrow-grp {
  top: 166px;
}

.arrow-dif {
  top: 218px;
}
</style>
