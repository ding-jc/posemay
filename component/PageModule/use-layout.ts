


import { ModuleConfig } from '../../config'


export default (conf: ModuleConfig) => {

  const [width = '100%', height = 'fit-content'] = String(conf.layout).split(',')
  const padding = String(conf.padding).split(',').join(' ') + 'px'

  return [
    {
      padding
    },
    conf.layout ? {
      width,
      height,
    } : {}

  ]

}