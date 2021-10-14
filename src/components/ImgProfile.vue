<template>
  <img :src="require(`../assets/avatars/${name}.svg`)" alt="Foto de perfil" class="avatarImg" @click="updateAvatar" />
</template>

<script>
import { Api } from '../../api/api';

export default {
  name: "ImgProfile",
  props: {
    name: String,
    handleFinish: Function,
  },
  methods: {
    async updateAvatar() {
      this.$emit("img-update");
      const url = `${Api.baseUrl}/users/current`;
      const payload = {
        avatarUrl: `${this.name}.svg`,
      }
      try {
        const result = await Api.put(url, true, payload);
        this.handleFinish(false);
      } catch(e) {
        console.log(e.description);
        this.handleFinish(true);
      }
    }
  },
};
</script>

<style scoped lang="scss">
.avatarImg {
  width: 100px;
  height: 100px;
  margin-right: 15px;
  transition: all .1s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
}
</style>
