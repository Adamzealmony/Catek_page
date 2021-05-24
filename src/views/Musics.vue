<template>
  <div class="container">
    <Aplayer
      autoplay
      :music="{
        title: 'Summer Time',
        artist: 'Manche',
        src: 'http://catek.cn/musics/SUMMER_TIME.mp3',
        pic: '',
      }"
      :list="musicList"
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
      console.log(this.musicList);
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