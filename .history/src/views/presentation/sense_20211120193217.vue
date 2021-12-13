<template>
  <div class="sense">
    <div class="app-left">
      <div class="sense-content">
        <div class="header-wrapper">
          <my-title :name="$t('sense')"></my-title>
          <div class="size"></div>
        </div>
        <div class="table-wrapper">
          <div class="head">
            <div>{{$t('facilityName')}}</div>
            <div>{{$t('facilityId')}}</div>
            <div>{{$t('facilityAddress')}}</div>
          </div>
          <div class="body">
            <div class="coll" v-for="(data, index) in tableData" :key="index">
              <div>{{ data.sensorName }}</div>
              <div>{{ data.sensorNumber }}</div>
              <div v-bind:title="data.location">{{ data.location }}</div>
            </div>
          </div>
        </div>
      </div>
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
    <Popup
      v-model="popupShow"
      :title="title"
      :refId="refId"
      :key="refId"
      :layar="false"
    />
  </div>
</template>

<script>
import mixin from "@/mixins";
import { getList } from "@/api/sense";
import Popup from "@/components/Popup";
import { feature } from "@/api/home";
import * as echarts from "echarts";
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
      tableData: [],
      query: {
        name: "",
        dataType: "",
      },
    };
  },
  mixins: [mixin],
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
    getSense() {
      let self = this;
      getList(this.query).then((res) => {
        // console.log(res);
        self.tableData = res.data;
        self.$sendIframe("sense", res.data);
      });
    },
    initChartChecked(data, chart,name) {
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
    initCheckedData() {
      let self = this;
      let chartData1 = { date: [], data: [] };
      let chartData2 = { date: [], data: [] };
      let chartData3 = { date: [], data: [] };
      this.chartChecked1 = echarts.init(this.$refs["chart1"]);
      this.chartChecked2 = echarts.init(this.$refs["chart2"]);
      this.chartChecked3 = echarts.init(this.$refs["chart3"]);
      // console.log(this.checkedArr)
      this.checkedArr.slice(0,10).forEach((fid) => {
        feature({ fids: fid }).then((res) => {
          // console.log(res);
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
          self.initChartChecked(chartData1, this.chartChecked1,'mm');
          self.initChartChecked(chartData2, this.chartChecked2,'mm/h');
          self.initChartChecked(chartData3, this.chartChecked3,'mm/h²');
        });
      });
    },
    realTimeData() {
      if (this.checkedArr && this.checkedArr.length) {
        // console.log("选择");
        // console.log(this.chart1);
        this.initCheckedData();
      } else {
        this.initChart1();
        this.initChart2();
        this.initChart3();
      }
      // this.initChart4();
    },
    initData() {
      this.realTimeData();
    },
  },
  created() {
    this.getSense();
  },
  mounted() {
    if (this.mapState) {
      this.initData();
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
.sense {
  .sense-content {
    height: 100%;
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
    .header-wrapper {
      display: flex;
      justify-content: space-between;
      > div {
        display: flex;
        align-items: center;
      }
      span {
        font-size: 30px;
        margin-right: 30px;
      }
      .my-search {
        width: 400px;
      }
    }
  }
  .table-wrapper {
    position: relative;
    height: calc(100% - 40px);
    overflow-y: scroll;
    background: rgba(0, 0, 0, 0.7);
    padding: 20px;
    margin: 0;
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
}
</style>
