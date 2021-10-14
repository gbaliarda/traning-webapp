<template>
  <div class="container">
    <div class="title">
      <h1>Mis rutinas</h1>
    </div>
    <p v-if="error.status" class="error-msg">{{ error.description }}</p>
    <div v-if="!loading" class="rutinas">
      <RoutineCard
        v-for="routine in routines"
        :key="routine.id"
        :titulo="routine.name"
        :dificultad="routine.difficulty"
        :duracion="routine.metadata.duration.toString()"
        @details="openModal(routine.id)"
        @share="copyToClipboard(`${window.location.host}/ver-rutina/${routine.id}`)"
      />
      <router-link to="/crear-rutina">
        <AddButton />
      </router-link>
    </div>
    <div v-else>
      <Spinner />
    </div>
    <ViewRoutineModal ref="modal" :editable="true" />
    <div v-if="copyMessage" class="copyMessage" @click="copyMessage = false">
      <p>Link de la rutina copiado al portapapeles</p>
    </div> 
  </div>
</template>

<script>
import RoutineCard from "../components/RoutineCard.vue";
import AddButton from "../components/micro-components/AddButton.vue";
import ViewRoutineModal from "../components/ViewRoutineModal.vue";
import Spinner from "../components/micro-components/Spinner.vue";
import { mapActions, mapState } from "vuex";
import { Api } from "../../api/api";

export default {
  name: "Rutinas",
  components: {
    RoutineCard,
    AddButton,
    ViewRoutineModal,
    Spinner,
  },
  data() {
    return {
      routines: [],
      loading: false,
      copyMessage: false,
      error: {
        status: false,
        description: ""
      }
    };
  },
  computed: {
    window() {
      return window;
    },
    ...mapState('security', {
      $user: state => state.user,
    })
  },
  methods: {
    ...mapActions('security', {
      $getCurrentUser: 'getCurrentUser',
    }),
    async getRoutines() {
      try {
        await this.$getCurrentUser();
        let url = `${Api.baseUrl}/routines?size=1000&userId=${this.$user.id}`;
        const res = await Api.get(url, true);
        this.routines = res.content;
        this.error.status = false;
      } catch (e) {
        if (e.code == 99)
          this.error.description = "Error al cargar rutinas";
        else
          this.error.description = e.description;
        this.error.status = true;
        return;
      }

      const diffMap = {
        beginner: "Principiante",
        intermediate: "Intermedio",
        advanced: "Avanzado",
      };

      this.routines = this.routines.map((routine) => {
        routine.difficulty = diffMap[routine.difficulty];
        return routine;
      });
      this.loading = false;
    },
    openModal(routineID) {
      this.$refs.modal.open(routineID);
    },
    closeModal() {
      this.$refs.modal.close();
    },
    copyToClipboard(str) {
      const el = document.createElement('textarea');  // Create a <textarea> element
      el.value = str;                                 // Set its value to the string that you want copied
      el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
      el.style.position = 'absolute';                 
      el.style.left = '-9999px';                      // Move outside the screen to make it invisible
      document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
      const selected =            
        document.getSelection().rangeCount > 0        // Check if there is any content selected previously
          ? document.getSelection().getRangeAt(0)     // Store selection if found
          : false;                                    // Mark as false to know no selection existed before
      el.select();                                    // Select the <textarea> content
      document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
      document.body.removeChild(el);                  // Remove the <textarea> element
      if (selected) {                                 // If a selection existed before copying
        document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
        document.getSelection().addRange(selected);   // Restore the original selection
      }
      this.copyMessage = true;
      setTimeout(() => this.copyMessage = false, 4000);
    }
  },
  mounted() {
    this.loading = true;
    this.$nextTick(async () => {
      this.getRoutines();
    });
    this.loading = false;
  },
};
</script>

<style scoped lang="scss">
.container {
  width: 80%;
  margin: auto;
  margin-top: 4em;

  h1 {
    font-weight: 400;
    margin-bottom: 1em;
  }

  .error-msg {
    color: tomato;
    font-size: 1.2em;
  }

  .rutinas {
    display: flex; // quizas cambiar a grid
    flex-wrap: wrap;
    margin-top: 5em;
  }

  .copyMessage {
    position: fixed;
    background: #333;
    color: white;
    padding: 1em;
    bottom: 20px;
    left: 40%;
    border-radius: 10px;
    cursor: pointer;
  }
}
</style>
