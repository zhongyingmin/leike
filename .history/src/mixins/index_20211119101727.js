import * as echarts from "echarts";
import {
  warningStatistics,
  alarmType,
  thisWeekStatistics,
  getShapeChangeValue,
  getShapeChangeSpeed,
  getShapeChangeAccelerated,
} from "@/api/home";
// import { useI18n } from "vue-i18n"; //要在js中使用国际化
const unwarp = (obj) => obj && (obj.__v_raw || obj.valueOf() || obj);
export default {
  data() {
    return {
      query: {
        type: 0,
      },
      chart1: "",
      chart2: "",
      chart3: "",
      chart4: "",
      chart5: "",
      chart6: "",
    };
  },
  // setup() {
  //   // 扩展语言
  //   // getCurrentInstance
  //   const { t } = useI18n();
  //   return { t };
  // },
  watch: {
  },
  computed: {},
  methods: {
    initChart1() {
      let self = this;
      getShapeChangeValue().then((res) => {
        // console.log(res);
        const data = res.data;
        let date = data["date"];
        let min = data["min"];
        let max = data["max"];
        let avg = data["avg"];
        if (!self.chart1) {
          self.chart1 = echarts.init(self.$refs.chart1);
        }
        unwarp(self.chart1).setOption({
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
            data: date.map(function(str) {
              return str.replace(" ", "\n");
            }),
          },
          yAxis: {
            name: "mm",
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
              // name: self.$t(`min`),
              type: "line",
              // symbol: "none",
              smooth: true,
              itemStyle: {
                color: "#00ECEE",
              },
              areaStyle: {
                opacity: 0.2,
              },
              data: min,
            },
            {
              name: "平均",
              // name: self.$t(`avg`),
              type: "line",
              // symbol: "none",
              smooth: true,
              itemStyle: {
                color: "#E6CB0A",
              },
              areaStyle: {
                opacity: 0.2,
              },
              data: avg,
            },
            {
              name: "最大",
              // name: self.$t(`max`),
              type: "line",
              // symbol: "none",
              smooth: true,
              itemStyle: {
                color: "#E1302A",
              },
              areaStyle: {
                opacity: 0.2,
              },
              data: max,
            },
          ],
        });
      });
    },
    initChart2() {
      let self = this;
      getShapeChangeSpeed().then((res) => {
        const data = res.data;
        let date = data["date"];
        let min = data["min"];
        let max = data["max"];
        let avg = data["avg"];
        if (!self.chart2) {
          self.chart2 = echarts.init(self.$refs.chart2);
        }
        unwarp(self.chart2).setOption({
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
            data: date.map(function(str) {
              return str.replace(" ", "\n");
            }),
          },
          yAxis: {
            name: "mm/h",
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
              data: min,
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
              data: avg,
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
              data: max,
            },
          ],
        });
      });
      // let chart2 = echarts.init(this.$refs.chart2);
      // chart2.setOption({
      //   tooltip: {
      //     trigger: "axis",
      //   },
      //   grid: {
      //     top: 60,
      //     bottom: 50,
      //     right: 30,
      //   },
      //   xAxis: {
      //     type: "category",
      //     boundaryGap: false,
      //     axisLabel: {
      //       color: "#fff",
      //       fontSize: 16,
      //     },
      //     axisTick: {
      //       show: false,
      //     },
      //     axisLine: {
      //       show: false,
      //     },
      //     data: ["一月", "二月", "三月", "四月", "五月", "六月", "九月"],
      //   },
      //   yAxis: {
      //     type: "value",
      //     splitLine: {
      //       show: true,
      //       lineStyle: {
      //         type: "dashed",
      //         color: "#666666",
      //       },
      //     },
      //     nameTextStyle: {
      //       fontSize: 16,
      //       color: "#fff",
      //     },
      //     axisLabel: {
      //       color: "#fff",
      //       fontSize: 16,
      //     },
      //   },
      //   series: [
      //     {
      //       name: "变形值",
      //       type: "line",
      //       // symbol: "none",
      //       smooth: true,
      //       itemStyle: {
      //         color: "#00A0FF",
      //       },
      //       areaStyle: {
      //         opacity: 0.2,
      //       },
      //       data: [120, 132, 101, 134, 90, 230, 210],
      //     },
      //   ],
      // });
    },
    initChart3() {
      let self = this;
      getShapeChangeAccelerated().then((res) => {
        // console.log(res);
        const data = res.data;
        let date = data["date"];
        let min = data["min"];
        let max = data["max"];
        let avg = data["avg"];
        if (!self.chart3) {
          self.chart3 = echarts.init(self.$refs.chart3);
        }
        unwarp(self.chart3).setOption({
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
            data: date.map(function(str) {
              return str.replace(" ", "\n");
            }),
          },
          yAxis: {
            name: "mm/h²",
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
              data: min,
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
              data: avg,
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
              data: max,
            },
          ],
        });
      });
      // let chart3 = echarts.init(this.$refs.chart3);
      // chart3.setOption({
      //   tooltip: {
      //     trigger: "axis",
      //   },
      //   grid: {
      //     top: 60,
      //     bottom: 50,
      //     right: 30,
      //   },
      //   xAxis: {
      //     type: "category",
      //     boundaryGap: false,
      //     axisLabel: {
      //       color: "#fff",
      //       fontSize: 16,
      //     },
      //     axisTick: {
      //       show: false,
      //     },
      //     axisLine: {
      //       show: false,
      //     },
      //     data: ["一月", "二月", "三月", "四月", "五月", "六月", "九月"],
      //   },
      //   yAxis: {
      //     type: "value",
      //     splitLine: {
      //       show: true,
      //       lineStyle: {
      //         type: "dashed",
      //         color: "#666666",
      //       },
      //     },
      //     nameTextStyle: {
      //       fontSize: 16,
      //       color: "#fff",
      //     },
      //     axisLabel: {
      //       color: "#fff",
      //       fontSize: 16,
      //     },
      //   },
      //   series: [
      //     {
      //       name: "变形值",
      //       type: "line",
      //       // symbol: "none",
      //       smooth: true,
      //       itemStyle: {
      //         color: "#00FD74",
      //       },
      //       areaStyle: {
      //         opacity: 0.2,
      //       },
      //       data: [120, 132, 101, 134, 90, 230, 210],
      //     },
      //   ],
      // });
    },
    initChart4() {
      let self = this;
      warningStatistics().then((res) => {
        // console.log(res);
        if (!self.chart4) {
          self.chart4 = echarts.init(self.$refs.chart4);
        }
        let quanju = "";
        let jubu = "";
        quanju = res.data["全局预警"];
        jubu = res.data["局部预警"];
        unwarp(self.chart4).setOption({
          series: [
            {
              type: "gauge",
              radius: "60%",
              center: ["30%", "50%"],
              startAngle: 200,
              endAngle: -20,
              progress: {
                show: true,
                itemStyle: {
                  color: "#00FFDF",
                },
                width: 20,
              },
              axisLine: {
                lineStyle: {
                  color: [[1, "rgba(0,0,0,0.4)"]],
                  width: 20,
                },
              },
              pointer: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              detail: {
                valueAnimation: true,
                formatter: function(value) {
                  var num = value;
                  return "{bule|" + num + "}{white|%}\n{radius|全局预警}";
                },
                rich: {
                  white: {
                    fontSize: 20,
                    color: "#fff",
                    fontWeight: "500",
                    // fontStyle: 'oblique',
                    padding: [-35, 0, 0, 0],
                  },
                  bule: {
                    fontSize: 31,
                    fontFamily: "DINBold",
                    color: "#fff",
                    // fontWeight: '700',
                    // fontStyle: 'italic',
                    padding: [-40, 0, 0, 0],
                  },
                  radius: {
                    width: 80,
                    height: 30,
                    // lineHeight:80,
                    borderWidth: 1,
                    fontSize: 18,
                    color: "#1ee0cb",
                    borderRadius: 20,
                    textAlign: "center",
                  },
                  size: {
                    height: 400,
                    padding: [100, 0, 0, 0],
                  },
                },
                fontSize: 25,
                offsetCenter: [0, "35%"],
              },
              data: [
                {
                  value: quanju,
                },
              ],
            },
            {
              type: "gauge",
              radius: "60%",
              center: ["70%", "50%"],
              startAngle: 200,
              endAngle: -20,
              progress: {
                show: true,
                itemStyle: {
                  color: "#00FFDF",
                },
                width: 20,
              },
              axisLine: {
                lineStyle: {
                  color: [[1, "rgba(0,0,0,0.4)"]],
                  width: 20,
                },
              },
              pointer: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              detail: {
                valueAnimation: true,
                formatter: function(value) {
                  var num = value;
                  return "{bule|" + num + "}{white|%}\n{radius|局部预警}";
                },
                rich: {
                  white: {
                    fontSize: 20,
                    color: "#fff",
                    fontWeight: "500",
                    // fontStyle: 'oblique',
                    padding: [-35, 0, 0, 0],
                  },
                  bule: {
                    fontSize: 31,
                    fontFamily: "DINBold",
                    color: "#fff",
                    // fontWeight: '700',
                    // fontStyle: 'italic',
                    padding: [-40, 0, 0, 0],
                  },
                  radius: {
                    width: 80,
                    height: 30,
                    // lineHeight:80,
                    borderWidth: 1,
                    fontSize: 18,
                    color: "#1ee0cb",
                    borderRadius: 20,
                    textAlign: "center",
                  },
                  size: {
                    height: 400,
                    padding: [100, 0, 0, 0],
                  },
                },
                fontSize: 25,
                offsetCenter: [0, "35%"],
              },
              data: [
                {
                  value: jubu,
                },
              ],
            },
          ],
        });
      });
    },
    initChart5() {
      let self = this;
      alarmType().then((res) => {
        if (!self.chart5) {
          self.chart5 = echarts.init(self.$refs.chart5);
        }
        let chartData = res.data.map((data) => {
          return {
            name: data.alarmType,
            value: data.count || 0,
          };
        });
        // console.log(data);
        let color = ["#FF8700", "#ffc300", "#00e473", "#009DFF"];
        function array2obj(array, key) {
          var resObj = {};
          for (var i = 0; i < array.length; i++) {
            resObj[array[i][key]] = array[i];
          }
          return resObj;
        }
        let objData = array2obj(chartData, "name");
        // console.log(objData);
        let arrName = [];
        let arrValue = [];
        let sum = 0;
        let pieSeries = [],
          lineYAxis = [];

        // 数据处理
        chartData.forEach((v) => {
          arrName.push(v.name);
          arrValue.push(v.value);
          sum = sum + v.value;
        });

        // 图表option整理
        chartData.forEach((v, i) => {
          pieSeries.push({
            name: "预警类型",
            type: "pie",
            // clockWise: false,
            // hoverAnimation: false,
            radius: [65 - i * 15 + "%", 57 - i * 15 + "%"],
            center: ["30%", "50%"],
            label: {
              show: false,
            },
            data: [
              {
                value: v.value,
                name: v.name,
              },
              {
                value: sum - v.value,
                name: "",
                itemStyle: {
                  color: "rgba(0,0,0,0)",
                },
              },
            ],
          });
          pieSeries.push({
            name: "",
            type: "pie",
            silent: true,
            z: 1,
            // clockWise: false, //顺时加载
            // hoverAnimation: false, //鼠标移入变大
            radius: [65 - i * 15 + "%", 57 - i * 15 + "%"],
            center: ["30%", "50%"],
            label: {
              show: false,
            },
            data: [
              {
                value: 7.5,
                itemStyle: {
                  color: "rgba(0,0,0,0.2)",
                },
              },
              {
                value: 2.5,
                name: "",
                itemStyle: {
                  color: "rgba(0,0,0,0)",
                },
              },
            ],
          });
          v.percent = ((v.value / sum) * 100).toFixed(1) + "%";
          lineYAxis.push({
            value: i,
            textStyle: {
              rich: {
                circle: {
                  color: color[i],
                  padding: [0, 5],
                },
              },
            },
          });
        });

        unwarp(self.chart5).setOption({
          legend: {
            show: true,
            top: "center",
            left: "60%",
            data: arrName,
            itemWidth: 15,
            itemHeight: 15,
            width: 50,
            padding: [0, 5],
            itemGap: 25,
            formatter: function(name) {
              return "{title|" + name + "} {value|" + objData[name].value + "}";
            },
            textStyle: {
              rich: {
                title: {
                  fontSize: 14,
                  lineHeight: 10,
                  color: "#fff",
                },
                value: {
                  fontSize: 14,
                  lineHeight: 18,
                  color: "#1ee0cb",
                },
              },
            },
          },
          tooltip: {
            trigger: "item",
          },
          color: color,
          grid: {
            top: "15%",
            bottom: "54%",
            left: "30%",
            containLabel: false,
          },
          yAxis: [
            {
              type: "category",
              inverse: true,
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                formatter: function(params) {
                  let item = chartData[params];
                  // console.log(item);
                  return "{name|" + item.name + "}";
                },
                interval: 0,
                inside: true,
                color: "#fff",
                fontSize: 16,
                show: false,
              },
              data: lineYAxis,
            },
          ],
          xAxis: [
            {
              show: false,
            },
          ],
          series: pieSeries,
        });
        // let arrName = getArrayValue(data, "name");
        // let arrValue = getArrayValue(data, "value");
        // let sumValue = eval(arrValue.join("+"));
        // let objData = array2obj(data, "name");
        // let optionData = getData(data);
        // function getArrayValue(array, key) {
        //   var key1 = key || "value";
        //   var res = [];
        //   if (array) {
        //     array.forEach(function(t) {
        //       res.push(t[key1]);
        //     });
        //   }
        //   return res;
        // }

        // function array2obj(array, key) {
        //   var resObj = {};
        //   for (var i = 0; i < array.length; i++) {
        //     resObj[array[i][key]] = array[i];
        //   }
        //   return resObj;
        // }

        // function getData(data) {
        //   var res = {
        //     series: [],
        //     yAxis: [],
        //   };
        //   for (let i = 0; i < data.length; i++) {
        //     res.series.push({
        //       name: "警告类型",
        //       type: "pie",
        //       clockwise: false, //顺时加载
        //       // hoverAnimation: false, //鼠标移入变大
        //       radius: [65 - i * 15 + "%", 57 - i * 15 + "%"],
        //       center: ["30%", "55%"],
        //       label: {
        //         show: false,
        //       },
        //       itemStyle: {
        //         label: {
        //           show: false,
        //         },
        //         labelLine: {
        //           show: false,
        //         },
        //         borderWidth: 5,
        //       },
        //       data: [
        //         {
        //           value: data[i].value,
        //           name: data[i].name,
        //         },
        //         {
        //           value: sumValue - data[i].value,
        //           name: "",
        //           itemStyle: {
        //             color: "rgba(0,0,0,0)",
        //             borderWidth: 0,
        //           },
        //           tooltip: {
        //             show: false,
        //           },
        //           hoverAnimation: false,
        //         },
        //       ],
        //     });
        //     res.series.push({
        //       name: "",
        //       type: "pie",
        //       silent: true,
        //       z: 1,
        //       clockwise: false, //顺时加载
        //       // hoverAnimation: false, //鼠标移入变大
        //       radius: [65 - i * 15 + "%", 57 - i * 15 + "%"],
        //       center: ["30%", "55%"],
        //       label: {
        //         show: false,
        //       },
        //       itemStyle: {
        //         label: {
        //           show: false,
        //         },
        //         labelLine: {
        //           show: false,
        //         },
        //         borderWidth: 5,
        //       },
        //       data: [
        //         {
        //           value: 7.5,
        //           itemStyle: {
        //             color: "rgba(0,0,0,0.2)",
        //             borderWidth: 0,
        //           },
        //           tooltip: {
        //             show: false,
        //           },
        //           hoverAnimation: false,
        //         },
        //         {
        //           value: 2.5,
        //           name: "",
        //           itemStyle: {
        //             color: "rgba(0,0,0,0)",
        //             borderWidth: 0,
        //           },
        //           tooltip: {
        //             show: false,
        //           },
        //           hoverAnimation: false,
        //         },
        //       ],
        //     });
        //     // res.yAxis.push((data[i].value / sumValue * 100).toFixed(2) + "%");
        //     res.yAxis.push(data[i].name);
        //   }
        //   return res;
        // }
        // chart5.setOption({
        //   legend: {
        //     show: true,
        //     top: "center",
        //     left: "60%",
        //     data: arrName,
        //     itemWidth: 15,
        //     itemHeight: 15,
        //     width: 50,
        //     padding: [0, 5],
        //     itemGap: 25,
        //     formatter: function(name) {
        //       return "{title|" + name + "} {value|" + objData[name].value + "}";
        //     },
        //     textStyle: {
        //       rich: {
        //         title: {
        //           fontSize: 14,
        //           lineHeight: 10,
        //           color: "#fff",
        //         },
        //         value: {
        //           fontSize: 14,
        //           lineHeight: 18,
        //           color: "#1ee0cb",
        //         },
        //       },
        //     },
        //   },
        //   tooltip: {
        //     show: true,
        //     trigger: "item",
        //     // formatter: "{a}<br>{b}:{c}({d}%)",
        //     formatter: "{a}<br>{b}:{c}",
        //   },
        //   color: ["#00FFD6", "#00D2F9", "#2FE565", "#009DFF"],
        //   grid: {
        //     top: "20%",
        //     bottom: "48%",
        //     left: "30%",
        //     containLabel: false,
        //   },
        //   yAxis: [
        //     {
        //       type: "category",
        //       inverse: true,
        //       axisLine: {
        //         show: false,
        //       },
        //       axisTick: {
        //         show: false,
        //       },
        //       axisLabel: {
        //         interval: 0,
        //         inside: true,
        //         color: "#fff",
        //         fontSize: 16,
        //         show: true,
        //       },
        //       data: optionData.yAxis,
        //     },
        //   ],
        //   xAxis: [
        //     {
        //       show: false,
        //     },
        //   ],
        //   series: optionData.series,
        // });
      });
    },
    initChart6() {
      let self = this;
      thisWeekStatistics(this.query).then((res) => {
        // console.log(res);
        let hour = res.data["date"];
        // if (self.query.type != 0) {
        //   hour = res.data["date"];
        // } else {
        //   hour = res.data["hour"].map((data) => Number(data) + 1);
        // }
        let data = res.data["data"].map((data) => Number(data));
        if (!self.chart6) {
          self.chart6 = echarts.init(self.$refs.chart6);
        }
        unwarp(self.chart6).setOption({
          tooltip: {
            trigger: "axis",
          },
          grid: {
            top: 70,
            bottom: 50,
            right: 30,
          },
          xAxis: {
            type: "category",
            axisLabel: {
              color: "#fff",
              fontSize: 16,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: hour,
          },
          yAxis: {
            axisLabel: {
              color: "#fff",
              fontSize: 16,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            type: "value",
          },
          series: [
            {
              name: "预警统计",
              data,
              label: {
                show: true,
                color: "#fff",
                fontSize: 16,
                formatter: function(obj) {
                  let val = obj.value || "";
                  return val;
                },
                position: "top",
              },
              barWidth: 15, //柱图宽度
              itemStyle: {
                borderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#aeffae" },
                  { offset: 1, color: "#19fff4" },
                ]),
                // borderColor: "#c5f834",
              },
              type: "bar",
            },
          ],
        });
      });
    },
  },
};
