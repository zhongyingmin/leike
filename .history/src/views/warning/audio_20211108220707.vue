<template>
  <div class="audio">
    <div class="audio-content">
      <div class="close" @click="close">
        <i class="el-icon-close"></i>
      </div>
      <div class="form-wrapper">
        <div class="form-item">
          <div class="label-title">音频导入</div>
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
              :on-remove="handleRemove"
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
import { alarmsound } from "@/api/warning/audio";
export default {
  components: {},
  props: {},
  data() {
    return {
      file: "",
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
      if (this.file) {
        let formdata = new FormData();
        formdata.append("file", this.file);
        let self = this;
        alarmsound(formdata).then(() => {
          self.$message({
            showClose: true,
            message: "上传成功!",
            type: "success",
          });
          self.close();
        });
      } else {
        this.$message.error("请上传文件!");
      }
    },
    close() {
      this.$router.push("/");
    },
    handleRemove() {
      this.file = "";
    },
    fileChange(param) {
      // console.log(param);
      this.file = param.file;
    },
    beforeAvatarUpload(file) {
      const isMP3 = file.type.indexOf("mp3") != -1;
      if (!isMP3) {
        this.$message.error("上传只能是 MP3 格式!");
      }
      return isMP3;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.audio {
  position: relative;
  height: 100%;
  .audio-content {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    height: 350px;
    transform: translate(-50%, -50%);
    border: 1px solid #32f1b4;
    background: rgba(0, 0, 0, 0.9);
    padding: 40px 30px 40px 60px;
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
    input {
      // position: absolute;
      width: 100%;
      height: 28px;
      // top: 7px;
      // right: 39px;
      font-size: 16px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      -o-appearance: none;
      border: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      outline: none;
      padding: 2px 10px;
      background: rgba(0, 0, 0, 0);
      color: #fff;
    }
    textarea {
      width: 100%;
      font-size: 16px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      -o-appearance: none;
      border: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      outline: none;
      padding: 10px;
      background: rgba(0, 0, 0, 0);
      color: #fff;
    }
  }
}
</style>
