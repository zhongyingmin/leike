<template>
  <div class="my-search">
    <i class="el-icon-search el-icon"></i>
    <input
      type="text"
      v-model="text"
      @input="handleInput"
      @change="handleInput"
      spellcheck="false"
      placeholder=""
    />
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      text: this.modelValue,
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleInput() {
      this.$emit("update:modelValue", this.text);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.my-search {
  position: relative;
  height: 40px;
  line-height: 40px;
  padding: 0 10px 0 35px;
  border: solid 1px #32f1b4;
  .el-icon {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 20px;
    color: #fff;
  }
  input {
    // position: absolute;
    width: 100%;
    height: 40px;
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
    padding: 0 10px;
    background: rgba(0, 0, 0, 0);
    color: #fff;
  }
}
</style>
