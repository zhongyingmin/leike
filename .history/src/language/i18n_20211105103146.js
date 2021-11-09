//语言
import { createI18n } from 'vue-i18n'		//引入vue-i18n组件
  //注册i8n实例并引入语言文件
 const i18n = createI18n({
    locale: 'ch',		//默认显示的语言 可以使用sessionStorage.getItem('lang') || 'zh',
      messages: {
        ch:require('./ch.js'),	//索引语言文件
        en:require('./en.js')
      },
      globalInjection:true,
    //   silentTranslationWarn: true		//禁止打印警告信息
  })

  export default i18n;