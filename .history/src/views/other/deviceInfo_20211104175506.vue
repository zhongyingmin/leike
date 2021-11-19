<template>
  <div class="device">
    <div class="device-content">
      <div class="close" @click="close">
        <i class="el-icon-close"></i>
      </div>
      <div class="form-wrapper">
        <div class="form-item">
          <div class="label-title">雷达介绍：</div>
          <div class="text-wrapper">
            {{ info }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      info: `雷达，是英文Radar的音译，源于radio detection and ranging的缩写，意思为"无线电探测和测距"，即用无线电的方法发现目标并测定它们的空间位置。因此，雷达也被称为“无线电定位”。雷达是利用电磁波探测目标的电子设备。雷达发射电磁波对目标进行照射并接收其回波，由此获得目标至电磁波发射点的距离、距离变化率（径向速度）、方位、高度等信息。`,
    };
  },
  watch: {},
  computed: {},
  methods: {
    close() {
      this.$router.push("/");
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.device {
  position: relative;
  height: 100%;
  .device-content {
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
      .text-wrapper {
        margin-top: 10px;
        text-indent: 30px;
        line-height: 40px;
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
