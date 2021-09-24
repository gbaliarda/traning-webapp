<template>
  <button>{{ text }}</button>
</template>

<script>
  export default {
    name: "Button",
    props: {
      text: String
    }
  };
</script>

<style scoped lang="scss">
  button {
    background: #DA611B;
    padding: 0.7em;
    border-radius: .6em;
    color: #fff;
  }
</style>