<template>
  <div class="clear">
    <div class="clear-content">
      <div class="head">
        <i class="el-icon-warning"></i>
        <span>{{$t('Warning.msg')}}</span>
      </div>
      <div class="button">
        <div class="confirm" @click="confirm">确定</div>
        <div class="cancel" @click="cancel">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import { update } from "@/api/warning/record";
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    confirm() {
      update().then(() => {
        this.$message({
          message: "操作成功!",
          type: "success",
          showClose: true,
        });
      });
      this.$router.push({ name: "Home" });
    },
    cancel() {
      this.$router.push({ name: "Home" });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.clear {
  position: relative;
  .clear-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    height: 180px;
    border: 1px solid #32f1b4;
    background: rgba(0, 0, 0, 0.9);
    padding: 20px;
    .head {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 25px;
      height: 100px;
      i {
        color: red;
        font-size: 50px;
        margin-right: 10px;
      }
    }
    .button {
      display: flex;
      justify-content: center;
      > div {
        padding: 4px 20px;
        cursor: pointer;
      }
      .confirm {
        background: #22e2cb;
        border-radius: 4px;
        margin-right: 20px;
      }
      .cancel {
        border: 1px solid #22e2cb;
        color: #fff;
        border-radius: 4px;
      }
    }
  }
}
</style>
