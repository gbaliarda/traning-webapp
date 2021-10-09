<template>
  <form @submit="handleSubmit" class="createExe">
    <input v-model="nombre" required placeholder="Nombre" type="text">
    <select required v-model="grupo">
      <option disabled>Grupo Muscular</option>
      <option>Piernas</option>
      <option>Brazos</option>
      <option>Pecho</option>
      <option>Hombros</option>
    </select>
    <div class="arrow-grp"></div>
    <select required v-model="dif">
      <option disabled>Dificultad</option>
      <option>Principiante</option>
      <option>Intermedia</option>
      <option>Avanzada</option>
    </select>
    <div class="arrow-dif"></div>
    <textarea placeholder="Descripción" cols="30" rows="10" v-model="desc"></textarea>
    <p :class="error.description!='' ? 'error' : 'hidden'">{{ error.description }}</p>
    <Button v-if="!loading" text="Guardar" />
    <div v-else class="loadingBtn">
      <Spinner />
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
        await Api.post(url, true, payload);
        this.error = null;
      } catch(e) {
        if (e.code == 99)
          this.error.description = "Error al guardar ejercicio";
        else
          this.error = e;
      }
      this.loading = false;
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

  .hidden {
    display: none;
  }

  button {
    padding: .6em 2em;
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
}

input, textarea, select {
  border: 1px solid #BFBFBF;
  border-radius: 10px;
  width: 100%;
  padding: .5em 1em;
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
