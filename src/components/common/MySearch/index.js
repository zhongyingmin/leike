import MySearch from "./MySearch.vue";

const mysearch = {
  install(vue) {
    vue.component("MySearch", MySearch);
  },
};

export default mysearch;
