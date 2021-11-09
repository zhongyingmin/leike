<template>
  <div class="tailor"></div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    mapState() {
      return this.$store.getters.status;
    },
  },
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
      this.$sendIframe("measureTool", "terrainPlanClip");
    } else {
      this.$loadMap(() => {
        setTimeout(() => {
          self.$sendIframe("measureTool", "terrainPlanClip");
        }, 500);
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.tailor {
}
</style>
