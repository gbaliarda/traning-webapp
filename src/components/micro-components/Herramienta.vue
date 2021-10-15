<template>
    <div class="herramienta">
      <v-icon class="icon" size="52">{{icon}}</v-icon>
      <p>{{ text }}</p>
    </div>
</template>

<script>
  export default {
    name: "Herramienta",
    props: {
      text: String,
      icon: String
    }
  };
</script>

<style scoped lang="scss">
  .herramienta {
    text-align: center;
    width: 280px;
    
    .icon {
      margin-bottom: .5em;
      color: #fff;
    }

    p {
      font-size: 1.5em;
      font-weight: 300;
    }
  }
</style>