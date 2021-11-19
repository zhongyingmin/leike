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
          <div class="text-wrapper">
            <img :src="image" alt="" v-if="image" />
            <span style="color:red" v-else>生成失败</span>
          </div>
        </div>
        <div class="form-item">
          <div class="label">{{ $t("localResultChart") }}:</div>
          <div class="text-wrapper">
            <div v-for="data in checkedArr" :key="data">
              <div
                :key="'valueimage_' + data"
                :ref="'valueimage_' + data"
              ></div>
              <div
                :key="'speedimage_' + data"
                :ref="'speedimage_' + data"
              ></div>
              <div
                :key="'accelerationimage_' + data"
                :ref="'accelerationimage_' + data"
              ></div>
            </div>
          </div>
        </div>
        <div class="form-item">
          <div class="label">{{ $t("status") }}</div>
          <div class="config-wrapper">
            <el-select v-model="reportconfig.status" placeholder="请选择">
              <el-option
                v-for="item in optionsStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="form-item" v-show="reportconfig.status == 0">
          <div class="label">{{ $t("regularTime") }}</div>
          <div class="config-wrapper">
            <el-time-select
              v-model="reportconfig.time"
              start="00:00"
              step="00:30"
              end="23:30"
              placeholder="选择时间"
            >
            </el-time-select>
          </div>
        </div>
        <div class="form-item">
          <div class="label">{{ $t("target") }}</div>
          <div class="config-wrapper">
            <el-select v-model="reportconfig.target" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
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
import { setConfig } from "@/api/user";
import { feature } from "@/api/home";
import axios from "axios";
import * as echarts from "echarts";
export default {
  components: {},
  props: {},
  data() {
    return {
      date: [],
      query: {},
      charts: {},
      image: "",
      state: 0,
      reportconfig: {
        time: "09:00",
        target: 1,
        status: 0,
      },
      options: [
        {
          label: "邮件",
          value: 1,
        },
        {
          label: "打印机",
          value: 2,
        },
      ],
      optionsStatus: [
        {
          label: "正常",
          value: 0,
        },
        {
          label: "禁用",
          value: 1,
        },
      ],
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
    userConfig() {
      return this.$store.getters.userConfig;
    },
  },
  methods: {
    printPdf() {
      let self = this;
      try {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        const iframe = document.getElementById("iframe_key").contentWindow
          .document.body;
        // eslint-disable-next-line no-undef
        html2canvas(iframe, {
          useCORS: true,
          scrollY: 0,
        }).then((canvas) => {
          let dataURL = canvas.toDataURL("image/png");
          // console.log(dataURL);
          self.image = dataURL;
        });
      } catch (error) {
        console.log(error);
      }
    },
    setUserConfig() {
      let self = this;
      setConfig({ reportconfig: this.reportconfig }).then(() => {
        // console.log(res);
        self.$message({
          showClose: true,
          message: "操作成功!",
          type: "success",
        });
      });
    },
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
    updateObj(obj) {
      let o = {};
      for (const key in obj) {
        // console.log(obj[key].getDataURL());
        o[key] = obj[key].getDataURL();
      }
      return o;
    },
    confirm() {
      if (this.image) {
        if (this.reportconfig.status == 0 && !this.reportconfig.time) {
          this.$message({
            message: "正常状态下未设置时间!",
            type: "info",
            showClose: true,
          });
          return;
        }
        this.charts = this.updateObj(this.charts);
        this.charts.globalimage = this.image;
        console.log(this.charts);
        this.handleExportFile();
        this.setUserConfig();
      } else {
        this.$message({
          message: "全局图片生成失败!",
          type: "info",
          showClose: true,
        });
      }
      // if (this.date.length) {
      //   this.handleExportFile();
      // } else {
      //   this.$message({
      //     message: "请选择时间!",
      //     type: "info",
      //     showClose: true,
      //   });
      // }
    },
    handleExportFile() {
      let self = this;
      reportFile(this.charts).then((res) => {
        if (res.requesturl) {
          axios({
            url: res.requesturl,
            method: "post",
            data:
              window.customENV.baseURL +
              `common/download?fileName=${encodeURI(res.filePath)}&delete=true`,
          }).then(() => {});
        }
        if (self.state == 0) {
          window.open(
            window.customENV.baseURL +
              `common/download?fileName=${encodeURI(res.filePath)}&delete=true`
          );
        }
      });
    },
    initCharts() {
      let self = this;
      this.checkedArr.forEach((fid) => {
        let chartChecked1 = echarts.init(self.$refs["valueimage_" + fid]);
        let chartChecked2 = echarts.init(self.$refs["speedimage_" + fid]);
        let chartChecked3 = echarts.init(
          self.$refs["accelerationimage_" + fid]
        );
        feature({ fids: fid }).then((res) => {
          self.$nextTick(() => {
            self.charts["valueimage_" + fid] = chartChecked1;
            self.charts["speedimage_" + fid] = chartChecked2;
            self.charts["accelerationimage_" + fid] = chartChecked3;
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
          animation: false,
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
    console.log(this.image);
    let state = this.$route.query.state;
    this.state = state;
    if (state) {
      this.$message({
        message: "定时任务!以自动处理,请勿操作!",
        type: "warning",
        showClose: true,
      });
    }
    if (this.mapState) {
      // setTimeout(() => {
      this.printPdf();
      this.initData();
      this.reportconfig = this.userConfig;
      // }, 1000);
    } else {
      this.$loadMap(() => {
        setTimeout(() => {
          this.printPdf();
          this.initData();
          this.reportconfig = this.userConfig;
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
    width: 1600px;
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
      width: 220px;
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
        .config-wrapper {
          width: calc(100% - 80px);
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
          img {
            width: 200px;
            height: 150px;
          }
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
