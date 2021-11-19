<template>
  <div class="login">
    <div class="table-wrapper">
      <div class="head">
        <div>{{$t('log.LoginId')}}</div>
        <div>{{$t('log.LoginName')}}</div>
        <div>{{$t('log.LoginAddress')}}</div>
        <div>{{$t('log.browser')}}</div>
        <div>{{$t('log.system')}}</div>
        <div>{{$t('log.HandleInfo')}}</div>
        <div>{{$t('log.LoginTime')}}</div>
      </div>
      <div
        class="body"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
      >
        <div class="coll" v-for="(data, index) in tableData" :key="index">
          <div>{{ data.infoId }}</div>
          <div>{{ data.loginName }}</div>
          <div>{{ data.ipaddr }}</div>
          <div>{{ data.browser }}</div>
          <div>{{ data.os }}</div>
          <div v-bind:title="data.msg">{{ data.msg }}</div>
          <div>{{ data.loginTime }}</div>
        </div>
        <p v-if="loading" :style="{ textAlign: 'center' }">加载中...</p>
        <p v-if="noMore" :style="{ textAlign: 'center' }">没有更多了</p>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/other/log";
export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      query: {
        pageSize: 10,
        pageNum: 1,
        orderByColumn: "loginTime",
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
      login(self.paramsToFormData(self.query)).then((res) => {
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
.login {
  width: 100%;
  height: 100%;
  .table-wrapper {
    height: calc(100% - 20px);
  }
}
</style>
