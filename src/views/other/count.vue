<template>
  <div class="count"></div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
    };
  },
  watch: {},
  computed: {
      mapState() {
        return this.$store.getters.status;
      },},
  methods: {},
  created() {},
  // eslint-disable-next-line no-unused-vars
  beforeRouteLeave(to, from, next) {
    this.$sendIframe("removeMeasure", "");
    next();
  },
  mounted() {
    let self = this;
    if (this.mapState) {
      this.$sendIframe("measureTool", "volume");
    } else {
      this.$loadMap(() => {
        setTimeout(() => {
          self.$sendIframe("measureTool", "volume");
        }, 500);
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.count{}
</style>