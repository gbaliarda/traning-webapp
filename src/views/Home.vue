<template>
  <div class="container">
    <div class="landing">
      <div class="left">
        <h2 class="title">Crea tus rutinas de forma rápida y sencilla</h2>
        <h3 class="subtitle">Brindamos la mejor interfaz de control de rutinas de Latinoamérica.</h3>
      </div>
      <div class="right">
        <img src="../assets/imgHome.svg" alt="Man exercising" />
      </div>
    </div>
    <img src="../assets/wave.svg" class="wave" alt="Wave" />
    <div id="herramientas">
      <h3>Herramientas</h3>
      <div class="herr-cont">
        <Herramienta text="Crea tus rutinas personalizadas" icon="mdi-pencil" />
        <Herramienta text="Crea tus rutinas personalizadas" icon="mdi-pencil" />
        <Herramienta text="Crea tus rutinas personalizadas" icon="mdi-pencil" />
      </div>
    </div>
    <img src="../assets/waveHerramientas.svg" class="waveH" alt="Wave" />

    <Footer />
  </div>
</template>

<script>
import Button from '../components/micro-components/Button.vue';
import Herramienta from '../components/micro-components/Herramienta.vue';
import Footer from '../components/Footer.vue';

export default {
  name: "Home",
  components: {
    Button,
    Herramienta,
    Footer
  }
};
</script>

<style scoped lang="scss">

.landing {
  display: flex;
  width: 80%;
  margin: auto;
  height: calc(100vh - 70px);
  overflow: hidden;
}

.wave {
  margin-top: -100%;
  width: 100vw;
}

#herramientas {
  margin-top: -5px;
  height: 400px;
  width: 100%;
  background: #EA8D59;
  color: #f5f5f5;
  padding-top: 1em;

  h3 {
    font-size: 2.7em;
    font-weight: 400;
    text-align: center;
    color: #fff;
  }

  .herr-cont {
    width: 80%;
    margin: auto;
    margin-top: 7.5em;
    display: flex;
    justify-content: space-between;
  }
}

.waveH {
  width: 100%;
  margin-bottom: 70px;
}

.left {
  margin-top: -100px;
  flex-basis: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    font-size: 2.6em;
    font-weight: 400;
    width: 75%;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.4em;
    font-weight: 300;
    width: 90%;
    margin-bottom: 2rem;
  }

  .btn {
    width: 140px;
  }
}

.right {
  margin-top: -100px;
  flex-basis: 45%;
  display: grid;
  place-items: center;

  img {
    width: 85%;
  }
}
</style>
