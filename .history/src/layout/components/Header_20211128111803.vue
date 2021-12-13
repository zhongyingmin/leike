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
      <!-- <div
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
      </div> -->

      <el-dropdown @command="handleCommand" trigger="click">
        <span class="el-dropdown-link">
          {{languages}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="data in languages_item"
              :key="data.value"
              :command="data.value"
              >{{ data.label }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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
              <el-dropdown-item @click="toPersonal">{{
                $t("personal")
              }}</el-dropdown-item>
              <el-dropdown-item @click="logout">{{
                $t("logout")
              }}</el-dropdown-item>
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
import { setConfig } from "@/api/user";
import { ElMessage } from "element-plus";
// import { useI18n } from "vue-i18n"; //要在js中使用国际化
import { ref, reactive } from "vue";
export default {
  components: { SidebarItem },
  setup() {
    // 扩展语言
    // const { t } = useI18n();
    const { proxy } = getCurrentInstance();
    let languages_item = reactive(window.customENV.language);
    const languages = ref("ZH");
    proxy.$loadMap(() => {
      setTimeout(() => {
        // console.log(proxy.$store.getters.userConfig);
        const config = proxy.$store.getters.userConfig;
        // if (config.languages) {
        //   if (config.languages == "zh") {
        //     languages.value = "ZH";
        //   } else {
        //     languages.value = "EN";
        //   }
        //   proxy.$i18n.locale = config.languages;
        // }
        handleCommand(config.languages, 1);
      }, 500);
    });
    // function changeLan(type) {
    //   if (languages.value == "EN") {
    //     languages.value = "ZH";
    //   } else {
    //     languages.value = "EN";
    //   }
    //   proxy.$i18n.locale = type;
    //   setConfig({ languages: type }).then(() => {
    //     // console.log(res);
    //     ElMessage({
    //       message: "操作成功!",
    //       type: "success",
    //       showClose: true,
    //     });
    //   });
    // }
    function handleCommand(command, state) {
      languages.value = "EN";
      let lang = languages_item.filter((data) => data.value == command);
      // console.log(lang)
      if (lang && lang.length) {
        languages.value = lang[0].label;
        proxy.$i18n.locale = lang[0].value;
        if (state != 1) {
          setConfig({ languages: lang[0].value }).then(() => {
            // console.log(res);
            ElMessage({
              message: "操作成功!",
              type: "success",
              showClose: true,
            });
          });
        }
      }
    }
    // console.log(t("message.Home"));
    return { handleCommand, languages, languages_item };
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
    toPersonal() {
      this.$router.push({ name: "Personal" });
    },
    async logout() {
      // let that = this;
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.dispatch("user/logout").then(() => {
          location.reload();
          // that.$router.push("/login");
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
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
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
      width: 312px;
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
