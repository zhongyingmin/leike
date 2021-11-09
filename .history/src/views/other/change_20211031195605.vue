<template>
  <div class="change">
    <div class="change-content">
      <div class="close" @click="close">
        <i class="el-icon-close"></i>
      </div>
      <div class="title-wrapper">
        坐标转换
      </div>
      <div class="column-wrapper">
        <div class="top-wrapper">
          <div>
            <el-select v-model="params.stype" placeholder="请选择" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <el-select v-model="params.ttype" placeholder="请选择" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="bottom-wrapper">
          <div class="left">
            <div class="form-wrapper">
              <div class="form-item">
                <div class="label-title">输入源坐标</div>
                <div class="botton-wrapper"></div>
              </div>
              <div class="form-item">
                <div class="label">x:</div>
                <div class="input-wrapper">
                  <input
                    type="text"
                    v-model="params.x"
                    spellcheck="false"
                    placeholder=""
                  />
                </div>
              </div>
              <div class="form-item">
                <div class="label">y:</div>
                <div class="input-wrapper">
                  <input
                    type="text"
                    v-model="params.y"
                    spellcheck="false"
                    placeholder=""
                  />
                </div>
              </div>
              <div class="form-item">
                <div class="label">h:</div>
                <div class="input-wrapper">
                  <input
                    type="text"
                    v-model="params.h"
                    spellcheck="false"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="center">
            <div class="confirm" @click="confirm">转换坐标</div>
          </div>
          <div class="right">
            <div class="form-item">
              <div class="label-title">输出目标做坐标</div>
              <div class="botton-wrapper"></div>
            </div>
            <div class="form-item">
              <div class="label">x:</div>
              <div class="input-wrapper">
                <input
                  type="text"
                  v-model="newData.x"
                  spellcheck="false"
                  placeholder=""
                />
              </div>
            </div>
            <div class="form-item">
              <div class="label">y:</div>
              <div class="input-wrapper">
                <input
                  type="text"
                  v-model="newData.y"
                  spellcheck="false"
                  placeholder=""
                />
              </div>
            </div>
            <div class="form-item">
              <div class="label">h:</div>
              <div class="input-wrapper">
                <input
                  type="text"
                  v-model="newData.h"
                  spellcheck="false"
                  placeholder=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coordtrans } from "@/api/other/change";
export default {
  components: {},
  props: {},
  data() {
    return {
      params: {
        stype: 0,
        ttype: 1,
        y: "",
        x: "",
        h: "",
      },
      newData: {},
      options: [
        {
          label: "北京54坐标系",
          value: 0,
        },
        {
          label: "西安80坐标系",
          value: 1,
        },
        {
          label: "2000国家大地坐标系",
          value: 2,
        },
        {
          label: "84坐标系",
          value: 3,
        },
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    confirm() {
      const self = this;
      if (this.params.stype != this.params.ttype) {
        coordtrans(this.params).then((res) => {
          console.log(res);
          self.newData = res;
        });
      } else {
        this.$message({
          message: "请选择不同格式!",
          type: "info",
          showClose: true,
        });
      }
    },
    close() {
      this.$router.push("/");
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.change {
  position: relative;
  height: 100%;
  .change-content {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1000px;
    height: 500px;
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
    .title-wrapper {
      width: 100%;
      height: 40px;
      color: #fff;
      font-size: 30px;
    }
    .column-wrapper {
      width: 100%;
      height: calc(100% - 40px);
      .top-wrapper {
        display: flex;
        height: 100px;
        align-items: center;
        justify-content: space-between;
      }
      .bottom-wrapper {
        display: flex;
        height: calc(100% - 100px);
        > div:first-child,
        > div:last-of-type {
          width: 40%;
          border: 1px solid #32f1b4;
          padding: 30px;
        }
        .center {
          width: 20%;
          display: flex;
          align-items: center;
          justify-content: center;
          > div {
            padding: 4px 20px;
            cursor: pointer;
          }
          .confirm {
            background: #22e2cb;
            border-radius: 4px;
          }
        }
      }
      .form-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 20px;
        .label {
          margin-top: 4px;
          width: 50px;
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
          width: calc(100% - 50px);
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
    }
  }
}
</style>
