import { createI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler.js'; //引入vue-i18n组件
import messages from "./index";

const i18n = createI18n({
  // 定义的语言 
  locale: 'ch',
  // 引入各种不同的配置，可直接写在这里
  messages: messages,
  // 调用方法
  $t(key) {
    return this.messages[this.locale.value][key];
  }
})
export default i18n
