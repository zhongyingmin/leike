<template>
  <div class="header">
    <div class="title-wrapper">
      <div class="logo"></div>
      <div class="title">
        {{ $t(`header.title`) }}
      </div>
    </div>
    <div class="menu-wrapper">
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </div>
    <div class="right-wrapper">
      <div
        style="
          display: flex;
          align-items: center;
          cursor: pointer;"
      >
        <img
          @click="changeLan('zh')"
          v-show="languages == 'EN'"
          src="../../assets/images/en.png"
          alt=""
        />
        <img
          @click="changeLan('en')"
          v-show="languages == 'ZH'"
          src="../../assets/images/zh.png"
          alt=""
        />
        <span style="margin-left: 10px;">{{ languages }}</span>
      </div>
      <div
        style="
          display: flex;
          align-items: center;"
      >
        <div class="tq-icon">
          <img
            v-if="weather.indexOf('晴') != -1"
            src="../../assets/images/qing.png"
            alt=""
          />
          <img
            v-else-if="weather.indexOf('雨') != -1"
            src="../../assets/images/yu.png"
            alt=""
          />
          <img
            v-else-if="weather.indexOf('雪') != -1"
            src="../../assets/images/xue.png"
            alt=""
          />
          <img v-else src="../../assets/images/yun_.png" alt="" />
        </div>
        {{ weather }}
      </div>
      <div class="line"></div>
      <div class="date">
        <div class="nowTime">{{ nowTime }}</div>
        <div class="currentTime">{{ currentTime }}</div>
      </div>
      <div class="line"></div>
      <div
        style="
          display: flex;
          align-items: center;color:#00fee4;"
      >
        <el-avatar
          style="margin-right:10px;"
          :size="40"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <el-dropdown>
          <span class="el-dropdown-link" style="color:#fff;">
            {{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem";
import { wether } from "@/api/wether";
import { getCurrentInstance } from "vue";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
import { ref } from "vue";
export default {
  components: { SidebarItem },
  setup() {
    // 扩展语言
    const { t } = useI18n();
    const { proxy } = getCurrentInstance();
    const languages = ref("ZH");
    function changeLan(type) {
      if (languages.value == "EN") {
        languages.value = "ZH";
      } else {
        languages.value = "EN";
      }
      proxy.$i18n.locale = type;
    }
    console.log(t("message.Home"));
    return { changeLan, languages };
  },
  data() {
    return {
      timerID: "",
      nowTime: "",
      week: "",
      currentTime: "",
      weather: "",
    };
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
    name() {
      return this.$store.getters.name;
    },
  },
  methods: {
    async logout() {
      let that = this;
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.dispatch("user/logout").then(() => {
          that.$router.push("/login");
          // location.href = '/login';
        });
      });
    },
    getDate() {
      let nowTime = new Date();
      let yy = String(nowTime.getFullYear());
      let mm = nowTime.getMonth() + 1;
      let dd = String(
        nowTime.getDate() < 10 ? "0" + nowTime.getDate() : nowTime.getDate()
      );
      this.nowTime = this.timeNum(yy) + "-" + this.timeNum(mm) + "-" + dd;
      // console.log(this.nowTime);
      this.week = "星期" + "日一二三四五六".charAt(nowTime.getDay());
      this.currentTime =
        this.timeNum(nowTime.getHours()) +
        ":" +
        this.timeNum(nowTime.getMinutes()) +
        ":" +
        this.timeNum(nowTime.getSeconds());
    },
    timeNum(num) {
      if (num < 10) {
        return "0" + num;
      }
      return num;
    },
    getWether() {
      const self = this;
      wether().then((res) => {
        // console.log(res);
        self.weather = res.data.weather;
      });
    },
  },
  created() {},
  mounted() {
    this.getWether();
    this.getDate();
    if (this.timerID) {
      clearInterval(this.timerID);
    }
    this.timerID = setInterval(() => {
      this.getDate();
    }, 1000);
    // console.log(this.routes);
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  position: relative;
  z-index: 100;
  // min-width: 1920px;
  height: 55px;
  background: url("../../assets/images/tou.png") no-repeat;
  background-size: 100% 100%;
  padding: 0 30px;
  .title-wrapper {
    display: flex;
    align-items: center;
    padding-left: 10px;
    .logo {
      width: 110px;
      height: 50px;
      background: url("../../assets/images/logo_.png") no-repeat;
      background-size: 100% 100%;
      font-size: 39px;
      margin-right: 20px;
    }
    .title {
      width: 312 px;
      font-size: 24px;
      text-shadow: 0 0 10px #00fee4;
    }
  }
  .menu-wrapper {
    display: flex;
    align-items: center;
    padding: 0 0 0 100px;
    margin-left: 20px;
  }
  .right-wrapper {
    position: absolute;
    right: 30px;
    // margin-left: 30px;
    display: flex;
    height: 55px;
    align-items: center;
    > div {
      margin-right: 20px;
      &:last-of-type {
        margin-right: 0;
      }
    }
    .line {
      width: 4px;
      height: 26px;
      background: url("../../assets/images/line_border.png") no-repeat;
      background-size: 100% 100%;
    }
    .tq-icon {
      width: 30px;
      height: 30px;
      margin-right: 5px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .date {
      display: flex;
      .nowTime {
        margin-right: 8px;
      }
    }
  }
}
</style>
