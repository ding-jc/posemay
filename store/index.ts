
/**控制导航栏显示隐藏 */
export const navShow = () => useState<boolean>('navShow', () => true)
/**控制导航栏透明 */
export const navLucency = () => useState<boolean>('navLucency', () => true)