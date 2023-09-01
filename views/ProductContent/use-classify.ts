
import exhibitionJSON from '../../assets/product.json'

export type Exhibition = {
  name: string
  name_en?: string
  introduce: string
  introduce_en?: string
  img?: string[]
  key?: symbol
  classify?: string[]
  classify_en?: string[]
  url?: string
  tag?: string[]
  tag_en?: string[]
}[]

export type ClassifyExhibition = {
  name: string
  name_en: string
  conunt: number,//统计每个分类分产品个数
  data: Exhibition
}[]

export default () => {
  const classifyExhibition = ref<ClassifyExhibition>([])

  const tagLabel = ref<{
    name: string
    name_en: string
  }[]>([])
  // 中文标签
  let tag: string[] = []
  // 中文分类
  let arrs: string[] = []
  // 英文分类
  let arrs_en: string[] = []
  // 全部列表
  let all: Exhibition = []
  // 保存分类的列表
  const classifyMap = new Map<string, Exhibition>()
  const num = new Map<string, number>()//统计每个分类分产品个数
  // 设置第一个全部
  classifyMap.set('全部', [])
  exhibitionJSON.forEach(v => {
    const data = {
      ...v,
      name: v.name,
      introduce: v.introduce,
      img: v.img ? [...v.img] : [],
      classify: v.classify ? [...v.classify] : [],
      url: v.url,
      tag: v.tag ? [...v.tag] : [],
    }
    // 获取分类 并添加每一项到Map中
    if (v.classify && v.classify?.length) {
      v.classify.forEach((ci, index) => {
        if (!arrs.includes(ci)) {
          arrs.push(ci)
          arrs_en.push(v.classify_en?.[index] || ci)

        }
        const conunt = num.get(ci) || 0
        num.set(ci, conunt + 1)
        const ob = classifyMap.get(ci) || []
        classifyMap.set(ci, [...ob, { ...data, key: Symbol(ci) }])
      })
    } else {
      if (!arrs.includes('其它')) {
        arrs.push('其它')
        arrs_en.push('other')

      }
      const conunt = num.get('其它') || 0
      num.set('其它', conunt + 1)
      const ob = classifyMap.get('其它') || []
      classifyMap.set('其它', [...ob, { ...data, key: Symbol('其它') }])
    }
    const conunt = num.get('全部') || 0
    num.set('全部', conunt + 1)
    all.push({ ...data, key: Symbol('全部') })

    // 获取标签
    if (v.tag && v.tag?.length) {
      v.tag.forEach((ic, index) => {
        if (!tag.includes(ic)) {
          tag.push(ic);
          tagLabel.value.push(
            {
              name: ic,
              name_en: v.tag_en?.[index] || ic
            }
          )
        }
      })
    }
  })

  tagLabel.value.push(
    {
      name: '其它',
      name_en: 'other'
    }
  )
  classifyMap.set('全部', all)
  arrs.unshift('全部')
  arrs_en.unshift('all')
  // 把数据保存到响应式对象
  arrs.forEach((value, index) => {
    const data = classifyMap.get(value)
    classifyExhibition.value.push({
      name: value,
      name_en: arrs_en[index] || value,
      conunt: num.get(value) || 0,
      data: data || [],
    })
  })
  return {

    classifyExhibition,
    tagLabel

  }
}