
import type { Directive } from 'vue';

import { itemKey, prductItem, rect, show } from './use-store';



export const vClick: Directive = {
  mounted(el, binding: any) {
    const data = rect()
    const isshow = show()
    const iKey = itemKey()
    const pItem = prductItem()
    nextTick(() => {
      if (!el.instance) el.instance = {}
      el.instance.setStyle = () => {
        if (iKey.value !== binding.value.key) return
        const img = el.querySelector('.product-list-item-content-image')
        const title = el.querySelector('.product-list-item-content-title')
        const { x: boxX, y: boxY, width: boxWidth, height: boxHeight } = el.getBoundingClientRect()
        const { x: imageX, y: imageY, width: imageWidth, height: imageHeight } = img.getBoundingClientRect()
        const { x: titleX, y: titleY, width: titleWidth, height: titleHeight } = title.getBoundingClientRect()
        data.value = {
          imageWidth,
          imageHeight,
          imageX,
          imageY,
          titleWidth,
          titleHeight,
          titleX,
          titleY,
          boxWidth,
          boxHeight,
          boxX,
          boxY,
        }

      }

      el.instance.click = (e: Event) => {
        pItem.value = binding.value
        iKey.value = binding.value.key
        el.instance.setStyle()
        nextTick(() => {
          isshow.value = true
        })

      }
      el.addEventListener('click', el.instance.click)
      el.addEventListener('resize', el.instance.setStyle)
      window.addEventListener('resize', el.instance.setStyle)
    })

  },
  unmounted(el) {
    nextTick(() => {
      el?.instance.click && el.removeEventListener('click', el.instance.click)
      el?.instance.setStyle && el.removeEventListener('resize', el.instance.setStyle)
      el?.instance.setStyle && window.removeEventListener('resize', el.instance.setStyle)

    })
  }
}
