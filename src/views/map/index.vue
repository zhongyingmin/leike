<template>
  <div class="map-wrapper"></div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  // eslint-disable-next-line no-unused-vars
  beforeRouteLeave(to, from, next) {
    // next()
    let self = this;
    this.$confirm("是否要退出分析功能?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    })
      .then(async () => {
        self.$sendIframe("removeMeasure", "");
        next();
      })
      .catch(() => {});
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.map-wrapper {
}
</style>
