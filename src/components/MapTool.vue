<template>
  <div class="MapTool">
    <div class="left-wrapper">
      <div
        v-for="(data, index) in lItem"
        :key="index"
        v-bind:title="data.desc"
        @click="handelClick(data.type)"
      >
        <img :src="data.icon" alt="" v-show="route != data.type" />
        <img :src="data.selectIcon" alt="" v-show="route == data.type" />
      </div>
    </div>
    <div class="right-wrapper">
      <div
        v-for="(data, index) in rItem"
        :key="index"
        v-bind:title="data.desc"
        @click="analyseClick(data.type)"
      >
        <img :src="data.icon" alt="" />
      </div>
    </div>
    <popup-form v-model="show"></popup-form>
  </div>
</template>

<script>
import PopupForm from "@/components/PopupForm";
export default {
  components: {
    PopupForm,
  },
  props: {},
  data() {
    return {
      show: false,
      lItem: [
        {
          icon: require("@/assets/images/point.png"),
          selectIcon: require("@/assets/images/point_x.png"),
          desc: "画点",
          type: "Point",
        },
        {
          icon: require("@/assets/images/line.png"),
          selectIcon: require("@/assets/images/line_x.png"),
          desc: "画线",
          type: "Line",
        },
        {
          icon: require("@/assets/images/area.png"),
          selectIcon: require("@/assets/images/area_x.png"),
          desc: "画面",
          type: "Area",
        },
        // {
        //   icon: require("@/assets/images/upload.png"),
        //   selectIcon: require("@/assets/images/upload_x.png"),
        //   desc: "数据上传",
        //   type: "upload",
        // },
      ],
      rItem: [
        {
          icon: require("@/assets/images/tool1.png"),
          selectIcon: require("@/assets/images/tool_1.png"),
          desc: "距离测量",
          type: "distance",
        },
        {
          icon: require("@/assets/images/tool2.png"),
          selectIcon: require("@/assets/images/tool_2.png"),
          desc: "面积测量",
          type: "faceearea",
        },
        {
          icon: require("@/assets/images/tool3.png"),
          selectIcon: require("@/assets/images/tool_3.png"),
          desc: "三角测量",
          type: "triangleHeight",
        },
        {
          icon: require("@/assets/images/tool4.png"),
          selectIcon: require("@/assets/images/tool_4.png"),
          desc: "高程",
          type: "height",
        },
        // {
        //   icon: require("@/assets/images/tool5.png"),
        //   selectIcon: require("@/assets/images/tool_5.png"),
        //   desc: "剖面分析",
        //   type: "pm",
        // },
        {
          icon: require("@/assets/images/tool6.png"),
          selectIcon: require("@/assets/images/tool_6.png"),
          desc: "可视化域分析",
          type: "ks",
        },
        {
          icon: require("@/assets/images/tool7.png"),
          selectIcon: require("@/assets/images/tool_7.png"),
          desc: "等高线",
          type: "dgx",
        },
        {
          icon: require("@/assets/images/tool8.png"),
          selectIcon: require("@/assets/images/tool8.png"),
          desc: "坡度坡向",
          type: "drawPolygonSlope",
        },
        {
          icon: require("@/assets/images/clear.png"),
          selectIcon: require("@/assets/images/clear.png"),
          desc: "清空",
          type: "clear",
        },
        {
          icon: require("@/assets/images/reset.png"),
          selectIcon: require("@/assets/images/reset.png"),
          desc: "一键复位",
          type: "reset",
        },
      ],
    };
  },
  watch: {},
  computed: {
    route() {
      return this.$route.name;
    },
  },
  methods: {
    handelClick(name) {
      if (name != "upload") {
        this.$router.push({ name });
      } else {
        this.show = true;
      }
    },
    analyseClick(name) {
      if(name == "reset"){
        this.$sendIframe("goHome");
        return
      }
      if (name != "clear") {
        this.$sendIframe("measureTool", name);
        this.$router.push({ name: "Analytical" });
      }else{
        this.$sendIframe("removeMeasure", "");
      }
    },
  },
  created() {},
  mounted() {
    // console.log(this.route);
  },
};
</script>
<style lang="scss" scoped>
.MapTool {
  display: flex;
  align-items: center;
  height: 80px;
  .left-wrapper {
    display: flex;
    padding: 0 20px 0 10px;
    > div {
      margin-right: 20px;
      cursor: pointer;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
  .right-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 52px;
    border-radius: 26px;
    border: solid 1px #20bab0;
    padding: 0 20px;
    > div {
      width: 32px;
      height: 32px;
      margin-right: 20px;
      cursor: pointer;
      >img{
        width: 100%;
        height: 100%;
      }
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
}
</style>
