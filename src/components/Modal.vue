<template>
  <div v-bind:class="{root: open, hidden: !open}">
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
  methods: {
    closeModal() {
      this.closeMod();
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
  opacity: .7;
}

.box {
  background: #fff;
  padding: 3em;
  min-width: 300px;
  min-height: 300px;
  z-index: 1;
  position: relative;

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