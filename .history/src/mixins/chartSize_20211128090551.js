import * as echarts from "echarts";
import {
  warningStatistics,
  alarmType,
  thisWeekStatistics,
  getShapeChangeValue,
  getShapeChangeSpeed,
  getShapeChangeAccelerated,
} from "@/api/chartSize";
const unwarp = (obj) => obj && (obj.__v_raw || obj.valueOf() || obj);

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
export default {
  data() {
    return {
      chartQuery: {
        startDate: new Date(
          new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7)
        ).format("yyyy-MM-dd hh:mm:ss"),
        endDate: new Date().format("yyyy-MM-dd hh:mm:ss"),
      },
      chart1: null,
      chart2: null,
      chart3: null,
      chart4: null,
      chart5: null,
      chart6: null,
      chartHomeData: null,
    };
  },
  methods: {
    setChartOption() {
      let self = this;
      const data = self.chartHomeData;
      let date = data["date"];
      let min = data["min"];
      let max = data["max"];
      let avg = data["avg"];
      if (!self.chart1) {
        self.chart1 = echarts.init(self.$refs[self.refId]);
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
          data: date.slice(0, self.progressValue),
        },
        yAxis: {
          name: self.name,
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
    setChartOption6() {
      let self = this;
      const data = self.chartHomeData;
      let date = data.map((data) => data.date);
      let count = data.map((data) => data.count);
      if (!self.chart6) {
        self.chart6 = echarts.init(self.$refs.chart6);
      }
      // console.log(self.progressValue)
      // console.log(date)
      // console.log(date.slice(0, self.progressValue+1))
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
          data: date.slice(0, self.progressValue),
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
            data: count.slice(0, self.progressValue),
            label: {
              show: true,
              color: "#fff",
              fontSize: 16,
              position: "top",
              formatter: function(obj) {
                let val = obj.value || "";
                return val;
              },
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
    },
    initChart1() {
      let self = this;
      getShapeChangeValue(this.chartQuery).then((res) => {
        // console.log(res);
        const date = res.data["date"];
        self.dateList = date;
        self.progressValue = date.length;
        self.max = date.length;
        self.chartHomeData = res.data;
        self.setChartOption();
      });
    },
    initChart2() {
      let self = this;
      getShapeChangeSpeed(this.chartQuery).then((res) => {
        const date = res.data["date"];
        self.dateList = date;
        self.progressValue = date.length;
        self.max = date.length;
        self.chartHomeData = res.data;
        self.setChartOption();
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
      getShapeChangeAccelerated(this.chartQuery).then((res) => {
        const date = res.data["date"];
        self.dateList = date;
        self.progressValue = date.length;
        self.max = date.length;
        self.chartHomeData = res.data;
        self.setChartOption();
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
        self.chart4.setOption({
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
        let color = ["#FF8700", "#ffc300", "#00e473", "#009DFF"];
        function array2obj(array, key) {
          var resObj = {};
          for (var i = 0; i < array.length; i++) {
            resObj[array[i][key]] = array[i];
          }
          return resObj;
        }
        let objData = array2obj(chartData, "name");
        console.log(objData);
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
                  console.log(item);
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
        // console.log(data);
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
        // self.chart5.setOption({
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
      self.allNum=0
      thisWeekStatistics(this.chartQuery).then((res) => {
        // console.log(res);
        self.allNum = (self.checkedArr.length || 0);
        const data = res.data;
        let date = data.map((data) => data.date);
        self.dateList = date;
        self.progressValue = date.length;
        console.log(date)
        self.max = date.length;
        self.chartHomeData = data;
        if (self.chart1) {
          unwarp(self.chart1).clear();
        }
        self.setChartOption6();
      });
    },
  },
};
