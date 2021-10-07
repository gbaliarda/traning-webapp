import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Ejercicios from "../views/Ejercicios.vue";
import Rutinas from "../views/Rutinas.vue";
import CrearRutina from "../views/CrearRutina.vue";
import Perfil from "../views/Perfil.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/ejercicios",
    name: "Ejercicios",
    component: Ejercicios,
  },
  {
    path: "/rutinas",
    name: "Rutinas",
    component: Rutinas,
  },
  {
    path: "/crear-rutina",
    name: "CrearRutina",
    component: CrearRutina,
  },
  {
    path: "/perfil",
    name: "Perfil",
    component: Perfil,
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
