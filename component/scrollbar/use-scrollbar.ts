
export default () => {
  const container = ref<HTMLDivElement>()
  const content = ref<HTMLDivElement>()
  const scrollpx = ref(0)
  const scrollph = ref(0)
  const scrollh = ref(0)
  // let tm: any = null
  if (process.client) {
    onMounted(() => {


      nextTick(() => {
        const el = container.value
        const cel = content.value
        if (!el || !cel) return
        const height = el.clientHeight
        scrollh.value = Math.round(height / (cel.clientHeight / height))
        const monitorScroll = (event: any) => {
          const height = el.clientHeight
          const scr = event.target.scrollTop
          const scrh = event.target.scrollHeight


          const allh = scrh - height
          // 当前滚动位置相当于内容高度百分比
          const percent = ((scr / allh) * 10000) / 100
          // const percent = Math.round(scr / allh * 10000) / 100.00
          scrollpx.value = height / scrh * scr
          scrollph.value = percent
          scrollh.value = Math.round(height / (scrh / height))
        }
        el.addEventListener('scroll', monitorScroll)

      })
    })
  }
  // 给传入的dom设置样式变量
  const setProperty = (el: HTMLElement, scr: number, scrh: number) => {

    const height = el.getBoundingClientRect().height



    // 滚动条当前位置  偏移像素
    el.style.setProperty('--scroll-px', (height / scrh) * scr + 'px')

    // 滚动条位置百分比
    el.style.setProperty('--scroll-ph', ((scr / (scrh - height)) * 10000) / 100 + '%')

    // 滚动滑条长度
    el.style.setProperty('--scroll-btnh', Math.round(height / (scrh / height)) + 'px')
  }
  return {
    container,
    content,
    scrollpx,
    scrollph,
    scrollh,
  }
}