import { debounce } from 'utils/debounce'

/**头部变量 */
export const useHeaderStyle = () => {

  const basecss = {
    '--header-background-color': 'transparent',
    '--header-text-color': '#fff',
  }


  const headerCssVar = ref(basecss)




  onMounted(() => {

    // 设置宽度
    if (process.client) {
      const setBg = debounce((e: Event) => {
        if (window.scrollY > 0) {
          console.log('[ window.scrollY ]-24', window.scrollY)
          headerCssVar.value = {
            '--header-background-color': '#fff',
            '--header-text-color': 'var(--color)',
          }
        } else {
          headerCssVar.value = basecss
        }
      }, 0)
      window?.addEventListener('scroll', setBg)
    }
  })

  return {
    headerCssVar
  }

}