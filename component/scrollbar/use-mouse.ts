
export default (container: Ref<HTMLElement | undefined>,) => {

  const scrolltrack = ref<HTMLDivElement>()
  const sbtn = ref<HTMLDivElement>()
  const down = ref(false)
  let downy = 0//按下位置

  // 鼠标按下
  const mousedown = (e: MouseEvent) => {


    const { y = 0 } = sbtn.value?.getBoundingClientRect() as any
    downy = e.clientY - y
    down.value = true
  }
  const mouseup = () => {
    down.value = false
  }

  if (process.client) {
    // 鼠标抬起
    const onDown = () => {
      if (down.value) {
        // 鼠标防止选择文本 导致mousedown事件无法触发
        const str = window.getSelection();
        str?.removeAllRanges();
        down.value = false
      }
    }
    window.addEventListener('mouseup', onDown)
    window.addEventListener('mouseenter', onDown)
    window.addEventListener('mousemove', (e: MouseEvent) => {
      if (!down.value || !scrolltrack.value) return
      // 鼠标防止选择文本 导致mousedown事件无法触发
      window.getSelection()?.removeAllRanges();

      const { height, y } = scrolltrack.value.getBoundingClientRect()
      const scrollY = e.clientY - y - downy

      if (container.value) {
        const sch = container.value?.scrollHeight
        if (!sch) return
        container.value.scrollTop = sch / height * scrollY
      }
    })
  }
  return {
    mousedown,
    mouseup,
    scrolltrack,
    sbtn,
    down
  }
}