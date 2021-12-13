import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
//css
import "./assets/styles/index.css";

import mytitle from "./components/common/MyTitle";
import mysearch from "./components/common/MySearch";
import tntervaltext from "./components/common/IntervalText";

import colorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

import locale from "element-plus/lib/locale/lang/zh-cn";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import fun from "./funciton";

import "@/permission.js";
import store from "./store";

import VueI18n from './language/i18n'

import Emitter from "tiny-emitter";

const emitter = new Emitter();

const app = createApp(App).use(store);
app.config.globalProperties.emitter = emitter;
app.use(colorPicker);
app.use(router);
app.use(ElementPlus, { locale });
app.use(mytitle);
app.use(fun);
app.use(VueI18n)
app.use(mysearch);
app.use(tntervaltext);
app.mount("#app");
