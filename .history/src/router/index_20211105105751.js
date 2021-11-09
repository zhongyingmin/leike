import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout";
import Home from "@/views/terrain/home";

const routes = [
  {
    path: "/",
    redirect: "/terrain",
    hidden: true,
  },
  {
    path: "/map",
    component: Layout,
    redirect: "/map/point",
    name: "MapAction",
    meta: { title: "地图动作" },
    children: [
      {
        path: "point",
        name: "Point",
        component: () => import("@/views/map/action"),
        props: { type: "point", updated: false },
        meta: { title: "点位" },
      },
      {
        path: "line",
        name: "Line",
        component: () => import("@/views/map/action"),
        props: { type: "line", updated: false },
        meta: { title: "画线" },
      },
      {
        path: "area",
        name: "Area",
        component: () => import("@/views/map/action"),
        props: { type: "area", updated: false },
        meta: { title: "画面" },
      },
      {
        path: "point/edit",
        name: "pointEdit",
        component: () => import("@/views/map/action"),
        props: { type: "point", updated: true },
        meta: { title: "点位编辑" },
      },
      {
        path: "line/edit",
        name: "lineEdit",
        component: () => import("@/views/map/action"),
        props: { type: "line", updated: true },
        meta: { title: "画线编辑" },
      },
      {
        path: "area/edit",
        name: "areaEdit",
        component: () => import("@/views/map/action"),
        props: { type: "area", updated: true },
        meta: { title: "画面编辑" },
      },
      {
        path: "analytical",
        name: "Analytical",
        component: () => import("@/views/map/index"),
        meta: { title: "三维分析" },
      },
    ],
    hidden: true,
  },
  {
    path: "/terrain",
    component: Layout,
    redirect: "/terrain/home",
    name: "Terrain",
    meta: { title: "terrain" },
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
        meta: { title: "首页" },
      },
      {
        path: "graphic",
        name: "Graphic",
        component: () => import("@/views/terrain/graphic"),
        meta: { title: "已选列表" },
      },
      {
        path: "shielding",
        name: "Shielding",
        component: () => import("@/views/terrain/shielding"),
        meta: { title: "区域屏蔽" },
      },
      {
        path: "layer",
        name: "layer",
        component: () => import("@/views/terrain/layer"),
        meta: { title: "图层选择" },
      },
    ],
  },
  {
    path: "/presentation",
    component: Layout,
    redirect: "/presentation/deformation",
    name: "Presentation",
    meta: { title: "presentation" },
    children: [
      {
        path: "deformation",
        name: "Deformation",
        component: () => import("@/views/presentation/deformation"),
        meta: { title: "边坡雷达" },
      },
      {
        path: "sense",
        name: "Sense",
        component: () => import("@/views/presentation/sense"),
        meta: { title: "其他传感器" },
      },
      {
        path: "history",
        name: "History",
        component: () => import("@/views/presentation/history"),
        meta: { title: "历史查询" },
      },
      {
        path: "historyInfo",
        name: "HistoryInfo",
        component: () => import("@/views/presentation/history_info"),
        meta: { title: "历史详情" },
        hidden: true,
      },
    ],
  },
  {
    path: "/warning",
    component: Layout,
    name: "Warning",
    meta: { title: "warning" },
    children: [
      {
        path: "global",
        name: "Global",
        component: () => import("@/views/warning/global"),
        meta: { title: "全局预警" },
      },
      {
        path: "local",
        name: "Local",
        component: () => import("@/views/warning/local/index"),
        meta: { title: "局部预警" },
      },
      {
        path: "local/edit",
        name: "LocalEdit",
        component: () => import("@/views/warning/local/edit"),
        meta: { title: "局部预警编辑" },
        props: { updated: true },
        hidden: true,
      },
      {
        path: "local/Create",
        name: "LocalCreate",
        component: () => import("@/views/warning/local/edit"),
        meta: { title: "局部预警新增" },
        props: { updated: false },
        hidden: true,
      },
      {
        path: "level",
        name: "Level",
        component: () => import("@/views/warning/level/index"),
        meta: { title: "预警等级设置" },
      },
      {
        path: "clear",
        name: "Clear",
        component: () => import("@/views/warning/clear"),
        meta: { title: "预警解除" },
      },
      {
        path: "record",
        name: "Record",
        component: () => import("@/views/warning/record"),
        meta: { title: "预警历史" },
      },
    ],
  },
  {
    path: "/other",
    component: Layout,
    name: "Other",
    meta: { title: "other" },
    children: [
      {
        path: "deviceInfo",
        name: "DeviceInfo",
        component: () => import("@/views/other/deviceInfo"),
        meta: { title: "设备信息" },
      },
      {
        path: "logRecord",
        name: "LogRecord",
        component: () => import("@/views/other/logRecord/index"),
        meta: { title: "日志记录", role: 1 },
      },
      {
        path: "report",
        name: "Report",
        component: () => import("@/views/other/report"),
        meta: { title: "生成报告" },
      },
      {
        path: "count",
        name: "Count",
        component: () => import("@/views/other/count"),
        meta: { title: "土方量计算" },
      },
      {
        path: "export",
        name: "Export",
        component: () => import("@/views/other/export"),
        meta: { title: "CAD数据导出" },
      },
      {
        path: "produce",
        name: "Produce",
        component: () => import("@/views/other/produce"),
        meta: { title: "断面生成" },
      },
      {
        path: "flight",
        name: "Flight",
        component: () => import("@/views/other/flight"),
        meta: { title: "飞行功能" },
      },
      {
        path: "output",
        name: "Output",
        component: () => import("@/views/other/output"),
        meta: { title: "编码输出" },
      },
      {
        path: "external",
        name: "External",
        component: () => import("@/views/other/external"),
        meta: { title: "外部数据导入", role: 1 },
      },
      {
        path: "tailor",
        name: "Tailor",
        component: () => import("@/views/other/tailor"),
        meta: { title: "数据裁剪" },
      },
      {
        path: "change",
        name: "Change",
        component: () => import("@/views/other/change"),
        meta: { title: "坐标转换" },
      },
    ],
  },
  {
    path: "/user",
    component: Layout,
    name: "User",
    redirect: "/user/index",
    meta: { title: "user", role: 1 },
    children: [
      {
        path: "index",
        name: "UserManage",
        component: () => import("@/views/user/index"),
        meta: { title: "用户管理" },
      },
    ],
  },
  {
    path: "/platform",
    component: Layout,
    name: "Platform",
    meta: { title: "platform" },
    children: [
      {
        path: "index",
        name: "Introduce",
        component: () => import("@/views/platform/index"),
        meta: { title: "平台介绍" },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index"),
    meta: { title: "登录" },
    hidden: true,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/register/index"),
    meta: { title: "注册" },
    hidden: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
