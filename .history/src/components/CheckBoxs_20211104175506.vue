<template>
  <div class="CheckBoxs">
    <div v-for="(data, index) in checkbox" :key="index">
      <div class="box_checkbox">
        <input
          type="checkbox"
          :id="'point' + index"
          v-model="data.input"
          @change="handleChange(data)"
        />
        <label :for="'point' + index"></label>
      </div>
      <div class="text">{{ data.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: [
    'checkbox',
  ],
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleChange(row) {
      this.$emit("boxs-change", row);
      this.$emit("update:checkbox", [...this.checkbox]);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.box_checkbox {
  position: relative;
}
.box_checkbox label {
  cursor: pointer;
  position: absolute;
  width: 26px;
  height: 26px;
  top: 0;
  left: 0;
  background: transparent;
  border: 1px solid #1eeed1;
}
.box_checkbox label:after {
  opacity: 1;
  content: "";
  position: absolute;
  width: 12px;
  height: 5px;
  background: transparent;
  top: 5px;
  left: 4px;
  border: 2px solid #1eeed1;
  border-top: none;
  border-right: none;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.box_checkbox input[type="checkbox"]:checked + label:after {
  opacity: 0;
}
input[type="checkbox"] {
  visibility: hidden;
}
.CheckBoxs {
  display: flex;
  align-items: center;
  margin-left: 20px;
  i {
    font-size: 24px;
    cursor: pointer;
  }
  // .stateIcon{
  //   transform: rotate(180deg);
  // }
  > div {
    display: flex;
    margin-left: 30px;
  }
  .text {
    padding-top: 2px;
    margin-left: 30px;
  }
}
</style>
