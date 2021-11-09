import { createI18n } from 'vue-i18n'

import zh from './zh' 
import en from './en'

const i18n = createI18n({
  // legacy: false, // Composition API 模式
  globalInjection: true, // 全局注册 $t方法
  locale: localStorage.getItem('language') || 'zh',
  messages: {
    zh,
    en,
  },
})

export default i18n