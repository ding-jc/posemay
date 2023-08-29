<template>
  <div class="page-module">
    <template v-for="(conf, index) in modules" :key="index">
      <div
        class="page-module-container"
        v-if="conf.type === 'slideshow'"
        :style="useLayout(conf)"
      >
        <div v-if="conf.title">
          <h3>
            {{ onlang(conf).title }}
          </h3>
        </div>
        <SlideshowModule
          :config="{
            ...conf,
            img: [
              {
                url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg',
                href: '#',
              },
              {
                url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
                href: '#',
              },
              {
                url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg',
                href: '#',
              },
            ],
          }"
        />
      </div>
      <div v-if="conf.type === 'card'" class="page-module-container">
        <CardModule :config="conf" />
      </div>
      <div v-if="conf.type === 'banner'" class="page-module-container">
        <BannerModule :config="conf" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
export default { name: 'PageModule' }
</script>

<script setup lang="ts">
import { ExhibitionModules } from '../../config'
import { useToKey } from '../../hooks/use-lang'
import useLayout from './use-layout'

const onlang = useToKey((key, lang) => key + '_' + lang)

defineProps<{
  modules: ExhibitionModules[]
}>()
</script>

<style lang="less" scoped>
.page-module {
  width: 100%;
  height: fit-content;
  overflow: hidden;
  background-color: #fff;

  &-container {
    width: 1200px;
    max-width: 100vw;
    height: fit-content;
    box-sizing: border-box;
    overflow: hidden;
    // padding: 1rem;
    margin: 0 auto;
  }
}
.page-divider {
  margin: 0 auto;
  width: 60%;
}
</style>
