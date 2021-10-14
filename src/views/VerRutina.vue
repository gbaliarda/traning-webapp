<template>
    <div>
        <Home />
        <ViewRoutineModal ref="modal" :editable="false" @close="$router.push('/')"/>
    </div>
</template>

<script>
import Home from "./Home.vue";
import ViewRoutineModal from "../components/ViewRoutineModal.vue";
export default {
    name: "VerRutina",
    components: {
        Home,
        ViewRoutineModal
    },
    props: {
        id: String
    },
    mounted() {
        this.$refs.modal.open(this.id)
    }
}
</script>
