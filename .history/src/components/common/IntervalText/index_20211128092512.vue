<template>
  <div class="interval-text">
    <div class="input-wrapper">
      <input
        type="text"
        v-model="rangeInputs[0]"
        oninput="this.value=this.value.replace(/[^\-?\d.]/g,'');this.dispatchEvent(new Event('input'))"
        @input="handleInput"
        @change="handleChange"
        spellcheck="false"
        placeholder=""
      />
    </div>
    <div class="line"></div>
    <div class="input-wrapper">
      <input
        type="text"
        v-model="rangeInputs[1]"
        oninput="this.value=this.value.replace(/[^\-?\d.]/g,'');this.dispatchEvent(new Event('input'))"
        @input="handleInput"
        @change="handleChange"
        spellcheck="false"
        placeholder=""
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    modelValue: {
      // 绑定值
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      rangeInputs: [...this.modelValue],
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleInput() {
      this.$emit("update:modelValue", [...this.rangeInputs]);
    },
    handleChange() {
      this.$emit("update:modelValue", [...this.rangeInputs]);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.interval-text {
  display: flex;
  align-items: center;
  .input-wrapper {
    border: 1px solid #fff;
    border-radius: 4px;
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
  .line {
    width: 80px;
    height: 1px;
    background-color: #fff;
    margin: 0 10px;
  }
}
</style>
