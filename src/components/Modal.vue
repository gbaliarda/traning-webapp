<template>
  <div v-bind:class="{root: open, hidden: !open, hiding: hiding}">
    <div class="box">
      <v-icon class="closeBtn" size="30" @click="closeModal">mdi-close</v-icon>
      <h3>{{ title }}</h3>
      <slot></slot>
    </div>
    <div class="bg" @click="closeModal"></div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    title: String,
    open: Boolean,
    closeMod: Function
  },
  data() {
    return {
      hiding: true,
    }
  },
  methods: {
    closeModal() {
      this.hiding = true;
      setTimeout(() => this.closeMod(), 250);
    }
  },
  watch: {
    open: function(newVal, oldVal) {
      if(newVal)
        setTimeout(() => this.hiding = false, 5);
    }
  }
};
</script>

<style scoped lang="scss">
.root {
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  width: 100%;
  height: 100vh;
  place-items: center;
  z-index: 2;
  transition: opacity .25s;
}

.hiding {
  opacity: 0;

  .box {
    transition: transform .25s;
    transform: translateY(25px);
  }
}

.hidden {
  display: none;
}

.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #000;
  opacity: .6;
}

.box {
  background: #fff;
  padding: 3em;
  min-width: 300px;
  min-height: 300px;
  z-index: 1;
  position: relative;
  border-radius: 5px;
  transition: transform .25s;

  h3 {
    text-align: center;
    font-size: 1.6em;
    font-weight: 400;
    margin-bottom: 20px;
  }

  .closeBtn {
    color: #DA611B;
    top: 10px;
    right: 10px;
    position: absolute;
    cursor: pointer;
  }
}
</style>