<template>
  <div class="about">
    <el-select v-model="lateType" placeholder="选择迟到类别">
      <el-option label="20分钟内" :value="0"></el-option>
      <el-option label="20分钟外" :value="1"></el-option>
    </el-select>
    <el-input-number placeholder="迟到次数" v-model="count" style="width: 200px; margin-left: 10px"></el-input-number>
    <el-button type="primary" @click="handleAdd" style="margin-left: 10px">记录</el-button>
    <el-button type="primary" @click="showRes">计算结果</el-button>
    <el-button type="primary" @click="clear">重新计算</el-button>
    <div style="margin-top: 20px">
      <div>20分钟内次数：{{ type1Count }}</div>
      <div>20分钟外次数：{{ type2Count }}</div>
      <div>最大罚款金额：{{ res[0] }}</div>
      <div>最小罚款金额：{{ res[1] }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Musics",
  mounted() {
    this.$http.get("http://catek.cn/api/foods").then((response) => {
      this.tableData = response.data;
      this.loading = false;
      console.log(this.tableData);
    });
  },
  data() {
    return {
      lateType: 0,
      type1Count: 0,
      type2Count: 0,
      count: 0,
      floor: 0,
      ceil: 0,
      res: [0, 0]
    };
  },
  methods: {
    clear() {
      this.lateType = this.type1Count = this.type2Count = this.count = this.floor = this.ceil = 0
      this.res = [0, 0]
    },
    handleAdd() {
      switch (this.lateType) {
        case 0:
          this.type1Count += +this.count;
          break;
        case 1:
          this.type2Count += +this.count;
          break;
      }
    },
    showRes() {
      let res = []
      this.ceil = this.floor = 0
      for (let i = 0; i < this.type1Count; i++) {
        this.ceil += 30 * Math.pow(2, i)
      }
      for (let j = this.type1Count; j < this.type2Count; j++) {
        this.ceil += 50 * Math.pow(2, j)
      }
      for (let i = 0; i < this.type2Count; i++) {
        this.floor += 50 * Math.pow(2, i)
      }
      for (let j = this.type2Count; j < this.type1Count; j++) {
        this.floor += 30 * Math.pow(2, j)
      }
      res.push(Math.max(this.ceil, this.floor))
      res.push(Math.min(this.ceil, this.floor))
      this.res = res
    }
  },
};
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
.el-table .highlight-row {
  background: #f0f9eb;
}
</style>
