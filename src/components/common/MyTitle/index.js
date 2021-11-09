import MyTitle from "./MyTitle";

const mytitle = {
  install(vue) {
    vue.component("MyTitle", MyTitle);
  },
};

export default mytitle;
