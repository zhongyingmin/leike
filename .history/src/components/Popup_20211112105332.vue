<template>
  <div class="popup" v-show="modelValue">
    <div class="popup-content">
      <div class="close" @click="close">
        <i class="el-icon-close"></i>
      </div>
      <div class="header-wrapper">
        <div class="title">{{ title }}</div>
        <div class="botton-export" @click="handleExport">数据导出{{allNum}}</div>
      </div>
      <div class="tool-wrapper" v-show="title != '预警类型'">
        <el-date-picker
          v-model="date"
          @change="handleChange"
          :disabled="!disabled"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        >
        </el-date-picker>
        <div class="play">
          <i
            class="el-icon-video-play"
            @click="handlePlay"
            v-show="playState"
          ></i>
          <i
            class="el-icon-video-pause"
            @click="handleStop"
            v-show="!playState"
          ></i>
        </div>
        <el-slider
          v-model="progressValue"
          @change="handleProgress"
          :max="max"
          :format-tooltip="formatTooltip"
        ></el-slider>
      </div>
      <div class="chart-wrapper" :ref="refId"></div>
    </div>
  </div>
</template>

<script>
Date.prototype.format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

import mixin from "@/mixins/chartSize";
import { feature } from "@/api/home";
import * as echarts from "echarts";
import {
  exportFeature,
  exportAccelerated,
  exportSpeed,
  ExportShape,
  exportAlarmType,
  exportAlarmStatistics,
} from "@/api/export";
export default {
  components: {},
  mixins: [mixin],
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    refId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      cid: "",
      max: 1,
      dateList: [],
      progressValue: 1,
      playState: false,
      chartData1: { date: [], data: [] },
      chartData2: { date: [], data: [] },
      chartData3: { date: [], data: [] },
      date: [
        new Date(
          new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7)
        ).format("yyyy-MM-dd hh:mm:ss"),
        new Date().format("yyyy-MM-dd hh:mm:ss"),
      ],
      allNum: 0,
      // defaultTime2: [
      //   new Date(2000, 1, 1, 0, 0, 0),
      //   new Date(2000, 2, 1, 24, 0, 0),
      // ], // '12:00:00', '08:00:00'
    };
  },
  watch: {},
  computed: {
    disabled() {
      return this.allNum == (this.checkedArr.length || 0);
    },
    checkedArr() {
      return this.$store.getters.checkedArr;
    },
  },
  methods: {
    handleExport() {
      if (this.checkedArr && this.checkedArr.length) {
        // console.log(this.checkedArr)
        this.apiExport(this.checkedArr.join());
      } else {
        this.apiExportAll();
      }
    },
    apiExportAll() {
      const ref = this.refId;
      // console.log(ref);
      switch (ref) {
        case "chart1":
          ExportShape({
            startDate: this.date[0],
            endDate: this.date[1],
          }).then((res) => {
            window.open(
              window.customENV.baseURL +
                `common/download?fileName=${encodeURI(res.msg)}&delete=true`
            );
          });
          break;
        case "chart2":
          exportSpeed({
            startDate: this.date[0],
            endDate: this.date[1],
          }).then((res) => {
            window.open(
              window.customENV.baseURL +
                `common/download?fileName=${encodeURI(res.msg)}&delete=true`
            );
          });
          break;
        case "chart3":
          exportAccelerated({
            startDate: this.date[0],
            endDate: this.date[1],
          }).then((res) => {
            window.open(
              window.customENV.baseURL +
                `common/download?fileName=${encodeURI(res.msg)}&delete=true`
            );
          });
          break;
        case "chart6":
          exportAlarmStatistics({
            startDate: this.date[0],
            endDate: this.date[1],
          }).then((res) => {
            window.open(
              window.customENV.baseURL +
                `common/download?fileName=${encodeURI(res.msg)}&delete=true`
            );
          });
          break;
        case "chart5":
          exportAlarmType().then((res) => {
            window.open(
              window.customENV.baseURL +
                `common/download?fileName=${encodeURI(res.msg)}&delete=true`
            );
          });
          break;

        default:
          break;
      }
    },
    apiExport(ids) {
      exportFeature({
        fids: ids || "",
        startTime: this.date[0],
        endTime: this.date[1],
      }).then((res) => {
        window.open(
          window.customENV.baseURL +
            `common/download?fileName=${encodeURI(res.msg)}&delete=true`
        );
      });
    },
    handlePlay() {
      this.handleStop();
      this.cid = setInterval(() => {
        if (this.progressValue < this.max) {
          this.progressValue++;
          if (this.checkedArr && this.checkedArr.length) {
            this.initChartChecked();
          } else {
            if (this.refId == "chart6") {
              this.setChartOption6();
            } else {
              this.setChartOption();
            }
          }
        } else {
          if (this.dateList.length > 1) {
            this.progressValue = 1;
            this.handlePlay();
          } else {
            this.handleStop();
          }
          return;
        }
      }, 1000);
      this.playState = false;
    },
    handleStop() {
      clearInterval(this.cid);
      this.playState = true;
    },
    close() {
      this.handleStop();
      this.$emit("update:modelValue", !this.modelValue);
    },
    handleProgress() {
      // console.log(value)
      this.handleStop();
      if (this.checkedArr && this.checkedArr.length) {
        this.initChartChecked();
      } else {
        if (this.refId == "chart6") {
          this.setChartOption6();
        } else {
          this.setChartOption();
        }
      }
    },
    formatTooltip(val) {
      return this.dateList.length ? this.dateList[val - 1] : val;
    },
    handleChange() {
      if (this.date) {
        this.chartQuery.startDate = this.date[0];
        this.chartQuery.endDate = this.date[1];
      }
      this.initChart();
    },
    initChartChecked() {
      // console.log(data);
      let data = [];
      let chart = "";
      if (this.refId == "chart1") {
        data = this.chartData1;
        chart = this.chartChecked1;
      }
      if (this.refId == "chart2") {
        data = this.chartData2;
        chart = this.chartChecked2;
      }
      if (this.refId == "chart3") {
        data = this.chartData3;
        chart = this.chartChecked3;
      }
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
          data: chartData[i].value.slice(0, this.progressValue),
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
          right: 50,
          left: 60,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            color: "#fff",
            fontSize: 16,
            showMaxLabel: true,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          data: date
            .map(function(str) {
              return str.replace(" ", "\n");
            })
            .slice(0, this.progressValue),
        },
        yAxis: {
          name: this.name,
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
    initCheckedData(type) {
      let self = this;
      if (type == 1) {
        if (!this.chartChecked1) {
          this.chartChecked1 = echarts.init(this.$refs["chart1"]);
        }
      }
      if (type == 2) {
        if (!this.chartChecked2) {
          this.chartChecked2 = echarts.init(this.$refs["chart2"]);
        }
      }
      if (type == 3) {
        if (!this.chartChecked3) {
          this.chartChecked3 = echarts.init(this.$refs["chart3"]);
        }
      }
      // console.log(this.checkedArr)
      this.allNum = 0;
      this.checkedArr.forEach((fid) => {
        feature({
          fids: fid,
          startTime: this.date[0],
          endTime: this.date[1],
        }).then((res) => {
          // console.log(res);
          const data = res.data;
          const date = data.date;
          if (data.date && data.date.length) {
            self.chartData1.date = date;
            self.chartData2.date = date;
            self.chartData3.date = date;
            self.dateList = date;
            self.progressValue = date.length;
            self.max = date.length;
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
            self.allNum++;
          } else {
            self.$message({
              showClose: true,
              message: `此时间段没有数据!`,
              type: "warning",
            });
          }
        });
      });
    },
    initChart() {
      const ref = this.refId;
      // console.log(this.refId);
      this.handleStop();
      this.dateList = [];
      this.chartHomeData = [];
      this.chartData1 = { date: [], data: [] };
      this.chartData2 = { date: [], data: [] };
      this.chartData3 = { date: [], data: [] };
      this.progressValue = 1;
      this.max = 1;
      switch (ref) {
        case "chart1":
          this.name = "mm";
          if (this.checkedArr && this.checkedArr.length) {
            this.initCheckedData(1);
          } else {
            this.initChart1(this.chartQuery);
          }
          break;
        case "chart2":
          this.name = "mm/h";
          if (this.checkedArr && this.checkedArr.length) {
            this.initCheckedData(2);
          } else {
            this.initChart2(this.chartQuery);
          }
          break;
        case "chart3":
          this.name = "mm/h²";
          if (this.checkedArr && this.checkedArr.length) {
            this.initCheckedData(3);
          } else {
            this.initChart3(this.chartQuery);
          }
          break;
        case "chart4":
          this.initChart4(this.chartQuery);
          break;
        case "chart5":
          this.initChart5(this.chartQuery);
          break;
        case "chart6":
          this.initChart6(this.chartQuery);
          break;

        default:
          break;
      }
    },
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      this.handleStop();
    });
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
