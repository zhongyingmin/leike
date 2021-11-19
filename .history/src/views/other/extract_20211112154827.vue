<template>
  <div class="extract"></div>
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
      this.$sendIframe("altsByPoly", "");
    } else {
      this.$loadMap(() => {
        setTimeout(() => {
          self.$sendIframe("altsByPoly", "");
        }, 500);
      });
    }
  },
};
</script>
