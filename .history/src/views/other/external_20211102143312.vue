<template>
  <div class="external">
    <div class="external-content">
      <div class="close" @click="close">
        <i class="el-icon-close"></i>
      </div>
      <div class="form-wrapper">
        <div class="form-item">
          <div class="label-title">外部数据导入</div>
          <div class="botton-wrapper"></div>
        </div>
        <div class="form-item">
          <div class="label">文件:</div>
          <div class="text-wrapper">
            <el-upload
              class="upload-demo"
              action="#"
              :limit="1"
              :auto-upload="true"
              :file-list="fileList"
              :http-request="fileChange"
              :before-upload="beforeAvatarUpload"
            >
              <el-button size="small">点击上传</el-button>
              <template #tip>
                <div class="el-upload__tip"></div>
              </template>
            </el-upload>
          </div>
        </div>
        <div class="form-item">
          <div class="label"></div>
          <div class="botton-wrapper">
            <div class="confirm" @click="confirm">导入</div>
            <!-- <div class="remove">删除</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { exportFile } from "@/api/other/external";
export default {
  components: {},
  props: {},
  data() {
    return {
      form: {},
      fileList: [],
      options: [
        {
          label: "KML",
          value: 0,
        },
        {
          label: "SHP",
          value: 1,
        },
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    confirm() {
      console.log(this.fileList)
      let formdata=new FormData()
      formdata.append('file',this.fileList)
      // exportFile().then(res=>{
      //   console.log(res)
      // })
    },
    close() {
      this.$router.push("/");
    },
    fileChange(param, type) {
      console.log(param, type);
    },
    beforeAvatarUpload(file) {
      const isJZIP = file.type === "application/zip";
      if (!isJZIP) {
        this.$message.error("上传只能是 ZIP 格式!");
      }
      return isJZIP;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.external {
  position: relative;
  height: 100%;
  .external-content {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    height: 350px;
    transform: translate(-50%, -50%);
    border: 1px solid #32f1b4;
    background: rgba(0, 0, 0, 0.9);
    padding: 40px 60px;
    ::v-deep(.el-select) {
      input {
        background-color: transparent;
        border: 1px solid #32f1b4;
        color: #fff;
        &::-webkit-input-placeholder {
          color: #fff;
        }
      }
      i {
        color: #fff;
      }
    }
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      width: 30px;
      height: 30px;
      background-color: red;
      border-radius: 50%;
      overflow: hidden;
      padding: 5px;
      i {
        font-size: 20px;
        color: #fff;
      }
    }
    .form-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 20px;
      .label {
        margin-top: 4px;
        width: 60px;
        color: #22e2cb;
      }
      .label-title {
        color: #fff;
        font-size: 18px;
      }
      .input-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: calc(100% - 60px);
        border: 1px solid #fff;
        border-radius: 2px;
        .tagColor-wrapper {
          display: flex;
          align-items: center;
          margin-left: 10px;
        }
        ::v-deep(.el-color-picker) {
          .el-color-picker__trigger {
            border: none;
          }
        }
      }
      .botton-wrapper {
        display: flex;
        > div {
          padding: 4px 20px;
          cursor: pointer;
        }
        .confirm {
          background: #22e2cb;
          border-radius: 4px;
          margin-right: 20px;
        }
        .remove {
          border: 1px solid #22e2cb;
          color: #fff;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
