<template>
  <div class="deformation">
    <div class="tool-wrapper">
      <el-date-picker
        v-model="date"
        @change="handleChange"
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
    <div class="app-right wrapper">
      <div class="shrink">
        <div class="icon"></div>
      </div>
      <div class="content-wrapper">
        <div class="l1">
          <div class="header">
            <my-title :name="$t('shapeCurve')"></my-title>
            <div
              class="size"
              @click="handleClick($t('shapeCurve'), 'chart1')"
            ></div>
          </div>
          <div class="content" ref="chart1"></div>
        </div>
        <div class="l2">
          <div class="header">
            <my-title :name="$t('shapeSpeedCurve')"></my-title>
            <div
              class="size"
              @click="handleClick($t('shapeSpeedCurve'), 'chart2')"
            ></div>
          </div>
          <div class="content" ref="chart2"></div>
        </div>
        <div class="l3">
          <div class="header">
            <my-title :name="$t('shapeAcceleratedCurve')"></my-title>
            <div
              class="size"
              @click="handleClick($t('shapeAcceleratedCurve'), 'chart3')"
            ></div>
          </div>
          <div class="content" ref="chart3"></div>
        </div>
      </div>
    </div>
    <Popup v-model="popupShow" :title="title" :refId="refId" :key="refId" />
  </div>
</template>

<script>
import { querySensorData, getFileData } from "@/api/deformation";
import { feature } from "@/api/home";
import * as echarts from "echarts";
import {
  getShapeChangeValue,
  getShapeChangeSpeed,
  getShapeChangeAccelerated,
} from "@/api/chartSize";
import Popup from "@/components/Popup";
export default {
  components: {
    Popup,
  },
  props: {},
  data() {
    return {
      refId: "",
      title: "",
      popupShow: false,
      cid: "",
      progressValue: 0,
      playState: false,
      date: [
        new Date(
          new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7)
        ).format("yyyy-MM-dd hh:mm:ss"),
        new Date().format("yyyy-MM-dd hh:mm:ss"),
      ],
      query: {
        startTime: new Date(
          new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7)
        ).format("yyyy-MM-dd hh:mm:ss"),
        endTime: new Date().format("yyyy-MM-dd hh:mm:ss"),
      },
      dataList: [],
      max: 1,
      chartData1: null,
      chartData2: null,
      chartData3: null,
    };
  },
  watch: {},
  computed: {
    checkedArr() {
      return this.$store.getters.checkedArr;
    },
    mapState() {
      return this.$store.getters.status;
    },
  },
  methods: {
    handleClick(title, refId) {
      this.title = title;
      this.refId = refId;
      this.popupShow = true;
    },
    setChartOption(chartData, chart, name) {
      let self = this;
      const data = chartData;
      let date = data["date"];
      let min = data["min"];
      let max = data["max"];
      let avg = data["avg"];
      chart.setOption({
        // legend: {
        //   show: true,
        //   top: 20,
        //   right: 25,
        //   textStyle: {
        //     fontSize: 14,
        //     color: "#fff",
        //   },
        // },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: 60,
          bottom: 50,
          right: 50,
          left: 80,
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
          data: date.slice(0, self.progressValue).map(function(str) {
            return str.replace(" ", "\n");
          }),
        },
        yAxis: {
          name,
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
        series: [
          {
            name: "最小",
            type: "line",
            // symbol: "none",
            smooth: true,
            itemStyle: {
              color: "#00ECEE",
            },
            areaStyle: {
              opacity: 0.2,
            },
            data: min.slice(0, self.progressValue),
          },
          {
            name: "平均",
            type: "line",
            // symbol: "none",
            smooth: true,
            itemStyle: {
              color: "#E6CB0A",
            },
            areaStyle: {
              opacity: 0.2,
            },
            data: avg.slice(0, self.progressValue),
          },
          {
            name: "最大",
            type: "line",
            // symbol: "none",
            smooth: true,
            itemStyle: {
              color: "#E1302A",
            },
            areaStyle: {
              opacity: 0.2,
            },
            data: max.slice(0, self.progressValue),
          },
        ],
      });
    },
    initChart1() {
      let self = this;
      getShapeChangeValue({
        startDate: this.query.startTime,
        endDate: this.query.endTime,
      }).then((res) => {
        // console.log(res);
        self.chartData1 = res.data;
        if (!self.chartChecked1) {
          self.chartChecked1 = echarts.init(this.$refs["chart1"]);
        }
        self.setChartOption(this.chartData1, this.chartChecked1, "mm");
      });
    },
    initChart2() {
      let self = this;
      getShapeChangeSpeed({
        startDate: this.query.startTime,
        endDate: this.query.endTime,
      }).then((res) => {
        self.chartData2 = res.data;
        if (!self.chartChecked2) {
          self.chartChecked2 = echarts.init(this.$refs["chart2"]);
        }
        self.setChartOption(this.chartData2, this.chartChecked2, "mm/h");
      });
    },
    initChart3() {
      let self = this;
      getShapeChangeAccelerated({
        startDate: this.query.startTime,
        endDate: this.query.endTime,
      }).then((res) => {
        self.chartData3 = res.data;
        if (!self.chartChecked3) {
          self.chartChecked3 = echarts.init(this.$refs["chart3"]);
        }
        self.setChartOption(this.chartData3, this.chartChecked3, "mm/h²");
      });
    },
    formatTooltip(val) {
      return this.dataList.length ? this.dataList[val - 1].time : val;
    },
    handleChange() {
      // console.log(this.date);
      if (this.date) {
        this.query.startTime = this.date[0];
        this.query.endTime = this.date[1];
      }
      this.getData();
    },
    handleProgress(value) {
      // console.log(value);
      this.handleStop();
      this.fileData(value - 1);
      if (this.checkedArr && this.checkedArr.length) {
        this.initChartChecked(this.chartData1, this.chartChecked1, "mm");
        this.initChartChecked(this.chartData2, this.chartChecked2, "mm/h");
        this.initChartChecked(this.chartData3, this.chartChecked3, "mm/h²");
      } else {
        this.setChartOption(this.chartData1, this.chartChecked1, "mm");
        this.setChartOption(this.chartData2, this.chartChecked2, "mm/h");
        this.setChartOption(this.chartData3, this.chartChecked3, "mm/h²");
      }
    },
    handlePlay() {
      // if (this.max === 1) {
      //   this.handleStop();
      //   return;
      // }
      this.handleStop();
      this.cid = setInterval(() => {
        if (this.progressValue < this.max) {
          this.progressValue++;
          this.fileData(this.progressValue - 1);
          if (this.checkedArr && this.checkedArr.length) {
            this.initChartChecked(this.chartData1, this.chartChecked1, "mm");
            this.initChartChecked(this.chartData2, this.chartChecked2, "mm/h");
            this.initChartChecked(this.chartData3, this.chartChecked3, "mm/h²");
          } else {
            this.setChartOption(this.chartData1, this.chartChecked1, "mm");
            this.setChartOption(this.chartData2, this.chartChecked2, "mm/h");
            this.setChartOption(this.chartData3, this.chartChecked3, "mm/h²");
          }
        } else {
          if (this.dataList.length > 1) {
            this.progressValue = 1;
            this.handlePlay();
          } else {
            this.handleStop();
          }
          return;
        }
      }, 5000);
      this.playState = false;
    },
    handleStop() {
      clearInterval(this.cid);
      this.playState = true;
    },
    getData() {
      this.handleStop();
      let self = this;
      this.dataList = [];
      this.progressValue = 1;
      this.max = 1;
      querySensorData(this.query).then((res) => {
        // console.log(res);
        if (res.data && res.data.length) {
          self.dataList = res.data;
          self.progressValue = self.dataList.length;
          self.max = self.dataList.length;
          self.fileData(self.dataList.length - 1);
        }
        if (self.checkedArr && self.checkedArr.length) {
          // console.log("选择");
          // console.log(self.chart1);
          self.initCheckedData();
        } else {
          self.initChart1();
          self.initChart2();
          self.initChart3();
        }
      });
    },
    fileData(i) {
      let self = this;
      console.log(this.dataList[i]);
      getFileData({
        fileData: this.dataList[i].jsonPath,
      }).then((res) => {
        // console.log(res);
        self.$sendIframe("deformation", res.data);
      });
    },
    initChartChecked(data, chart, name) {
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
        // legend: {
        //   show: true,
        //   top: 20,
        //   right: 25,
        //   textStyle: {
        //     fontSize: 14,
        //     color: "#fff",
        //   },
        // },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: 40,
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
          name,
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
      this.chartChecked1 = echarts.init(this.$refs["chart1"]);
      this.chartChecked2 = echarts.init(this.$refs["chart2"]);
      this.chartChecked3 = echarts.init(this.$refs["chart3"]);
      self.chartData1 = { date: [], data: [] };
      self.chartData2 = { date: [], data: [] };
      self.chartData3 = { date: [], data: [] };
      // console.log(this.checkedArr)
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
            // self.dateList = date;
            // self.max = date.length - 1;
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
            self.initChartChecked(this.chartData1, this.chartChecked1, "mm");
            self.initChartChecked(this.chartData2, this.chartChecked2, "mm/h");
            self.initChartChecked(this.chartData3, this.chartChecked3, "mm/h²");
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
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteLeave(to, from, next) {
    this.handleStop();
    next();
  },
  created() {},
  mounted() {
    if (this.mapState) {
      this.getData();
    } else {
      this.$loadMap(() => {
        setTimeout(() => {
          this.getData();
        }, 500);
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.deformation {
  .tool-wrapper {
    position: absolute;
    right: 750px;
    bottom: 20px;
    display: flex;
    align-items: center;
    .play {
      font-size: 40px;
      color: #32f1b4;
      cursor: pointer;
      margin: 0 10px;
    }
    ::v-deep(.el-range-editor) {
      background-color: rgba(0, 0, 0, 0);
      border: 1px solid #32f1b4;
      input {
        background-color: rgba(0, 0, 0, 0) !important;
        color: #fff;
      }
      span {
        color: #fff;
      }
    }
    .el-slider {
      width: 600px;
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
  .wrapper {
    .header {
      position: relative;
      .size {
        position: absolute;
        top: 18px;
        right: 2px;
        width: 19px;
        height: 19px;
        background: url("../../assets/images/size.png") no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
      .font {
        position: absolute;
        top: 18px;
        right: 2px;
        cursor: pointer;
        color: #00fee4;
      }
    }
    .content {
      position: relative;
      height: calc(100% - 40px);
      background: rgba(0, 0, 0, 0.7);
      .checkbox-wrapper {
        position: absolute;
        z-index: 10;
        right: 10px;
        top: 10px;
      }
    }
    .l1,
    .l2,
    .l3,
    .r1,
    .r2,
    .r3 {
      width: 100%;
      height: 33%;
    }
    .shrink {
      .icon {
        display: inline-block;
        width: 31px;
        height: 26px;
      }
    }
    .content-wrapper {
      width: 100%;
      height: calc(100% - 35px);
    }
  }
  .app-right {
    .shrink {
      text-align: right;
    }
  }
}
</style>
