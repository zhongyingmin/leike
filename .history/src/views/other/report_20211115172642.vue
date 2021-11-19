<template>
  <div class="report">
    <div class="report-content">
      <div class="close" @click="close">
        <i class="el-icon-close"></i>
      </div>
      <div class="form-wrapper">
        <div class="form-item">
          <div class="label-title">{{ $t("report") }}</div>
          <div class="botton-wrapper"></div>
        </div>
        <!-- <div class="form-item">
          <div class="label">{{$t('reportTime')}}:</div>
          <div class="text-wrapper">
            <el-date-picker
              v-model="date"
              @change="handleChange"
              type="datetimerange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="YYYY-MM-DD HH:mm:ss"
            >
            </el-date-picker>
          </div>
        </div> -->
        <div class="form-item">
          <div class="label">{{ $t("globalResultChart") }}:</div>
          <div class="text-wrapper"></div>
        </div>
        <div class="form-item">
          <div class="label">{{ $t("localResultChart") }}:</div>
          <div class="text-wrapper">
            <div v-for="data in checkedArr" :key="data">
              <div :key="'xb_chart' + data" :ref="'xb_chart' + data"></div>
              <div :key="'xbjs_chart' + data" :ref="'xbjs_chart' + data"></div>
              <div
                :key="'xbjsd_chart' + data"
                :ref="'xbjsd_chart' + data"
              ></div>
            </div>
          </div>
        </div>
        <div class="form-item">
          <div class="label"></div>
          <div class="botton-wrapper">
            <div class="confirm" @click="confirm">{{ $t("export") }}</div>
            <!-- <div class="remove">删除</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reportFile } from "@/api/other/report";
import { feature } from "@/api/home";
import * as echarts from "echarts";
export default {
  components: {},
  props: {},
  data() {
    return {
      date: [],
      query: {},
      charts: [],
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
    close() {
      this.$router.push("/");
    },
    // handleChange() {
    //   // console.log(this.date);
    //   if (this.date) {
    //     this.query.startDate = this.date[0];
    //     this.query.endDate = this.date[1];
    //   }
    // },
    confirm() {
      if (this.date.length) {
        this.handleExportFile();
      } else {
        this.$message({
          message: "请选择时间!",
          type: "info",
          showClose: true,
        });
      }
    },
    handleExportFile() {
      // let self = this;
      reportFile(this.query).then((res) => {
        window.open(
          window.customENV.baseURL +
            `common/download?fileName=${encodeURI(res.filePath)}&delete=true`
        );
      });
    },
    initCharts() {
      let self = this;
      this.checkedArr.forEach((fid) => {
        let chartChecked1 = echarts.init(self.$refs["xb_chart" + fid]);
        let chartChecked2 = echarts.init(self.$refs["xbjs_chart" + fid]);
        let chartChecked3 = echarts.init(self.$refs["xbjsd_chart" + fid]);
        feature({ fids: fid }).then((res) => {
          self.$nextTick(() => {
            self.charts.push(chartChecked1);
            self.charts.push(chartChecked2);
            self.charts.push(chartChecked3);
            let chartData1 = { date: [], data: [] };
            let chartData2 = { date: [], data: [] };
            let chartData3 = { date: [], data: [] };
            const data = res.data;
            const date = data.date;
            chartData1.date = date;
            chartData2.date = date;
            chartData3.date = date;
            for (let i = 0; i < data.xbData.length; i++) {
              let obj = data.xbData[i];
              if (obj.type == "point") {
                chartData1.data.push({
                  name: obj.name + "(形变值)",
                  value: obj.xbvlaue,
                });
                chartData2.data.push({
                  name: obj.name + "(形变速度值)",
                  value: obj.xbspeed,
                });
                chartData3.data.push({
                  name: obj.name + "(形变加速值)",
                  value: obj.xbxbaccelerated,
                });
              } else {
                chartData1.data.push({
                  name: obj.name + "(最小形变值)",
                  value: obj.xbvaluemin,
                });
                chartData1.data.push({
                  name: obj.name + "(最大形变值)",
                  value: obj.xbvaluemax,
                });
                chartData1.data.push({
                  name: obj.name + "(平均形变值)",
                  value: obj.xbvalueavg,
                });
                chartData2.data.push({
                  name: obj.name + "(最小形变速度值)",
                  value: obj.xbspeedmin,
                });
                chartData2.data.push({
                  name: obj.name + "(最大形变速度值)",
                  value: obj.xbspeedmax,
                });
                chartData2.data.push({
                  name: obj.name + "(平均形变速度值)",
                  value: obj.xbspeedavg,
                });
                chartData3.data.push({
                  name: obj.name + "(最小形变加速值)",
                  value: obj.xbacceleratedmin,
                });
                chartData3.data.push({
                  name: obj.name + "(最大形变加速值)",
                  value: obj.xbacceleratedmax,
                });
                chartData3.data.push({
                  name: obj.name + "(平均形变加速值)",
                  value: obj.xbacceleratedavg,
                });
              }
            }
            self.initChartChecked(chartData1, chartChecked1, "mm");
            self.initChartChecked(chartData2, chartChecked2, "mm/h");
            self.initChartChecked(chartData3, chartChecked3, "mm/h²");
          });
        });
        // console.log(res);
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
          data: chartData[i].value,
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
          data: date.map(function(str) {
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
        series: seriesList,
      });
    },
    initData() {
      if (this.checkedArr && this.checkedArr.length) {
        this.initCharts();
      }
    },
  },
  created() {},
  mounted() {
    if (this.mapState) {
      // setTimeout(() => {
      this.initData();
      // }, 1000);
    } else {
      this.$loadMap(() => {
        setTimeout(() => {
          this.initData();
        }, 500);
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.report {
  position: relative;
  height: 100%;
  .report-content {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1400px;
    height: 700px;
    transform: translate(-50%, -50%);
    border: 1px solid #32f1b4;
    background: rgba(0, 0, 0, 0.9);
    padding: 40px 60px;
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
    ::v-deep(.el-select) {
      input {
        background-color: transparent;
        border: 1px solid #32f1b4;
        color: #fff;
        &::-webkit-input-placeholder {
          color: #fff;
        }
      }
      i {
        color: #fff;
      }
    }
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
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
    .form-wrapper {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      .form-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 20px;
        .label {
          margin-top: 4px;
          width: 140px;
          color: #22e2cb;
        }
        .label-title {
          color: #fff;
          font-size: 18px;
        }
        .input-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: calc(100% - 80px);
          border: 1px solid #fff;
          border-radius: 2px;
          .tagColor-wrapper {
            display: flex;
            align-items: center;
            margin-left: 10px;
          }
          ::v-deep(.el-color-picker) {
            .el-color-picker__trigger {
              border: none;
            }
          }
        }
        .text-wrapper {
          width: calc(100% - 80px);
          > div {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            width: 100%;
            height: 300px;
            margin-bottom: 20px;
            > div {
              width: 33%;
              height: 100%;
            }
          }
        }
        .botton-wrapper {
          display: flex;
          width: calc(100% - 80px);
          > div {
            padding: 4px 20px;
            cursor: pointer;
          }
          .confirm {
            background: #22e2cb;
            border-radius: 4px;
            margin-right: 20px;
          }
          .remove {
            border: 1px solid #22e2cb;
            color: #fff;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
</style>
