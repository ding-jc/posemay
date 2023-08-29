
import { useI18n } from 'vue-i18n'





type UseToKey = (
  callback: (key: string, lang: string) => string
) => <T extends Object>(target?: T) => T


/**
 * 根据当前语言状态 根据对象中的callback返回值作为key取值
 * @date 2023-07-28
 * @param callback
 * @example
 * ```ts
 * const { locale } = useI18n()
 * const lang=useToEn((key, lang) => key + '_en')
 * const target={title: '天天向上',title_en: 'Day Day Up'}
 * if(locale.value === 'en') {
 *  lang(target).title  //target.title_en
 * }else{
 *  lang(target).title  //target.title
 * }
 * ```
 */
export const useToKey: UseToKey = (callback) => {
  const { locale } = useI18n()

  return (target) => {
    return new Proxy(target || {}, {
      get(target: any, p: string, receiver) {
        const val = target[callback(p, locale.value)]
        return val ? val : target[p] || '-'
      },
    })
  }
}