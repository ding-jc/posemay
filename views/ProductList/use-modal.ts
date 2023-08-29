
import { itemKey, rect, show } from './use-store'


export default () => {

  /**item 坐标尺寸样式css变量 */
  const rectData = rect()
  /**是否弹出模态框 */
  const isshow = show()
  /**当前选择的key */
  const isitemKey = itemKey()
  /**控制css变量的类名 */
  const isanimation = ref(false)
  /**内容盒子 */
  const content = ref<HTMLElement>()
  /**图片盒子 */
  const image = ref<HTMLElement>()
  /**标题盒子 */
  const title = ref<HTMLElement>()
  /**展示内容动画盒子 */
  const skeletonimage = ref<HTMLElement>()

  /**显示真实模态框 */
  const contentShow = ref(false)
  /**显示动画模态框 */
  const skeletonShow = ref(true)

  /**展开后尺寸和坐标css变量 */
  const newStyle = ref({
    '--product-new-boxWidth': '0px',
    '--product-new-boxHeight': '0px',
    '--product-new-boxX': '0px',
    '--product-new-boxY': '0px',
    '--product-new-imageWidth': '0px',
    '--product-new-imageHeight': '0px',
    '--product-new-imageX': '0px',
    '--product-new-imageY': '0px',
    '--product-new-titleWidth': '0px',
    '--product-new-titleHeight': '0px',
    '--product-new-titleX': '0px',
    '--product-new-titleY': '0px',
    '--product-new-title-size': '2rem'
  })

  /**设置css变量后 切换类名或删除 开始动画  */
  const setStyle = (show: boolean) => {
    nextTick(() => {
      setWidth()
      nextTick(() => {
        if (!content.value || !image.value || !title.value) return
        const {
          x: boxX,
          y: boxY,
          width: boxWidth,
          height: boxHeight,
        } = content.value.getBoundingClientRect()
        const {
          x: imageX,
          y: imageY,
          width: imageWidth,
          height: imageHeight,
        } = image.value.getBoundingClientRect()
        const {
          x: titleX,
          y: titleY,
          width: titleWidth,
          height: titleHeight,
        } = title.value.getBoundingClientRect()
        newStyle.value = {
          '--product-new-boxWidth': boxWidth + 'px',
          '--product-new-boxHeight': boxHeight + 'px',
          '--product-new-boxX': boxX + 'px',
          '--product-new-boxY': boxY + 'px',
          '--product-new-imageWidth': imageWidth + 'px',
          '--product-new-imageHeight': imageHeight + 'px',
          '--product-new-imageX': imageX + 'px',
          '--product-new-imageY': imageY + 'px',
          '--product-new-titleWidth': titleWidth + 'px',
          '--product-new-titleHeight': titleHeight + 'px',
          '--product-new-titleX': titleX + 'px',
          '--product-new-titleY': titleY + 'px',
          '--product-new-title-size': '2rem'
        }
        isanimation.value = show
      })
    })


  }

  /**展开前 尺寸和坐标 */
  const rectStyle = computed(() => {
    const {
      imageWidth,
      imageHeight,
      titleWidth,
      titleHeight,
      imageX,
      imageY,
      titleX,
      titleY,
      boxWidth,
      boxHeight,
      boxX,
      boxY,
    } = rectData.value
    return {
      '--product-original-boxWidth': boxWidth + 'px',
      '--product-original-boxHeight': boxHeight + 'px',
      '--product-original-boxX': boxX + 'px',
      '--product-original-boxY': boxY + 'px',
      '--product-original-imageWidth': imageWidth + 'px',
      '--product-original-imageHeight': imageHeight + 'px',
      '--product-original-imageX': imageX + 'px',
      '--product-original-imageY': imageY + 'px',
      '--product-original-titleWidth': titleWidth + 'px',
      '--product-original-titleHeight': titleHeight + 'px',
      '--product-original-titleX': titleX + 'px',
      '--product-original-titleY': titleY + 'px',
      '--product-original-title-size': '1rem'
    }
  })

  /**开始关闭模态框动画 */
  const close = () => {
    contentShow.value = false
    skeletonShow.value = true
    setStyle(false)
  }

  // 监听展开 时获取样式
  watch(
    () => isshow.value,
    value => {
      if (value) {
        skeletonShow.value = true
        setStyle(true)
      }
    }
  )


  /**宽高的最短边 */
  const boxwidth = ref(0)
  /**是否竖向排列 */
  const isStand = ref(false)

  const setWidth = () => {
    if (!content.value) return
    const {
      width,
      height,
    } = content.value.getBoundingClientRect()
    isStand.value = height > width
    boxwidth.value = Math.min(width, height, (Math.max(width, height) / 5) * 3)
  }

  onMounted(() => {
    // 动画离开的动画结束时 清除当前选择的key 并关闭模态框
    skeletonimage.value?.addEventListener('transitionend', () => {
      if (isanimation.value) {
        skeletonShow.value = false
        contentShow.value = true
        return
      }

      isitemKey.value = null
      isshow.value = false

    })

    content.value?.addEventListener('resize', setWidth)
    window.addEventListener('resize', setWidth)
  })

  return {
    content,
    image,
    title,
    skeletonimage,

    newStyle,
    rectStyle,
    isshow,
    isanimation,
    boxwidth,
    isStand,
    contentShow, skeletonShow,
    close
  }
}