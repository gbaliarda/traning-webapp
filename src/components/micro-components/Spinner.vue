<template>
  <div class="spin-wrapper">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: "Spinner"
};
</script>

<style scoped lang="scss">
.spin-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 36px;
  height: 36px;
  max-width: 15%;
  max-height: 60%;
  transform: translate(-50%, -50%);
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0);
  // width: 36px;
  // height: 36px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border-left-color: #EA8D59;
  border-right-color: #EA8D59;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
}
</style>
