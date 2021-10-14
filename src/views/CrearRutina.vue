<template>
  <CreateEditRoutine :editing="false" />
</template>

<script>
import CreateEditRoutine from "../components/CreateEditRoutine.vue"

export default {
  name: "CrearRutina",
  components: {
    CreateEditRoutine
  }
};
</script>