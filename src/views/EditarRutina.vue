<template>
  <CreateEditRoutine :editing="true" :id="id" />
</template>

<script>
import CreateEditRoutine from "../components/CreateEditRoutine.vue"

export default {
  name: "EditarRutina",
  components: {
    CreateEditRoutine
  },
  props: {
    id: String,
  }
};
</script>