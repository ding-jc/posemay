import Scrollbar from './Scrollbar.vue';

import type { App } from 'vue';


export const scrollbar = (app: App) => {
  app.directive('scrollbar', {
    mounted(el: HTMLElement, d, opts) {
      if (process.client) {
        const div = document.createElement('div')
        el.appendChild(div)

        createApp(h(Scrollbar, { size: 20 })).mount(div)

      }

      nextTick(() => {
        const monitorScroll = (event: any) => {
          const height = el.clientHeight
          const scr = event.target.scrollTop
          const scrh = event.target.scrollHeight
          const allh = scrh - height
          // 当前滚动位置相当于内容高度百分比
          const percent = scr / allh * 10000 / 100
          // const percent = Math.round(scr / allh * 10000) / 100.00
          el.style.setProperty('--scroll-ph', percent + '%')
          el.style.setProperty('--scroll-px', height * (percent / 100) + 'px')




        }
        el.addEventListener('scroll', monitorScroll)
        el.style.setProperty('--scroll', '0%')
      })
    }


  })




}