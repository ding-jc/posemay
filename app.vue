<template>
  <!-- 首页背景 -->
  <div class="banner" v-if="$route.path === '/'">
    <div class="banner_"></div>
  </div>
  <n-config-provider
    :theme="theme"
    :theme-overrides="theme === null ? lightThemeOverrides : darkThemeOverrides"
  >
    <div
      class="app"
      ref="app"
      :class="{ 'nav-lucency': navluc && $route.path === '/' }"
      @scroll="scroll"
      v-animate
      style="
        --animate-duration: 0.5s;
        --animate-delay: 0.5s;
        --animate-repeat: 1;
      "
    >
      <NavView
        class="nav-view"
        :style="{
          transform: `translateY(${isNav ? '0' : '-102%'})`,
          borderWidth: !navluc || $route.path !== '/' ? '1px' : '0px',
        }"
      />
      <!-- 路由内容 -->
      <div class="app-content" ref="content">
        <NuxtPage />
      </div>
    </div>
    <n-back-top :right="30" :listen-to="() => app" />
    <div id="app-modal"></div>
  </n-config-provider>
</template>
<script lang="ts" setup>
import { NConfigProvider } from 'naive-ui'
import { useShowNav } from './hooks/use-showNav'
import { navLucency, navShow } from './store'
import { vAnimate } from './utils/animate'
import NavView from './views/NavView.vue'
const isNav = navShow()
const route = useRoute()
const navluc = navLucency()
const scroll = useShowNav()

// 切换路由后nav必须显示
watch(
  () => route.path,
  value => {
    if (value === '/') navluc.value = true
    isNav.value = true
    if (app.value?.scrollTop) app.value.scrollTop = 0
  }
)

const app = ref<HTMLDivElement>()
const content = ref<HTMLDivElement>()

const lightThemeOverrides = {
  common: {
    primaryColor: '#000000',
    primaryColorHover: '#000000',
  },
}

const darkThemeOverrides = {
  common: {
    primaryColor: '#FFFFFF',
    hoverColor: '#FFFFFF',
  },
}

const theme = null
</script>

<style lang="less">
@import url('./assets/style/global.less');
.banner {
  width: 100vw;
  height: 100vh;
  // max-height: vae(100vw + 1rem);
  position: fixed;
  top: 0;
  z-index: 0;
  background-image: url(/image/bg.png);
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .banner_ {
    width: 100%;
    height: 100%;
    background: #00000023;
  }
}
html {
  height: 100vh;
  overflow: hidden;
}
.app {
  top: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
}
.app-content {
  // height: 100vh;
  width: 100vw;
  overflow: hidden;
  // height: fit-content;
  overflow-y: auto;
  // position: absolute;
  // top: 0;
  height: auto;
}
.nav-view {
  height: 5rem;
  width: 100%;
  position: absolute;
  top: 0;
  transition: transform 0.4s ease;
  border-bottom: 0px solid #ededed;
}

/* 宽度大于750 */
@media screen and (min-width: 750px) {
  .content {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .content::-webkit-scrollbar {
    width: 0 !important;
    display: none;
  }
}

/* 宽度小于750 */
@media screen and (max-width: 750px) {
  html {
    font-size: 14px;
  }
}
</style>
