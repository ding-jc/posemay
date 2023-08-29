
/**是否显示弹框 */
export const show = () => useState<boolean>('show', () => false)
/**当前选择的item的key */
export const itemKey = () => useState<symbol | null>('itemKey', () => null)
/**选择的item时尺寸坐标  */
export const rect = () => useState<{
  imageWidth: number
  imageHeight: number
  imageX: number
  imageY: number
  titleWidth: number
  titleHeight: number
  titleX: number
  titleY: number
  boxWidth: number
  boxHeight: number
  boxX: number
  boxY: number
}>('product-modal-rect', () => ({
  imageWidth: 0,
  imageHeight: 0,
  titleWidth: 0,
  titleHeight: 0,
  imageX: 0,
  imageY: 0,
  titleX: 0,
  titleY: 0,
  boxWidth: 0,
  boxHeight: 0,
  boxX: 0,
  boxY: 0,
}))

/**当前选择的卡片数据 */
export const prductItem = () => useState<{
  name: string
  introduce: string
  img?: string[],
  key?: symbol,
  tag?: { name: string }[],
  price?: number | string
  url: string
}>('prductItem', () => ({
  name: '',
  introduce: '',
  img: [],
  tag: [],
  price: '',
  url: ''

}))