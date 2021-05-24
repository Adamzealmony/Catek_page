<template>
  <div class="container">
    <Aplayer
      v-if="musicList.length > 0"
      :music="musicList[0]"
      :list="musicList"
      repeat="list"
    />
  </div>
</template>

<script>
import Aplayer from "vue-aplayer";

export default {
  name: "Musics",
  components: {
    Aplayer,
  },
  data() {
    return {
      musicList: [],
    };
  },
  created() {},
  mounted() {
    this.$http.get("http://catek.cn/api/musics").then((response) => {
      this.musicList = response.data;
    });
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 80%;
}
</style>