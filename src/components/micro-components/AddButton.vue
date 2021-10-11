<template>
  <div @click="$emit('click')" class="add-btn">
    <span class="vertical"></span>
    <span class="horizontal"></span>
  </div>
</template>

<script>
  export default {
    name: "AddButton",
  };
</script>

<style scoped lang="scss">
  .add-btn {
    width: 250px;
    height: 250px;
    border: 2px solid#DA611B;
    border-radius: 10px;
    margin: 0;
    position: relative;
    display: grid;
    place-items: center;
    cursor: pointer;
    flex-shrink: 0;

    .vertical {
      height: 123px;
      width: 2px;
      background: #DA611B;
      position: absolute;
    }

    .horizontal {
      height: 2px;
      width: 123px;
      background: #DA611B;
    }
  }
</style>