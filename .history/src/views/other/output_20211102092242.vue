<template>
  <div class="output">
    <div class="output-content">
      <div class="close" @click="close">
        <i class="el-icon-close"></i>
      </div>
      <div class="form-wrapper">
        <div class="form-item">
          <div class="label-title">编码输出</div>
          <div class="botton-wrapper"></div>
        </div>
        <!-- <div class="form-item">
          <div class="label">数据类型:</div>
          <div class="text-wrapper">
            <el-select v-model="form.datatype" placeholder="请选择" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div> -->
        <div class="form-item">
          <div class="label">导出类型:</div>
          <div class="text-wrapper">
            <el-select v-model="form.exporttype" placeholder="请选择" clearable>
              <el-option
                v-for="item in options_type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="form-item">
          <div class="label"></div>
          <div class="botton-wrapper">
            <div class="confirm" @click="confirm">输出</div>
            <!-- <div class="remove">删除</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { exportFile } from "@/api/other/output";
export default {
  components: {},
  props: {},
  data() {
    return {
      form: {},
      fileList: [],
      options: [
        {
          label: "点",
          value: 0,
        },
        {
          label: "线",
          value: 1,
        },
        {
          label: "面",
          value: 2,
        },
      ],
      options_type: [
        {
          label: "DXF",
          value: 1,
        },
        {
          label: "SHP",
          value: 2,
        },
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleExportFile() {
      // let self = this;
      exportFile(this.form).then((res) => {
        console.log(res);
      });
    },
    confirm() {
      this.handleExportFile();
    },
    close() {
      this.$router.push("/");
    },
    fileChange(param, type) {
      console.log(param, type);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.output {
  position: relative;
  height: 100%;
  .output-content {
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
        width: 80px;
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
        width: calc(100% - 80px);
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
      .text-wrapper {
        display: flex;
        width: calc(100% - 80px);
      }
      .botton-wrapper {
        display: flex;
        width: calc(100% - 80px);
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
