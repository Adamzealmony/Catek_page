<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <div id="footer">
      <Aplayer
      v-if="musicList.length > 0"
      :music="musicList[0]"
      :list="musicList"
      repeat="list"
      shuffle
      listFolded
    />
    </div>
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
#footer {
  margin: 0 auto;
  width: 100%;
  bottom: 0;
  position: fixed;
}

.aplayer {
  margin: 20px;
  user-select: none;
}

.aplayer >>> .aplayer-body .aplayer-info .aplayer-music{
  user-select: none;
}

</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
