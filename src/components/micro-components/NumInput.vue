<template>
  <div class="container-relative">
    <div class="num-input">
      <span v-if="text">{{ text }}</span>
      <input type="number" ref="input" :min="min" class="counter" :value="value" @blur="e => handleInput(parseInt(e.target.value))" />
      <div class="arrow-up" @click="counterUp"></div>
      <div class="arrow-down" @click="counterDown"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NumInput",
    props: {
      text: String,
      value: Number,
      min: {
        type: Number,
        default: 1
      },
      max: Number
    },
    methods: {
      counterUp() {
        this.handleInput(this.value+1);
      },
      counterDown() {
        this.handleInput(this.value-1);
      },
      handleInput(value) {
        if (isNaN(value) || value < this.min) {
          value = this.min;
        }

        if(this.max && value > this.max) {
          value = this.max
        }

        this.$emit('input', value);
        this.$refs.input.value = value;
      }
    }
  };
</script>

<style scoped lang="scss">
  .num-input {
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    justify-content: space-between;
    min-height: 2.5em;
    width: 100%;

    span {
      padding: 10px 3px;
      margin-right: 10px;
    }

    .counter {
      padding-left: 10px;
      margin-left: 0px;
      padding-right: 20px;
      min-width: 50px;
      text-align: left;
      border-radius: 10px;
      outline: 1px solid #bfbfbf;
      flex-grow: 1;
      width: 100%;
    }

    .arrow-container {
      width: 10px;
      display: block;
      position: relative;
      flex-grow: 0;
    }

    .arrow-up, .arrow-down {
      flex-grow: 0;
      width: 0; 
      height: 0; 
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      position: absolute;
      display: block;
      right: 5px;
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

  .container-relative {
    position: relative;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
</style>