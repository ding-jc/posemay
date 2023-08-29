import { createI18n } from 'vue-i18n';
import en from '../lang/en';
import zh from '../lang/zh';


export default defineNuxtPlugin((nuxtApp) => {
  const Cookie = useCookie('lang');
  //这里使用了内置api  可以快速设置获取cookie   当然这里也可以设置在localStorage中使用 不使用useCookie
  Cookie.value ??= 'zh'
  const i18n = createI18n({
    legacy: false,//使用vue3组合式API时必须设置为FALSE
    locale: Cookie.value || 'zh',
    fallbackLocale: 'zh', // set fallback locale
    messages: {
      zh,
      en,
    },
    globalInjection: true,//全局注入$t函数
  })
  nuxtApp.vueApp.use(i18n)
  nuxtApp.vueApp.config.globalProperties.$lang = useToKey((key, lang) => key + '_' + lang)

});


export const useToKey: UseToKey = (callback) => {
  const locale = useCookie('lang');
  return (target) => {
    return new Proxy(target || {}, {
      get(target: any, p: string, receiver) {
        const val = target[callback(p, locale.value || '')]
        return val ? val : target[p] || ''
      },
    })
  }
}

type UseToKey = ((
  callback: (key: string, lang: string) => string
) => <T extends Object>(target?: T) => T)

