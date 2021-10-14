<template>
  <button @click="click">{{ text }}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
  },
  methods: {
    click() {
      this.$emit('click');
    }
  }
};
</script>

<style scoped lang="scss">
button {
  background: #da611b;
  padding: 0.7em;
  border-radius: 0.6em;
  color: #fff;
}
</style>
