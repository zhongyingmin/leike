<template>
  <div class="report">
    <div class="report-content">
      <div class="close" @click="close">
        <i class="el-icon-close"></i>
      </div>
      <div class="form-wrapper">
        <div class="form-item">
          <div class="label-title">{{$t('report')}}</div>
          <div class="botton-wrapper"></div>
        </div>
        <!-- <div class="form-item">
          <div class="label">{{$t('reportTime')}}:</div>
          <div class="text-wrapper">
            <el-date-picker
              v-model="date"
              @change="handleChange"
              type="datetimerange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="YYYY-MM-DD HH:mm:ss"
            >
            </el-date-picker>
          </div>
        </div> -->
        <div class="form-item">
          <div class="label"></div>
          <div class="botton-wrapper">
            <div class="confirm" @click="confirm">{{$t('export')}}</div>
            <!-- <div class="remove">删除</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reportFile } from "@/api/other/report";
export default {
  components: {},
  props: {},
  data() {
    return {
      date: [],
      query: {},
    };
  },
  watch: {},
  computed: {},
  methods: {
    close() {
      this.$router.push("/");
    },
    // handleChange() {
    //   // console.log(this.date);
    //   if (this.date) {
    //     this.query.startDate = this.date[0];
    //     this.query.endDate = this.date[1];
    //   }
    // },
    confirm() {
      if (this.date.length) {
        this.handleExportFile()
      } else {
        this.$message({
          message: "请选择时间!",
          type: "info",
          showClose: true,
        });
      }
    },
    handleExportFile() {
      // let self = this;
      reportFile(this.query).then((res) => {
        window.open(
          window.customENV.baseURL +
            `common/download?fileName=${encodeURI(res.filePath)}&delete=true`
        );
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.report {
  position: relative;
  height: 100%;
  .report-content {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1000px;
    height: 70px;
    transform: translate(-50%, -50%);
    border: 1px solid #32f1b4;
    background: rgba(0, 0, 0, 0.9);
    padding: 40px 60px;
    ::v-deep(.el-range-editor) {
      background-color: rgba(0, 0, 0, 0);
      border: 1px solid #32f1b4;
      input {
        background-color: rgba(0, 0, 0, 0) !important;
        color: #fff;
      }
      span {
        color: #fff;
      }
    }
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
