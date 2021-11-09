<template>
  <div style="margin: 0px 10%; height: calc(100% - 220px)">
    <el-button type="success" @click="showModal = true">我要报菜名!</el-button>
    <div style="height: 100%">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="100%"
        stripe
        v-loading="loading"
      >
        <el-table-column prop="author" label="食客" width="90">
        </el-table-column>
        <el-table-column prop="content" label="菜系" width="140">
        </el-table-column>
        <el-table-column prop="submission_date" label="进食时间">
          <template slot-scope="scope">
            <span>{{ timeFormatter(scope.row.submission_date) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="我要报菜名!"
        :width="'60%'"
        :visible.sync="showModal"
        style="text-align: left"
      >
        <el-form
          :model="form"
          label-width="80px"
          :label-position="'top'"
          :rules="rules"
          ref="form"
        >
          <el-form-item
            label="食客"
            :label-width="formLabelWidth"
            prop="author"
          >
            <el-select
              v-model="form.author"
              style="width: 100%"
              placeholder="你是谁?"
            >
              <el-option label="抓7" value="抓7"></el-option>
              <el-option label="连轩" value="连轩"></el-option>
              <el-option label="WinJ" value="WinJ"></el-option>
              <el-option label="王云" value="王云"></el-option>
              <el-option label="霖霖" value="霖霖"></el-option>
              <el-option label="追羊" value="追羊"></el-option>
              <el-option label="马凯" value="马凯"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="菜系"
            :label-width="formLabelWidth"
            prop="content"
          >
            <el-input
              v-model="form.content"
              autocomplete="off"
              placeholder="这顿是什么菜系?"
              maxlength="200"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item
            label="视觉冲击"
            :label-width="formLabelWidth"
            prop="url"
          >
            <el-upload
              ref="upload"
              action="http://catek.cn/api/upload"
              :class="{ disabled: isMax }"
              list-type="picture-card"
              accept=".png,.jpg,.jpeg"
              :auto-upload="false"
              :limit="1"
              :file-list="fileList"
              :on-remove="handleRemove"
              :on-success="success"
              :on-error="error"
              :on-change="change"
            >
              <i slot="default" class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="info" plain @click="showModal = false"
            >取 消</el-button
          >
          <el-button type="success" @click="addFood()" :disabled="uploading"
            >确 定</el-button
          >
        </div>
      </el-dialog>
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
      tableData: [],
      showModal: false,
      dialogVisible: false,
      uploading: false,
      isMax: false,
      disabled: false,
      fileList: [],
      formLabelWidth: "30",
      loading: true,
      form: {
        author: "",
        content: "",
        url: "",
      },
      rules: {
        author: [{ required: true, message: "你到底是谁?", trigger: "change" }],
        content: [
          { required: true, message: "你到底吃了什么?", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleRemove(file, fileList) {
      if (fileList.length !== 1) {
        this.isMax = false;
      }
      console.log(file, fileList);
    },
    change(file, fileList) {
      if (fileList.length === 1) {
        this.isMax = true;
      }
      console.log(file, fileList);
    },
    error(file, fileList) {
      if (fileList.length === 1) {
        this.isMax = true;
      } else {
        this.isMax = false;
      }
      console.log(file, fileList);
    },
    success(response, file, fileList) {
      this.form.url = response.url;
      this.isMax = false;
      this.$refs["upload"].clearFiles();
      this.addFood();
      console.log(response, file, fileList);
      console.log("success");
    },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
    // handleDownload(file) {
    //   console.log(file);
    // },
    timeFormatter(time) {
      let date = time.substr(0, 10); //年月日
      let hours = time.substring(11, 13);
      let minutes = time.substring(14, 16);
      let seconds = time.substring(17, 19);
      let timeFlag_prev = date + " " + hours + ":" + minutes + ":" + seconds;
      timeFlag_prev = timeFlag_prev.replace(/-/g, "/");
      let timeFlag = new Date(timeFlag_prev);
      timeFlag = new Date(timeFlag.getTime() + 8 * 3600 * 1000);
      timeFlag =
        timeFlag.getFullYear() +
        "-" +
        (timeFlag.getMonth() + 1 < 10
          ? "0" + (timeFlag.getMonth() + 1)
          : timeFlag.getMonth() + 1) +
        "-" +
        (timeFlag.getDate() < 10
          ? "0" + timeFlag.getDate()
          : timeFlag.getDate()) +
        " " +
        (timeFlag.getHours() < 10
          ? "0" + timeFlag.getHours()
          : timeFlag.getHours()) +
        ":" +
        (timeFlag.getMinutes() < 10
          ? "0" + timeFlag.getMinutes()
          : timeFlag.getMinutes()) +
        ":" +
        (timeFlag.getSeconds() < 10
          ? "0" + timeFlag.getSeconds()
          : timeFlag.getSeconds());
      return timeFlag;
    },
    addFood() {
      if (this.isMax) {
        this.$refs["upload"].submit();
        return;
      }
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.showModal = false;
          this.$http
            .post("http://catek.cn/api/addFood", {
              author: this.form.author,
              content: this.form.content,
              submission_date: +new Date(),
              url: this.form.url,
            })
            .then(() => {
              this.$message({
                type: "success",
                message: `进食成功! ${
                  this.form.content.length > 15
                    ? "纯纯胖子套餐!😅"
                    : "纯纯瘦子套餐!🤭"
                }`,
              });
              this.loading = true;
              this.$http.get("http://catek.cn/api/foods").then((response) => {
                this.tableData = response.data;
                this.loading = false;
                console.log(this.tableData);
                this.$refs["form"].resetFields();
                this.form = {
                  author: "",
                  content: "",
                  url: "",
                };
              });
            });
        }
      });
    },
  },
};
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>