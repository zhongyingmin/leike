<template>
  <div class="popup" v-show="modelValue">
    <div class="popup-content">
      <div class="close" @click="close">
        <i class="el-icon-close"></i>
      </div>
      <div class="header-wrapper">
        <div class="title">{{ title }}</div>
        <!-- <div class="botton-export">数据导出</div> -->
      </div>
      <div class="chart-wrapper" ref="chart"></div>
    </div>
  </div>
</template>

<script>
import { feature } from "@/api/home";
import * as echarts from "echarts";
export default {
  components: {},
  props: {
    modelValue: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    pid: {
      type: Number,
    },
    type: {
      type: Number,
    },
    date: {
      type: Array,
    },
  },
  data() {
    return {
      chartData1: { date: [], data: [] },
      chartData2: { date: [], data: [] },
      chartData3: { date: [], data: [] },
    };
  },
  watch: {},
  computed: {},
  methods: {
    initChartChecked() {
      // console.log(data);
      let data = [];
      let chart = "";
      if (this.type == 1) {
        data = this.chartData1;
      }
      if (this.type == 2) {
        data = this.chartData2;
      }
      if (this.type == 3) {
        data = this.chartData3;
      }
      chart = echarts.init(this.$refs["chart"]);
      // console.log(chart);
      // console.log(data);
      const date = data.date;
      const chartData = data.data;
      let seriesList = [];
      for (let i = 0; i < chartData.length; i++) {
        seriesList.push({
          name: chartData[i].name,
          type: "line",
          // symbol: "none",
          smooth: true,
          // itemStyle: {
          //   color: "#00ECEE",
          // },
          areaStyle: {
            opacity: 0.2,
          },
          data: chartData[i].value,
        });
      }
      chart.setOption({
        legend: {
          show: true,
          top: 20,
          right: 25,
          textStyle: {
            fontSize: 14,
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: 60,
          bottom: 60,
          right: 30,
          left: 60,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            color: "#fff",
            fontSize: 16,
            // showMaxLabel: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          data: date.map(function(str) {
            return str.replace(" ", "\n");
          }),
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#666666",
            },
          },
          nameTextStyle: {
            fontSize: 16,
            color: "#fff",
          },
          axisLabel: {
            color: "#fff",
            fontSize: 16,
          },
        },
        series: seriesList,
      });
    },
    initCheckedData() {
      let self = this;
      // console.log(this.checkedArr)
      feature({
        fids: this.pid,
        startTime: this.date[0],
        endTime: this.date[1],
      }).then((res) => {
        // console.log(res);
        const data = res.data;
        const date = data.date;
        self.chartData1.date = date;
        self.chartData2.date = date;
        self.chartData3.date = date;
        for (let i = 0; i < data.xbData.length; i++) {
          let obj = data.xbData[i];
          if (obj.type == "point") {
            self.chartData1.data.push({
              name: obj.name + "(形变值)",
              value: obj.xbvlaue,
            });
            self.chartData2.data.push({
              name: obj.name + "(形变速度值)",
              value: obj.xbspeed,
            });
            self.chartData3.data.push({
              name: obj.name + "(形变加速值)",
              value: obj.xbxbaccelerated,
            });
          } else {
            self.chartData1.data.push({
              name: obj.name + "(最小形变值)",
              value: obj.xbvaluemin,
            });
            self.chartData1.data.push({
              name: obj.name + "(最大形变值)",
              value: obj.xbvaluemax,
            });
            self.chartData1.data.push({
              name: obj.name + "(平均形变值)",
              value: obj.xbvalueavg,
            });
            self.chartData2.data.push({
              name: obj.name + "(最小形变速度值)",
              value: obj.xbspeedmin,
            });
            self.chartData2.data.push({
              name: obj.name + "(最大形变速度值)",
              value: obj.xbspeedmax,
            });
            self.chartData2.data.push({
              name: obj.name + "(平均形变速度值)",
              value: obj.xbspeedavg,
            });
            self.chartData3.data.push({
              name: obj.name + "(最小形变加速值)",
              value: obj.xbacceleratedmin,
            });
            self.chartData3.data.push({
              name: obj.name + "(最大形变加速值)",
              value: obj.xbacceleratedmax,
            });
            self.chartData3.data.push({
              name: obj.name + "(平均形变加速值)",
              value: obj.xbacceleratedavg,
            });
          }
        }
        self.initChartChecked();
      });
    },
    close() {
      this.$emit("update:modelValue", !this.modelValue);
    },
  },
  created() {},
  mounted() {
    if (this.pid) {
      this.initCheckedData();
    }
  },
};
</script>
<style lang="scss" scoped>
.popup {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  height: 100%;
  overflow: auto;
  .popup-content {
    position: relative;
    left: 50%;
    top: 50%;
    width: 1500px;
    height: 840px;
    transform: translate(-50%, -50%);
    border: 1px solid #00fee4;
    background-color: rgba(0, 0, 0, 0.9);
    padding: 20px 60px 40px;
    .el-slider {
      width: 600px;
    }
    .close {
      position: absolute;
      top: 15px;
      right: 15px;
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
    .header-wrapper {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 30px;
      }
      .botton-export {
        padding: 8px 20px;
        cursor: pointer;
        background: #22e2cb;
        border-radius: 4px;
      }
    }
    .tool-wrapper {
      display: flex;
      align-items: center;
      .play {
        font-size: 40px;
        color: #32f1b4;
        cursor: pointer;
        margin: 0 10px;
      }
      ::v-deep(.el-range-editor) {
        background-color: rgba(0, 0, 0, 0.4);
        border: 1px solid #32f1b4;
        input {
          background-color: rgba(0, 0, 0, 0) !important;
          color: #fff;
        }
        span {
          color: #fff;
        }
      }
      .progress-wrapper {
        position: relative;
        width: 600px;
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
          transition: all 0.3;
        }
      }
    }
    .chart-wrapper {
      width: 100%;
      height: calc(100% - 80px);
    }
  }
}
</style>
