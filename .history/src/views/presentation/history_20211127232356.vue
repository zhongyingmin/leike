<template>
  <div class="history">
    <div class="history-content">
      <div class="header-wrapper">
        <div class="close" @click="close">
          <i class="el-icon-close"></i>
        </div>
        <div class="left">
          <span>
            {{ $t("history") }}
          </span>
          <el-date-picker
            v-model="date"
            @change="handleChange"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          >
          </el-date-picker>
          <el-select
            v-model="query.dataType"
            @change="getHistorys"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="right">
          <el-select v-model="exporttype" placeholder="请选择">
            <el-option
              v-for="item in optionsType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div class="confirm" @click="handleExportArr">
            {{ $t("batchExport") }}
          </div>
        </div>
      </div>
      <div class="table-wrapper">
        <div class="head">
          <div>
            <div class="box_checkbox">
              <input
                type="checkbox"
                id="allCheckbox"
                v-model="status"
                @click="handleAll"
              />
              <label for="allCheckbox"></label>
            </div>
          </div>
          <div>{{ $t("name") }}</div>
          <div>{{ $t("timeInterval") }}</div>
          <div>{{ $t("shapeCurve") }}</div>
          <div>{{ $t("shapeSpeedCurve") }}</div>
          <div>{{ $t("shapeAcceleratedCurve") }}</div>
          <div>{{ $t("handle") }}</div>
        </div>
        <div class="body">
          <div class="coll" v-for="(data, index) in tableData" :key="index">
            <div>
              <div class="box_checkbox" @change="handleCheckbox">
                <input
                  type="checkbox"
                  :id="'point' + index"
                  v-model="data.state"
                />
                <label :for="'point' + index"></label>
              </div>
            </div>
            <div>{{ data.name }}</div>
            <div v-bind:title="`${date ? date.join('-') : ''}`">
              {{ date ? date.join("-") : "" }}
            </div>
            <div>
              <div class="icon" @click="handleUpdate(data, 1)"></div>
            </div>
            <div>
              <div class="icon" @click="handleUpdate(data, 2)"></div>
            </div>
            <div>
              <div class="icon" @click="handleUpdate(data, 3)"></div>
            </div>
            <div class="handle">
              <!-- <div class="edit" @click="handleClick(data)">详情</div> -->
              <div class="edit" @click="handleExport(data)">
                {{ $t("export") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Popup
      v-model="popupShow"
      :title="title"
      :key="keyID"
      :pid="refId"
      :type="type"
      :date="date"
    />
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
import { draws } from "@/api/map";
import { exportFeature } from "@/api/export";
import Popup from "@/components/PopupChart";
export default {
  components: {
    Popup,
  },
  props: {},
  data() {
    return {
      exporttype: 1,
      type: 1,
      title: "",
      refId: 0,
      key: "",
      keyID: "",
      popupShow: false,
      date: [
        new Date(
          new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7)
        ).format("yyyy-MM-dd hh:mm:ss"),
        new Date().format("yyyy-MM-dd hh:mm:ss"),
      ],
      query: {
        dataType: "",
        merge: true,
      },
      tableData: [],
      options: [
        {
          value: "point",
          label: "点",
        },
        {
          value: "line",
          label: "线",
        },
        {
          value: "area",
          label: "面",
        },
      ],
      optionsType: [
        {
          value: 1,
          label: "excel",
        },
        {
          value: 2,
          label: "csv",
        },
        {
          value: 3,
          label: "txt",
        },
        {
          value: 4,
          label: "word",
        },
        {
          value: 5,
          label: "pdf",
        },
      ],
      checkboxArr: [],
    };
  },
  watch: {},
  computed: {
    status: {
      get() {
        return (
          this.tableData.filter((item) => item.state).length ===
          this.tableData.length
        );
      },
      set(value) {
        this.tableData.map(function(item) {
          item.state = value;
          return item;
        });
      },
    },
  },
  methods: {
    handleAll() {
      // console.log(this.status);
      if (this.status) {
        this.checkboxArr = this.tableData.map((data) => {
          let id = data.id;
          if (data.isSensor) {
            id = data.id + "*";
          }
          return id;
        });
      } else {
        this.checkboxArr = [];
      }
    },
    handleCheckbox() {
      // console.log(this.tableData);
      this.checkboxArr = this.tableData
        .filter((data) => {
          return !data.state;
        })
        .map((data) => {
          let id = data.id;
          if (data.isSensor) {
            id = data.id + "*";
          }
          return id;
        });
    },
    close() {
      this.$router.push("/");
    },
    handleExport(row) {
      let id = row.id;
      if (row.isSensor) {
        id = row.id + "*";
      }
      this.apiExport(id);
    },
    handleExportArr() {
      // console.log(this.checkboxArr)
      this.apiExport(this.checkboxArr.join());
    },
    apiExport(ids) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      exportFeature({
        exporttype: this.exporttype,
        fids: ids,
        startTime: this.date[0],
        endTime: this.date[1],
      }).then((res) => {
        console.log(res)
        loading.close();
        window.open(
          window.customENV.baseURL +
            `common/download?fileName=${encodeURI(res.msg)}&delete=true`
        );
      });
    },
    handleClick(row) {
      this.$router.push({ path: "historyInfo", query: { id: row.id } });
    },
    handleUpdate(row, type) {
      this.title = row.name;
      // this.keyID = row.id + "_" + type;
      this.keyID = new Date().getTime() + "_" + type;
      let id = row.id;
      if (row.isSensor) {
        id = row.id + "*";
      }
      this.refId = id;
      this.type = type;
      this.popupShow = true;
    },
    S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    // Generate a pseudo-GUID by concatenating random hexadecimal.
    guid() {
      return (
        this.S4() +
        this.S4() +
        "-" +
        this.S4() +
        "-" +
        this.S4() +
        "-" +
        this.S4() +
        "-" +
        this.S4() +
        this.S4() +
        this.S4()
      );
    },
    handleChange() {
      // console.log(this.date);
    },
    getHistorys() {
      let self = this;
      draws(this.query).then((res) => {
        // console.log(res);
        self.tableData = res.data.map((data) => {
          data.state = true;
          return data;
        });
      });
    },
  },
  created() {
    this.getHistorys();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
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
.history {
  padding: 80px 10px 10px 10px;
  height: 100%;
  .history-content {
    height: 100%;
    border: 1px solid #32f1b4;
    background: rgba(0, 0, 0, 0.9);
    padding: 40px 60px;
    ::v-deep(.el-select) {
      margin-left: 20px;
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
      position: relative;
      display: flex;
      justify-content: space-between;
      .close {
        position: absolute;
        top: -30px;
        right: -50px;
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
      .right {
        > div {
          margin-left: 10px;
          padding: 5px 25px;
          border-radius: 4px;
          cursor: pointer;
        }
        .confirm {
          background-color: #00fee4;
        }
      }
    }
  }
  .table-wrapper {
    height: calc(100% - 65px);
  }
}
</style>
