


type Destroy = () => void;

import type { Directive } from 'vue';

export const lajyAnimate = (el: HTMLElement): Destroy => {

  const ellist = el.querySelectorAll('[data-animated]')
  const getScroll = () => {
    const h = el.offsetHeight
    ellist.forEach((el) => {

      const aData = `animate__${el.getAttribute('data-animated') || ''}`
      const data = el.getBoundingClientRect()

      if ((data.y < h - data.height * 0.5 && data.y > 0 || data.y + data.height < h)) {
        if (!el.classList.value.includes('animate__animated')) {
          el.classList.add(aData, 'animate__animated')
        }
      }

      if (data.y + data.height < 0 || data.y > h) {
        el.classList.remove('animate__animated', aData)

      }
    })
  }


  el.addEventListener('scroll', getScroll)
  window.addEventListener('resize', getScroll)
  getScroll()
  return () => {
    el.removeEventListener('scroll', getScroll)
    window.removeEventListener('resize', getScroll)
  }
}

/**
 * animate.css 元素滚动到视口显示懒加载动画
 * 在需要做监听滚动懒加载动画的元素添加该指令 v-animate;
 * 在需要加动画的子元素添加 data-animated=‘(animate.css动画类型名称)’
 * @example ```html
 * <div v-animate style="overflow-y: auto;height: 100vh">
 *  <div data-animated="fadeIn" style="height: 100vh">item1</div>
 *  <div data-animated="fadeIn" style="height: 100vh">item2</div>
 *  <div>
 *    <div data-animated="fadeIn" style="height: 100vh">item3</div>
 *  </div>
 *  ...
 * </div>
 * ```
 */
export const vAnimate: Directive = {
  updated(el) {
    nextTick(() => {
      if (el?.instance?.ellist) {
        el.instance.ellist = el.querySelectorAll('[data-animated]')
        el?.instance?.getScroll()
      }
    })

  },
  mounted(el) {
    nextTick(() => {
      if (!el.instance) el.instance = {}
      // 获取所有包含数据的子节点
      el.instance.ellist = el.querySelectorAll('[data-animated]')
      // 滚动触发的方法
      el.instance.getScroll = () => {
        const h = el.offsetHeight
        el.instance.ellist.forEach((elc: Element) => {

          const dttr = elc.getAttribute('data-animated')//获取data-*-数据
          const aData = `animate__${dttr || ''}`
          const data = elc.getBoundingClientRect()//获取视口位置
          // 判断出现在视口 时添加类名
          if ((data.y < h - data.height * 0.5 && data.y > 0 || data.y + data.height < h)) {
            if (!elc.classList.value.includes('animate__animated')) {
              elc.classList.add(aData, 'animate__animated')
            }
          }
          // 判断离开视口 时删除类名
          if (data.y + data.height < 0 || data.y > h) {
            elc.classList.remove('animate__animated', aData)
          }
        })
      }
      el.instance.getScroll()
      el.addEventListener('scroll', el.instance.getScroll)
      window.addEventListener('resize', el.instance.getScroll)
    })

  },
  unmounted(el) {
    if (el?.instance?.getScroll) {
      el.addEventListener('scroll', el.instance.getScroll)
      window.addEventListener('resize', el.instance.getScroll)
    }
  }
}

// if (process.client) {}