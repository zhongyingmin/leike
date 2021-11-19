<template>
  <div class="global">
    <div class="global-content">
      <div class="close" @click="close">
        <i class="el-icon-close"></i>
      </div>
      <div class="form-wrapper">
        <div class="form-item">
          <div class="label-title">{{$t('globalWarningSet')}}</div>
          <div class="botton-wrapper"></div>
        </div>
        <div class="form-item">
          <div class="label">{{$t('shapeWarningValue')}}:</div>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="form.alarmValue"
              spellcheck="false"
              placeholder=""
            />
          </div>
        </div>
        <div class="form-item">
          <div class="label">{{$t('warningCount')}}:</div>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="form.alarmDot"
              spellcheck="false"
              placeholder=""
            />
          </div>
        </div>
        <div class="form-item">
          <div class="label">{{$t('warningCount')}}:</div>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="form.alarmSpeed"
              spellcheck="false"
              placeholder=""
            />
          </div>
        </div>
        <div class="form-item">
          <div class="label">{{$t('warningCount')}}:</div>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="form.alarmAcceleratedSpeed"
              spellcheck="false"
              placeholder=""
            />
          </div>
        </div>
        <div class="form-item">
          <div class="label">预警联系人:</div>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="form.alarmContact"
              spellcheck="false"
              placeholder=""
            />
          </div>
        </div>
        <div class="form-item">
          <div class="label">联系电话:</div>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="form.telephone"
              spellcheck="false"
              placeholder=""
            />
          </div>
        </div>
        <div class="form-item">
          <div class="label">邮箱:</div>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="form.email"
              spellcheck="false"
              placeholder=""
            />
          </div>
        </div>
        <div class="form-item">
          <div class="label"></div>
          <div class="botton-wrapper">
            <div class="confirm" @click="confirm">完成</div>
            <!-- <div class="remove">删除</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getData, update } from "@/api/warning";
export default {
  components: {},
  props: {},
  data() {
    return {
      form: {},
      query: {
        platformAlarmType: 0,
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    close() {
      this.$router.push("/");
    },
    confirm() {
      if (this.form) {
        this.handleUpdate();
      } else {
        this.$message({
          showClose: true,
          message: "数据不能为空!",
          type: "info",
        });
      }
    },
    getGlobal() {
      let self = this;
      getData(this.query).then((res) => {
        // console.log(res);
        self.form = res.data[0] || {};
      });
    },
    handleUpdate() {
      let self = this;
      update(this.form).then(() => {
        self.$message({
          showClose: true,
          message: "修改成功!",
          type: "success",
        });
      });
    },
  },
  created() {},
  mounted() {
    this.getGlobal();
  },
};
</script>
<style lang="scss" scoped>
.global {
  position: relative;
  height: 100%;
  .global-content {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 600px;
    height: 550px;
    transform: translate(-50%, -50%);
    border: 1px solid #32f1b4;
    background: rgba(0, 0, 0, 0.9);
    padding: 40px 60px;
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
        width: 150px;
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
        width: calc(100% - 150px);
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
}
</style>
