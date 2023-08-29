
import 'vue'
declare module '@vue/runtime-core' {

  interface ComponentCustomProperties {
    $lang: <T extends Object>(target: T) => T

  }
}

