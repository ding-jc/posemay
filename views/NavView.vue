<template>
  <div class="navbar" v-bind="$attrs">
    <div class="navlay">
      <div class="logoh">
        <a href="./">
          <h1>
            <img class="logo" id="logo" src="/logo.png" alt="宝姿美" />
          </h1>
        </a>
        <span class="logotitle">&nbsp;{{ onlang(config).logoText }}</span>
      </div>

      <ul class="nav-menu" v-show="showMenu">
        <li
          v-show="!isNavDrawer"
          v-for="{ path, name } in config.navbar"
          :key="path"
        >
          <NuxtLink :to="path">{{ $t(name) }}</NuxtLink>
        </li>
        <langButton v-show="!isNavDrawer" style="color: var(--nav-color)" />
        <li v-show="isNavDrawer">
          <div @click="active = !active">
            <svg
              t="1690334203332"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5710"
              width="200"
              height="200"
            >
              <path
                d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h426.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
                p-id="5711"
              ></path>
            </svg>
          </div>
        </li>
      </ul>
    </div>
    <div v-show="isNavDrawer">
      <n-drawer
        v-model:show="active"
        width="60vw"
        native-scrollbar
        placement="right"
        style="height: 100vh"
      >
        <div class="nav-drawer">
          <div class="nav-drawer-close">
            <div @click="active = !active" class="nav-drawer-close-btn">
              <svg
                t="1690333960287"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2641"
                width="200"
                height="200"
              >
                <path
                  d="M567.168 512l189.184 188.352a40.064 40.064 0 0 1 0.768 55.68 37.76 37.76 0 0 1-54.4 0.832L512 566.912l-190.72 189.952a37.76 37.76 0 0 1-54.4-0.768 40.064 40.064 0 0 1 0.768-55.68L456.832 512 267.648 323.648a40.064 40.064 0 0 1-0.768-55.68 37.76 37.76 0 0 1 54.4-0.832L512 457.088l190.72-189.952a37.76 37.76 0 0 1 54.4 0.768 40.064 40.064 0 0 1-0.768 55.68L567.168 512z"
                  p-id="2642"
                ></path>
              </svg>
            </div>
          </div>
          <ul class="nav-menu">
            <li
              v-for="({ path, name }, index) in config.navbar"
              :key="path"
              @click="skip(path)"
            >
              <div
                class="nav-menu-item"
                :class="{ 'li-link-active': $route.path === path }"
              >
                {{ $t(name) }}
              </div>
            </li>
            <langButton style="margin: 0 auto" />
          </ul>
        </div>
      </n-drawer>
    </div>
  </div>
</template>

<script setup lang="ts">
import langButton from '../component/langButton/langButton.vue'
import { config } from '../config'
import { useToKey } from '../hooks/use-lang'
const active = ref(false)
const showMenu = ref(false)
const isNavDrawer = ref(false)
const router = useRouter()

const onlang = useToKey((key, lang) => key + '_' + lang)

// 跳转路由并关闭抽屉
const skip = (path: string) => {
  router.push(path)
  active.value = false
}

// 宽度小于750时使用抽屉显示nav
if (process.client) {
  const getw = () => {
    const show = document.body.clientWidth < 750
    isNavDrawer.value = show
    if (!show) active.value = false
  }
  window.addEventListener('resize', getw)
  onMounted(() => {
    getw()
    showMenu.value = true
  })
}
</script>
<style lang="less" scoped>
.navbar {
  height: 5rem;
  background-color: var(--nav-bg, #fff);
  color: var(--nav-color);
  a {
    color: var(--nav-color);
  }
  .icon {
    fill: var(--nav-color);
  }
  position: sticky;
  top: 0;
  z-index: 999;
  .logoh {
    box-sizing: border-box;
    height: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    a {
      display: flex;
      align-items: center;
    }
    .logo {
      height: 4rem;
      width: 4rem;
    }
    .logotitle {
      font-size: 1.4rem;
      letter-spacing: 0.3rem;
    }
  }
  .navlay {
    height: 100%;
    width: 900px;
    box-sizing: border-box;
    padding: 0 1rem;
    max-width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
  }
  ul {
    display: flex;
    height: 6rem;
    flex-direction: row;
    align-items: center;
  }
}

.nav-menu {
  li {
    box-sizing: border-box;
    height: fit-content;
    padding: 0 0.5rem;
    a {
      box-sizing: border-box;
      padding: 0.5rem 1rem;
      transition: border 0.1s;
      box-shadow: 0 0 1px #00000000;
      border-radius: 0.3rem;
      border-width: 1px;
      border-style: dashed;
      border-color: #00000000;
      &:hover {
        box-sizing: border-box;
        border-color: var(--nav-active-bg);
      }
    }
    .router-link-active {
      background: var(--nav-active-bg);
      color: var(--nav-active-color);
    }
  }
}
.nav-drawer {
  box-sizing: border-box;
  li {
    padding: 0;
    cursor: pointer;
    .nav-menu-item {
      padding: 0.5rem;
      transition: background-color 0.2s;
      &:hover {
        background-color: #0000000e;
      }
    }
  }
  &-close {
    height: 5rem;
    padding: 0 0.5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    &-btn {
      padding: 0.5rem;
      float: right;
    }
  }
  .li-link-active {
    background-color: #00000020;
  }
}
</style>
