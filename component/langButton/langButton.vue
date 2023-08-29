<template>
  <n-button dashed @click="switchLang()">
    {{ currentLang === 'en' ? '中文' : 'English' }}
  </n-button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
//import iconLang from '../icon/icon-lang.vue'

const { locale: renameLocale } = useI18n()
const currentLang = useCookie('lang') //获取cookie中的lang
const switchLang = () => {
  const val = currentLang.value === 'en' ? 'zh' : 'en'
  renameLocale.value = val //本地使用的语言
  currentLang.value = val //更改cookie中的值
}
</script>

<style></style>
