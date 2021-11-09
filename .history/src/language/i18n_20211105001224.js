import { createI18n } from 'vue-i18n' //引入vue-i18n组件
import messages from './index'
const language = (
  (navigator.language ? navigator.language : navigator.userLanguage) || "ch"
).toLowerCase();
const i18n = createI18n({
  fallbackLocale: 'ch',
  globalInjection:true,
  legacy: false, // you must specify 'legacy: false' option
  locale: language.split("-")[0] || "ch",
  silentTranslationWarn: true,
  messages,
});

export default i18n