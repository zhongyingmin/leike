<template>
  <div class="ColorPickerGather">
    <el-popover placement="top" width="auto" v-model:visible="visible">
       <chrome-color-picker v-model:color="color" :history-round="true" />
      <!-- <Sketch v-model="color"></Sketch> -->
      <div
        class="gradient-wrapper"
        :style="{
          background: `linear-gradient(90deg, ${colors.join()})`,
          width: '100%',
          height: '25px',
          display: 'flex',
        }"
      >
        <template v-for="(data, index) in colors" :key="index">
          <div class="gradient-item" @click="handleClick(index)">
            <div
              class="color-radius"
              :class="{ sizeItem: index == colorIndex }"
              :style="{ background: data }"
            ></div>
          </div>
        </template>
      </div>
      <div style="text-align: right; margin-top: 10px">
        <el-button size="mini" type="text" @click.stop="cancel">取消</el-button>
        <el-button type="primary" size="mini" @click.stop="confirm"
          >确定</el-button
        >
      </div>
      <template #reference>
        <div
          class="color-linear-button"
          @click.stop="visible = true"
          :style="{
            background: `linear-gradient(${gradient.join()})`,
            width: '50px',
            height: '150px',
          }"
        ></div>
      </template>
    </el-popover>
  </div>
</template>

<script>
// import { Sketch } from "@ckpack/vue-color";
export default {
  components: {
    // Sketch,
  },
  props: ["gradient"],
  data() {
    return {
      colorIndex: 0,
      color: "",
      visible: false,
      colors: ["#FFFA15", "#00ff00", "#0000ff"],
    };
  },
  watch: {
    color(newVal) {
      this.handleChange(newVal.hex);
    },
  },
  computed: {},
  methods: {
    cancel() {
      this.colors = ["#FFFA15", "#00ff00", "#0000ff"];
      this.visible = false;
    },
    confirm() {
      this.visible = false;
      // console.log(this.colors)
      this.$emit("update:gradient", [...this.colors]);
      this.$emit("change",true);
      this.colors = ["#FFFA15", "#00ff00", "#0000ff"];
    },
    handleClick(index) {
      this.colorIndex = index;
    },
    handleChange(value) {
      // console.log(value);
      this.colors[this.colorIndex] = value;
      // this.colors=[this.gradient[this.colorIndex]]
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.gradient-wrapper {
  margin-top: 10px;
}
.gradient-item {
  position: relative;
  flex: 1;
}
.gradient-item {
  position: relative;
  flex: 1;
}
.color-radius {
  width: 13px;
  height: 13px;
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  border: #fff solid 3px;
  border-radius: 50%;
  cursor: pointer;
}
.sizeItem {
  width: 16px;
  height: 16px;
  bottom: -8px;
  border: #fff solid 3px;
}
</style>
//
<style lang="scss" scoped>
// .ColorPickerGather {
// }
//
</style>
