import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout";
// import Home from "@/views/terrain/home";

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
        component: () => import("@/views/terrain/home"),
        meta: { title: "terrainHome" },
      },
      {
        path: "graphic",
        name: "Graphic",
        component: () => import("@/views/terrain/graphic"),
        meta: { title: "terrainGraphic" },
      },
      {
        path: "shielding",
        name: "Shielding",
        component: () => import("@/views/terrain/shielding"),
        meta: { title: "terrainShielding" },
      },
      {
        path: "layer",
        name: "layer",
        component: () => import("@/views/terrain/layer"),
        meta: { title: "terrainLayer" },
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
        meta: { title: "deformation" },
      },
      {
        path: "sense",
        name: "Sense",
        component: () => import("@/views/presentation/sense"),
        meta: { title: "sense" },
      },
      {
        path: "history",
        name: "History",
        component: () => import("@/views/presentation/history"),
        meta: { title: "history" },
      },
      {
        path: "historyInfo",
        name: "HistoryInfo",
        component: () => import("@/views/presentation/history_info"),
        meta: { title: "historyInfo" },
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
        meta: { title: "warningGlobal" },
      },
      {
        path: "local",
        name: "Local",
        component: () => import("@/views/warning/local/index"),
        meta: { title: "warningLocal" },
      },
      {
        path: "local/edit",
        name: "LocalEdit",
        component: () => import("@/views/warning/local/edit"),
        meta: { title: "warningLocalEdit" },
        props: { updated: true },
        hidden: true,
      },
      {
        path: "local/Create",
        name: "LocalCreate",
        component: () => import("@/views/warning/local/edit"),
        meta: { title: "warningLocalCreate" },
        props: { updated: false },
        hidden: true,
      },
      {
        path: "level",
        name: "Level",
        component: () => import("@/views/warning/level/index"),
        meta: { title: "warningLevel" },
      },
      {
        path: "clear",
        name: "Clear",
        component: () => import("@/views/warning/clear"),
        meta: { title: "warningClear" },
      },
      {
        path: "record",
        name: "Record",
        component: () => import("@/views/warning/record"),
        meta: { title: "warningRecord" },
      },
      {
        path: "audio",
        name: "audio",
        component: () => import("@/views/warning/audio"),
        meta: { title: "warningAudio" },
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
        meta: { title: "deviceInfo" },
      },
      {
        path: "logRecord",
        name: "LogRecord",
        component: () => import("@/views/other/logRecord/index"),
        meta: { title: "logRecord", role: 1 },
      },
      {
        path: "report",
        name: "Report",
        component: () => import("@/views/other/report"),
        meta: { title: "report" },
      },
      {
        path: "count",
        name: "Count",
        component: () => import("@/views/other/count"),
        meta: { title: "count" },
      },
      {
        path: "export",
        name: "Export",
        component: () => import("@/views/other/export"),
        meta: { title: "shapeExport" },
      },
      {
        path: "produce",
        name: "Produce",
        component: () => import("@/views/other/produce"),
        meta: { title: "produce" },
      },
      {
        path: "flight",
        name: "Flight",
        component: () => import("@/views/other/flight"),
        meta: { title: "flight" },
      },
      {
        path: "output",
        name: "Output",
        component: () => import("@/views/other/output"),
        meta: { title: "output" },
      },
      {
        path: "external",
        name: "External",
        component: () => import("@/views/other/external"),
        meta: { title: "external", role: 1 },
      },
      {
        path: "tailor",
        name: "Tailor",
        component: () => import("@/views/other/tailor"),
        meta: { title: "tailor" },
      },
      {
        path: "convert",
        name: "Change",
        component: () => import("@/views/other/convert"),
        meta: { title: "convert" },
      },
      {
        path: "extract",
        name: "Extract",
        component: () => import("@/views/other/extract"),
        meta: { title: "extractElevation" },
      }
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
        meta: { title: "UserManage" },
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
        meta: { title: "Introduce" },
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
