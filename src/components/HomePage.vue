<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div
      class="bg"
      style="
        width: 100%;
        height: 500px;
        position: relative;
        background-image: url(/images/catbed.png);
        background-repeat: no-repeat;
        background-position: center;
      "
    >
      <h1 @click="ChangeFace()" style="font-size: 200px">
        {{ face }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      cats: ["😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"],
      face: "",
    };
  },
  created() {},
  mounted() {
    this.face = this.cats[this.randomNum(0, 8)];
    setInterval(() => {
      this.ChangeFace();
    }, 1000);
  },
  methods: {
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
          return 0;
      }
    },
    ChangeFace() {
      this.face = this.cats[this.randomNum(0, 8)];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
h1 {
  margin: 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  user-select: none;
  width: 100%;
}
</style>