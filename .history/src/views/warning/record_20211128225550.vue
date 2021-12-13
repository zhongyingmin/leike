<template>
  <div class="record">
    <div class="record-content">
      <div class="header-wrapper">
        <div class="close" @click="close">
          <i class="el-icon-close"></i>
        </div>
        <div class="left">
          <span>
            {{$t('warningRecord')}}
          </span>
          <el-date-picker
            v-model="date"
            @change="handleChange"
            type="daterange"
            :start-placeholder="$t('startTime')"
            :end-placeholder="$t('endTime')"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          >
          </el-date-picker>
          <el-select
            v-model="query.alarmMode"
            @change="getRecord"
            :placeholder="$t('please')"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="$t(item.label)"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="query.alarmLevel"
            @change="getRecord"
            :placeholder="$t('please')"
            clearable
          >
            <el-option
              v-for="item in options_level"
              :key="item.value"
              :label="$t(item.label)"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="right"></div>
      </div>
      <div class="table-wrapper">
        <div class="head">
          <div>{{$t('alarmTime')}}</div>
          <div>{{$t('alarmName')}}</div>
          <div>{{$t('alarmType')}}</div>
          <div>{{$t('warningType')}}</div>
          <div>{{$t('alarmLevel')}}</div>
          <div>{{$t('alarmState')}}</div>
          <div>{{$t('handle')}}</div>
        </div>
        <div class="body">
          <div class="coll" v-for="(data, index) in tableData" :key="index">
            <div>{{ data.alarmTime }}</div>
            <div>{{ data.alarmName }}</div>
            <div>
              <span v-if="data.alarmType == 0">形变值报警</span>
              <span v-if="data.alarmType == 1">形变速度值报警</span>
              <span v-if="data.alarmType == 2">形变加速度值报警</span>
              <span v-if="data.alarmType == 3">综合报警</span>
            </div>
            <div>
              <span v-if="data.alarmMode == 0">{{$t("Global")}}</span>
              <span v-if="data.alarmMode == 1">{{$t("Local")}}</span>
            </div>
            <div class="warning-color">
              <span v-if="data.alarmLevel == 1" class="red-color"
                >{{$t("LevelOne")}}</span
              >
              <span v-if="data.alarmLevel == 2" class="yellow-color"
                >{{$t("LevelTwo")}}</span
              >
              <span v-if="data.alarmLevel == 3" class="orange-color"
                >{{$t("LevelThree")}}</span
              >
              <span v-if="data.alarmLevel == 4" class="blue-color"
                >{{$t("LevelFour")}}</span
              >
            </div>
            <div>
              <span v-if="data.alarmStatus == 0">{{$t("untreated")}}</span>
              <span v-if="data.alarmStatus == 1">{{$t("relieve")}}</span>
              <!-- <span v-if="data.alarmStatus == 2">忽略</span> -->
            </div>
            <div class="handle">
              <div class="edit" v-if="data.alarmStatus == 0" @click="handleUpdate(data.alarmId, 1, '解除')">
                {{$t("relieve")}}
              </div>
              <div class="edit">
                {{$t("info")}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getData, update } from "@/api/warning/record";
export default {
  components: {},
  props: {},
  data() {
    return {
      date: "",
      query: {
        startTime: "",
        endTime: "",
        alarmLevel: "",
        alarmMode: "",
        // alarmStatus: 0,
      },
      options: [
        {
          value: 0,
          label: "Global",
        },
        {
          value: 1,
          label: "Local",
        },
      ],
      options_level: [
        {
          value: 1,
          label: "LevelOne",
        },
        {
          value: 2,
          label: "LevelTwo",
        },
        {
          value: 3,
          label: "LevelThree",
        },
        {
          value: 4,
          label: "LevelFour",
        },
      ],
      tableData: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
    close() {
      this.$router.push("/");
    },
    handleUpdate(alarmId, alarmStatus, type) {
      let self = this;
      this.$confirm(`是否${type}此条告警?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          await update({ alarmStatus, alarmId });
          self.getRecord();
          self.$message({
            message: "操作成功!",
            type: "success",
            showClose: true,
          });
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "取消操作",
            showClose: true,
          });
        });
    },
    handleChange() {
      // console.log(this.date);
      if (this.date) {
        this.query.startTime = this.date[0];
        this.query.endTime = this.date[1];
      }
      this.getRecord();
    },
    getRecord() {
      let self = this;
      getData(this.query).then((res) => {
        // console.log(res);
        self.tableData = res.data || [];
      });
    },
  },
  created() {},
  mounted() {
    const type = this.$route.query.alarmLevel;
    if (type) {
      this.query.alarmLevel = Number(type);
    }
    this.getRecord();
  },
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
.record {
  padding: 80px 10px 10px 10px;
  height: 100%;
  .record-content {
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
    }
  }
  .table-wrapper {
    height: calc(100% - 65px);
  }
}
</style>
