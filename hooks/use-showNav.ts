import { navLucency, navShow } from '../store'




/**
 * 监听鼠标事件控制,导航栏显示隐藏
 * @date 2023-07-27
 * @returns { (e: UIEvent) => void }
 */
export const useShowNav = (): (e: UIEvent) => void => {

  const navHid = navShow()
  const navluc = navLucency()
  let num: number = 0
  const scroll = (e: UIEvent) => {
    const stop = (e.target as Element).scrollTop
    navluc.value = stop < 200
    let show = false
    if (stop < num) {
      show = true
    } else {
      show = false
    }
    if (show !== navHid.value) navHid.value = show

    num = stop
  }

  return scroll
}



