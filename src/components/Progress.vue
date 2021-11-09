<template>
  <div class="progress-wrapper">
    <div class="progress_bar" :style="{ width: `${modelValue}%` }"></div>
    <div class="progress_botton" :style="{ left: `${modelValue}%` }"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  watch: {
      modelValue(newVal, oldVal){
          this.$emit('input',newVal, oldVal)
      }
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.progress-wrapper {
  position: relative;
  min-width: 600px;
  height: 8px;
  background: #fff;
  border-radius: 20px;
  .progress_bar {
    position: absolute;
    max-width: 100%;
    top: 0;
    left: 0;
    height: 8px;
    background: #22e2cb;
    border-radius: 20px;
    transition: all 0.3s;
  }
  .progress_botton {
    position: absolute;
    top: 50%;
    left: 0%;
    width: 18px;
    height: 18px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: #22e2cb;
    transition: all 0.3s;
  }
}
</style>
