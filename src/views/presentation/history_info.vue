<template>
  <div class="history_info">
    <div class="history_info-content">
      <div class="header-wrapper">
        <div class="left">
          <span>
            历史详情
          </span>
        </div>
        <div class="right"></div>
      </div>
      <div class="table-wrapper">
        <div class="head">
          <div>形变值</div>
          <div>速度值</div>
          <div>加速度值</div>
          <div>时间</div>
          <div>经度</div>
          <div>纬度</div>
        </div>
        <div class="body">
          <div class="coll" v-for="(data, index) in tableData" :key="index">
            <div>{{ data.xbvalue }}</div>
            <div>{{ data.xbspeed }}</div>
            <div>{{ data.xbaccelerated }}</div>
            <div>{{ data.xbtime }}</div>
            <div>{{ data.lng }}</div>
            <div>{{ data.lat }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPointData } from "@/api/history";
export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      pid: "",
      query: {
        name: "",
        dataType: "",
      },
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
    };
  },
  watch: {},
  computed: {},
  methods: {
    getSense() {
      let self = this;
      getPointData({ id: this.pid }).then((res) => {
        // console.log(res);
        self.tableData = res.data;
      });
    },
  },
  created() {
    this.pid = this.$route.query.id;
    if (this.pid) {
      this.getSense();
    }
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.history_info {
  padding: 80px 10px 10px 10px;
  height: 100%;
  .history_info-content {
    height: 100%;
    border: 1px solid #32f1b4;
    background: rgba(0, 0, 0, 0.4);
    padding: 40px 60px;
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
    height: 780px;
  }
}
</style>
