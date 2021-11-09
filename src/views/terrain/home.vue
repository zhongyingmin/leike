<template>
  <div class="home">
    <div class="app-left wrapper">
      <div class="shrink">
        <div
          class="icon"
          @click="lshow = !lshow"
          :class="{ reIcon: !lshow }"
        ></div>
      </div>
      <div v-show="lshow" class="content-wrapper">
        <div class="l1">
          <div class="header">
            <my-title name="形变值曲线"></my-title>
            <div
              class="size"
              @click="handleClick('形变值曲线', 'chart1')"
            ></div>
          </div>
          <div class="content" ref="chart1"></div>
        </div>
        <div class="l2">
          <div class="header">
            <my-title name="形变速度值曲线"></my-title>
            <div
              class="size"
              @click="handleClick('形变速度值曲线', 'chart2')"
            ></div>
          </div>
          <div class="content" ref="chart2"></div>
        </div>
        <div class="l3">
          <div class="header">
            <my-title name="形变加速值曲线"></my-title>
            <div
              class="size"
              @click="handleClick('形变加速值曲线', 'chart3')"
            ></div>
          </div>
          <div class="content" ref="chart3"></div>
        </div>
      </div>
    </div>
    <div class="app-right wrapper">
      <div class="shrink">
        <div
          class="icon"
          @click="rshow = !rshow"
          :class="{ reIcon_: !rshow }"
        ></div>
      </div>
      <div v-show="rshow" class="content-wrapper">
        <div class="r1">
          <div class="header">
            <my-title name="预警统计"></my-title>
            <div class="size" @click="handleClick('预警统计', 'chart6')"></div>
          </div>
          <div class="content">
            <div class="checkbox-wrapper">
              <el-radio-group
                v-model="query.type"
                size="mini"
                @change="initChart6"
              >
                <el-radio-button
                  v-for="data in cities"
                  :key="data.value"
                  :label="data.value"
                  >{{ data.name }}</el-radio-button
                >
              </el-radio-group>
            </div>
            <div style="width:100%;height:100%" ref="chart6"></div>
          </div>
        </div>
        <div class="r2">
          <div class="header">
            <my-title name="预警类型"></my-title>
            <div class="size" @click="handleClick('预警类型', 'chart5')"></div>
          </div>
          <div class="content" ref="chart5"></div>
        </div>
        <div class="r3">
          <div class="header">
            <my-title name="预警轮播"></my-title>
            <!-- <div class="size"></div> -->
          </div>
          <div class="content" ref="chart4">
            <div class="home-list-wrapper">
              <div class="table-wrapper">
                <div class="head">
                  <div>告警名称</div>
                  <div>预警类型</div>
                  <div>预警等级</div>
                </div>
                <div
                  id="review_box"
                  @mouseover="rollStop()"
                  @mouseout="rollStart(60)"
                >
                  <ul id="comment1" class="body">
                    <div
                      class="coll"
                      v-for="(data, index) in tableData"
                      :key="index"
                    >
                      <div>{{ data.alarmName }}</div>
                      <div>
                        <span v-if="data.alarmMode == 0">全局</span>
                        <span v-if="data.alarmMode == 1">局部</span>
                      </div>
                      <div class="warning-color">
                        <span v-if="data.alarmLevel == 1" class="red-color"
                          >一级预警</span
                        >
                        <span v-if="data.alarmLevel == 2" class="yellow-color"
                          >二级预警</span
                        >
                        <span v-if="data.alarmLevel == 3" class="orange-color"
                          >三级预警</span
                        >
                        <span v-if="data.alarmLevel == 4" class="blue-color"
                          >四级预警</span
                        >
                      </div>
                    </div>
                  </ul>
                  <ul id="comment2" class="body"></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Popup v-model="popupShow" :title="title" :refId="refId" :key="refId" />
  </div>
</template>

<script>
import mixin from "@/mixins";
import Popup from "@/components/Popup";
import { feature } from "@/api/home";
import * as echarts from "echarts";
import { getData } from "@/api/warning/record";
export default {
  components: {
    Popup,
  },
  mixins: [mixin],
  props: {},
  data() {
    return {
      lshow: true,
      rshow: true,
      refId: "",
      title: "",
      popupShow: false,
      cities: [
        { name: "日", value: 0 },
        { name: "月", value: 1 },
        { name: "年", value: 2 },
      ],
      cid: "",
      tableData: [],
      timer: null,
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
      this.checkedArr.forEach((fid) => {
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
      this.initChart5();
      this.initChart6();
    },
    getRecord() {
      let self = this;
      getData().then((res) => {
        // console.log(res);
        self.tableData = res.data || [];
        self.$nextTick(() => {
          self.roll(60);
        });
      });
    },
    roll(t) {
      var ul1 = document.getElementById("comment1");
      var ul2 = document.getElementById("comment2");
      var ulbox = document.getElementById("review_box");
      ul2.innerHTML = ul1.innerHTML;
      ulbox.scrollTop = 0;
      this.rollStart(t);
    },
    rollStart(t) {
      var ul1 = document.getElementById("comment1");
      // var ul2 = document.getElementById("comment2");
      var ulbox = document.getElementById("review_box");
      this.rollStop();
      this.timer = setInterval(() => {
        // 当滚动高度大于列表内容高度时恢复为0
        // console.log(ulbox.scrollTop >= ul1.scrollHeight)
        if (ulbox.scrollTop >= ul1.scrollHeight) {
          ulbox.scrollTop = 0;
        } else {
          ulbox.scrollTop = ulbox.scrollTop + 2;
          // console.log(ulbox.scrollTop)
        }
      }, t);
    },
    rollStop() {
      clearInterval(this.timer);
    },
    initData() {
      this.realTimeData();
      this.getRecord();
      if (this.cid) clearInterval(this.cid);
      this.cid = setInterval(() => {
        this.realTimeData();
      }, 1000 * 60 * 2);
    },
  },
  beforeUnmount() {
    if (this.timer) clearInterval(this.timer);
    if (this.cid) clearInterval(this.cid);
  },
  // eslint-disable-next-line no-unused-vars
  // beforeRouteLeave(to, from, next) {
  //   clearInterval(this.cid);
  //   next();
  // },
  created() {},
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
.home {
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
        background: url("../../assets/images/shrink.png") no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
    .content-wrapper {
      width: 100%;
      height: calc(100% - 35px);
    }
  }
  // .app-left {
  // }
  .reIcon {
    transform: rotate(180deg);
  }
  .app-right {
    .shrink {
      text-align: right;
      > div {
        transform: rotate(180deg) translateY(-50%);
      }
      .reIcon_ {
        transform: rotate(0deg) translateY(50%);
      }
    }
  }
  .home-list-wrapper {
    height: 100%;
    font-size: 14px;
    padding: 10px;
    .table-wrapper {
      margin: 0;
      height: 100%;
      .head {
        height: 50px;
        line-height: 50px;
      }
      #review_box {
        height: 160px;
        overflow: hidden;
        .body {
          height: auto;
          overflow: visible;
          > div {
            height: 50px;
            line-height: 50px;
          }
        }
      }
    }
  }
}
</style>
