<template>
  <div class="app-container">
    <Header />
    <app-main />
    <my-map />
    <div class="bg"></div>
  </div>
</template>

<script>
import { AppMain, Header, MyMap } from "./components";
import { draws } from "@/api/map";
import {
  query,
  getWbdata,
  getTerrainData,
  getOtherTerrainData,
  getTifData
} from "@/api/user";
import { getConfig } from "@/api/user";
import { toRaw } from "@vue/reactivity";
export default {
  components: { AppMain, Header, MyMap },
  props: {},
  data() {
    return {
      state: false,
    };
  },
  watch: {},
  computed: {
    token() {
      return this.$store.getters.token;
    },
  },
  methods: {
    handleUpdate(type) {
      this.$sendIframe("layer", {
        type,
        data: this.form,
      });
    },
    handleColor(row) {
      let dataItem = row;
      let data = {};
      for (const key in dataItem) {
        data[key] = toRaw(dataItem[key]);
      }
      this.$sendIframe("updateColor", data);
    },
    timeOut(config) {
      // new Date().setHours(a[0],a[1])-new Date().getTime()<30000&&new Date().getTime()-new Date().setHours(a[0],a[1])<30000
      const reportconfig = config.reportconfig;
      if (reportconfig) {
        if (reportconfig.status == 0) {
          const timing = reportconfig.time;
          const a = timing.split(":");
          if (
            new Date().setHours(a[0], a[1]) - new Date().getTime() < 30000 &&
            new Date().getTime() - new Date().setHours(a[0], a[1]) < 30000
          ) {
            this.$router.push({ name: "Report", query: { state: 1 } });
          }
        }
      }
    },
    getUserConfig() {
      let self = this;
      getConfig().then((res) => {
        if (self.state) {
          if (JSON.stringify(res.config) != "{}") {
            self.timeOut(res.config);
          }
        } else {
          self.$store.dispatch("user/updateConfig", res.config);
          // console.log(res);
          if (JSON.stringify(res.config) != "{}") {
            self.timeOut(res.config);
            let data = JSON.parse(res.config.jsonStr);
            // console.log(data);
            self.$sendIframe("userConfig", data);
          }
          self.state = true;
        }
      }).catch(()=>{
        const res=require("../assets/json/index.json")
        if (self.state) {
          if (JSON.stringify(res.config) != "{}") {
            self.timeOut(res.config);
          }
        } else {
          self.$store.dispatch("user/updateConfig", res.config);
          // console.log(res);
          if (JSON.stringify(res.config) != "{}") {
            self.timeOut(res.config);
            let data = JSON.parse(res.config.jsonStr);
            // console.log(data);
            self.$sendIframe("userConfig", data);
          }
          self.state = true;
        }
      });
    },
  },
  created() {},
  mounted() {
    // console.log(this.token)
    let self = this;
    this.$loadMap(() => {
      // console.log(self.token)
      self.$store.dispatch("user/updateStatus", true);
      self.$sendIframe("token", self.token);
      draws().then((res) => {
        // console.log(res);
        const data = res.data;
        const checked = data
          .filter((data) => {
            return data.status == 1 ? true : false;
          })
          .map((data) => data.id);
        self.$store.dispatch("user/updateChecked", checked);
        self.$sendIframe("initData", data);
      });
      query().then((res) => {
        // console.log(res)
        self.$sendIframe("position", res.data);
      });
      getWbdata().then((res) => {
        self.$sendIframe("Wbdata", {
          url: `${window.customENV.baseURL}data/${res.tilesetlayerurl}`,
          position: res.tilesetlayerposition,
        });
      });
      getTerrainData().then((res) => {
        self.$sendIframe("TerrainData", res);
      });
      getOtherTerrainData().then((res) => {
        self.$sendIframe("OtherTerrainData", res);
      });
      getTifData().then((res)=>{
        self.$sendIframe("getTifData", res);
      })
      self.getUserConfig();
      setInterval(() => {
        self.getUserConfig();
      }, 1000 * 60);
    });
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100vh;
  // width: 1920px;
  // height: 1080px;
  background-color: #fff;
  // overflow: hidden;
  .bg {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("../assets/images/bg.png") no-repeat;
    background-size: 100% 100%;
    pointer-events: none;
  }
}
</style>
