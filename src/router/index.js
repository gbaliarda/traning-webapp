import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Ejercicios from "../views/Ejercicios.vue";
import Rutinas from "../views/Rutinas.vue";
import CrearRutina from "../views/CrearRutina.vue";
import Perfil from "../views/Perfil.vue";
import P404 from "../views/P404.vue";
import store from "../store";

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
    meta: {
      requiresAuth: true,
    },
    component: Ejercicios,
  },
  {
    path: "/rutinas",
    name: "Rutinas",
    meta: {
      requiresAuth: true,
    },
    component: Rutinas,
  },
  {
    path: "/crear-rutina",
    name: "CrearRutina",
    meta: {
      requiresAuth: true,
    },
    component: CrearRutina,
  },
  {
    path: "/perfil",
    name: "Perfil",
    meta: {
      requiresAuth: true,
    },
    component: Perfil,
  },
  {
    path: "/404",
    alias: "*",
    name: "P404",
    component: P404,
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth)
    if (!store.getters['security/isLoggedIn'])
      next({ name: "Home" })
    else
      next()
  else
    next()
})

export default router;
