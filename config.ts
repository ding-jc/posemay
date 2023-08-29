
import configJSON from './assets/config.json';


export const config: ConfigType = configJSON as any

export type ConfigType = {

  logoText: string,
  logoText_en: string,

  /**导航 */
  navbar: {
    path: string;
    name: string;
  }[]

  /**首页 */
  index: {
    /**首页轮播图链接 */
    banner: string[]
    /**首页文案介绍 */
    text: {
      title: string
      subhead: string
      introductory: string
    }
  }
  footer: {
    list1: {
      name: string
      name_en: string
      text: string
      text_en: string
      url: string
    }[],
    list2: {
      icon: string
      img: string
      name: string
      name_en: string
      hover: boolean
      url: string
      show?: 'icon' | 'img'
    }[]
  }

}



/**展示模块 */
export type ExhibitionModules = (
  | Banner
  // 轮播图
  | Slideshow
  // 卡片
  | Card
  // 文字说明
  | {
    type: 'writing'
    button: {
      href: string
      value: string
    }

  }
  // 产品展示详情
  | {
    type: 'product'

  }
) & ModuleConfig

export type ModuleConfig = {
  /**填充 100vw 100vh ,等宽 100vw 100vw*/
  layout: 'fill' | 'aequilate' | `${string},${string}`
  padding: string,
  title: string
  title_en: string

}

/**轮播图 幻灯片 */
export type Slideshow = {
  type: 'slideshow'
  /**轮播图显示效果 */
  effect: 'slide' | 'fade' | 'card'
  /**轮播图 */
  img: {
    /**图片路径 */
    url: string
    /**点击轮播图跳转链接 */
    href: string
  }[]
  /**设置圆角 */
  radius: boolean
}



/**轮播图 幻灯片 */
export type Card = {

  type: 'card'
  column: number
  title: string
  /**设置阴影*/
  shadow: boolean /**设置圆角 */
  radius: boolean
  cardlist: (ImageConfig | TextConfig)[]
}
/**图片展示 */
export type ImageConfig = {
  type: 'image'
  column: number
  /**设置圆角 */
  radius: boolean
  /**轮播图显示效果 */
  effect: 'slide' | 'fade' | 'card'
  title: string
  shadow: boolean
  padding: string
  animated: string
  /**图片展示 */
  card: {
    title: string
    padding: string
    /**图片展示  多张时以轮播图展示*/
    img: {
      /**图片路径 */
      url: string
      /**点击轮播图跳转链接 */
      href: string
      /**图片上方文案 */
      text: string | TextList
    }[]
  }[]
}

export type TextConfig = {
  type: 'text'
  column: number
  /**设置圆角 */
  radius: boolean
  /**设置阴影*/
  shadow: boolean
  list: {
    animated: string
    /**文字大小倍数 */
    size: number
    /**标题 */
    title: string
    /**边距 */
    padding: string
    /**小标题 */
    subhead: string
    /**内容 */
    introductory: string
  }[]

}

export type TextList = {
  tag: 'h1' | 'h2' | 'h3' | 'h4'
  value: string
  algin: 'center' | 'right' | 'left'
}[]


export type Banner = {
  type: 'banner'


}