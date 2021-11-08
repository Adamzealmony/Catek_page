<template>
  <div style="margin: 0px 10%; height: calc(100% - 220px);">
    <el-button type="success" @click="addFood">我要报菜名!</el-button>
    <div style="height: 100%;">
    <el-table :data="tableData" style="width: 100%;" height="100%" stripe>
      <el-table-column prop="author" label="食客" width="90">
      </el-table-column>
      <el-table-column prop="content" label="菜系" width="150">
      </el-table-column>
      <el-table-column prop="submission_date" label="进食时间">
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Musics",
  mounted() {
    this.$http.get("http://catek.cn/api/foods").then((response) => {
      this.tableData = response.data;
      console.log(this.tableData);
    });
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    addFood() {
      this.$http
        .post("http://catek.cn/api/addFood", {
          author: "zjq",
          content: "优质脂肪",
          submission_date: new Date().toISOString().slice(0,10).replace(/-/g,""),
          url: ""
        })
        .then(() => {
          this.$http.get("http://catek.cn/api/foods").then((response) => {
            this.tableData = response.data;
            console.log(this.tableData);
          });
        });
    },
  },
};
</script>

<style>
</style>