<template>
  <div class="num-input">
    <span>{{ text }}</span>
    <span class="counter">{{ value }}</span>
    <div class="arrow-up" @click="counterUp"></div>
    <div class="arrow-down" @click="counterDown"></div>
  </div>
</template>

<script>
  export default {
    name: "NumInput",
    props: {
      text: String,
      value: Number
    },
    methods: {
      counterUp() {
        this.$emit('input', this.value+1);
      },
      counterDown() {
        if (this.value == 1)
          return;
        this.$emit('input', this.value-1);
      },
    }
  };
</script>

<style scoped lang="scss">
  .num-input {
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    justify-content: space-between;
    position: relative;

    span {
      padding: 10px 3px;
    }

    .counter {
      margin-right: 17px;
    }

    .arrow-up, .arrow-down {
      width: 0; 
      height: 0; 
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      position: absolute;
      right: 2px;
      cursor: pointer;
    }

    .arrow-up {
      border-bottom: 10px solid #EA8D59;
      top: 5px;
    }

    .arrow-down {
      border-top: 10px solid #EA8D59;
      bottom: 7px;
    }
  }
</style>