<template>
  <div class="handle">
    <div class="table-wrapper">
      <div class="head">
        <div>日志编号</div>
        <div>系统模块</div>
        <div>操作类型</div>
        <div>操作人员</div>
        <div>主机</div>
        <div>操作状态</div>
        <div>操作时间</div>
      </div>
      <div
        class="body"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
      >
        <div class="coll" v-for="(data, index) in tableData" :key="index">
          <div>{{ data.operId }}</div>
          <div>{{ data.title }}</div>
          <div>
            <div v-if="data.businessType == 1">新增</div>
            <div v-if="data.businessType == 2">修改</div>
            <div v-if="data.businessType == 3">删除</div>
            <div v-if="data.businessType == 4">授权</div>
            <div v-if="data.businessType == 5">导出</div>
            <div v-if="data.businessType == 6">导入</div>
            <div v-if="data.businessType == 7">强退</div>
            <div v-if="data.businessType == 8">生成代码</div>
            <div v-if="data.businessType == 9">清空数据</div>
            <div v-if="data.businessType == 10">查询</div>
            <div v-else>其他</div>
          </div>
          <div>{{ data.operName }}</div>
          <div>{{ data.operIp }}</div>
          <div>
            <div v-if="data.status == 0">成功</div>
            <div v-if="data.status == 1">失败</div>
            <div v-else>其他</div>
          </div>
          <div>{{ data.operTime }}</div>
        </div>
        <p v-if="loading" :style="{ textAlign: 'center'}">加载中...</p>
        <p v-if="noMore" :style="{ textAlign: 'center' }">没有更多了</p>
      </div>
    </div>
  </div>
</template>

<script>
import { oper } from "@/api/other/log";
export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      query: {
        pageSize: 10,
        pageNum: 1,
        orderByColumn: "operTime",
        isAsc: "desc",
      },
      total: 0,
      count: 0,
      loading: false,
    };
  },
  watch: {},
  computed: {
    noMore() {
      return this.count >= this.total;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    load() {
      this.query.pageNum++;
      this.getList();
    },
    paramsToFormData(obj) {
      const formData = new FormData();
      Object.keys(obj).forEach((key) => {
        if (obj[key] instanceof Array) {
          obj[key].forEach((item) => {
            formData.append(key, item);
          });
          return;
        }
        formData.append(key, obj[key]);
      });
      return formData;
    },
    getList() {
      let self = this;
      this.loading = true;
      oper(self.paramsToFormData(self.query)).then((res) => {
        if (res.rows && res.rows.length) {
          self.tableData = self.tableData.concat(res.rows);
          self.total = res.total;
          self.count += res.rows.length;
        }
        self.loading = false;
      });
    },
  },
  created() {
    this.getList();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.handle {
  width: 100%;
  height: 100%;
  .table-wrapper {
    height: calc(100% - 20px);
  }
}
</style>
