<template>
  <div style="margin: 0px 10%">
    <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column prop="author" label="食客" min-width="90">
      </el-table-column>
      <el-table-column prop="content" label="菜系" min-width="180">
      </el-table-column>
      <el-table-column prop="submission_date" label="进食时间">
      </el-table-column>
    </el-table>
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
};
</script>

<style>
</style>