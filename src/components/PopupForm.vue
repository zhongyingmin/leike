<template>
  <div class="popup-form" v-show="modelValue">
    <div class="form-wrapper">
      <div class="form-item">
        <div class="label-title">数据上传点位</div>
        <div class="botton-wrapper"></div>
      </div>
      <div class="form-item">
        <div class="label">点位类型:</div>
        <el-select v-model="form.point" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="form-item">
        <div class="label">坐标信息:</div>
        <div class="input-wrapper">
          <input
            type="text"
            v-model="form.info"
            spellcheck="false"
            placeholder=""
          />
        </div>
      </div>
      <div class="form-item">
        <div class="label"></div>
        <div class="botton-wrapper">
          <div class="confirm">完成</div>
          <div class="remove" @click="close">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      options: [
        {
          value: 0,
          label: "点",
        },
        {
          value: 1,
          label: "线",
        },
        {
          value: 3,
          label: "面",
        },
      ],
      form: {
        point: 0,
        info: "",
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    close() {
      this.$emit("update:modelValue", !this.modelValue);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.popup-form {
  position: fixed;
  width: 1920px;
  height: 1080px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  overflow: hidden;
  .form-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 600px;
    height: 300px;
    transform: translate(-50%, -50%);
    border: 1px solid #32f1b4;
    background: rgba(0, 0, 0, 0.4);
    padding: 40px 60px;
    .form-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 20px;
      .label {
        margin-top: 4px;
        width: 100px;
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
        width: calc(100% - 120px);
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
      ::v-deep(.el-select) {
        width: calc(100% - 120px);
        input {
          background-color: transparent;
          border: 1px solid #fff;
          color: #fff;
          height: 35px;
          line-height: 35px;
          &::-webkit-input-placeholder {
            color: #fff;
          }
        }
        i {
          color: #fff;
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
  }
}
</style>
