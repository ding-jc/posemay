<template>
  <div class="product-nav" ref="navRef">
    <n-tabs type="line" animated v-model:value="tabvalue">
      <!-- <template #suffix v-if="tagLabel.length">
        <span class="product-nav-iconfilter">
          <iconFilter @click="isFilter = !isFilter" />
        </span>
      </template> -->
      <template v-for="item in classifyExhibition" :key="item.name">
        <n-tab-pane :name="item.name" :tab="$lang(item).name">
          <div class="product-nav-filter" v-if="0">
            <collapseTransition class="tag" :disabled="!isFilter">
              <div @click="isFilter = true" v-if="tagLabel.length">
                <span v-for="tag in tagValue"
                  >{{ toEnTag(tag) }} <iconClose
                /></span>
              </div>
            </collapseTransition>
            <collapseTransition :disabled="isFilter">
              <div>
                <n-checkbox-group
                  v-model:value="tagValue"
                  class="product-nav-checkbox"
                >
                  <n-space item-style="display: flex;">
                    <n-checkbox
                      :value="tag.name"
                      :label="$lang(tag).name"
                      v-for="tag in tagLabel"
                      :key="tag.name"
                    />
                  </n-space>
                </n-checkbox-group>
              </div>
            </collapseTransition>
          </div>
          <div style="min-height: 100vh">
            <ProductList :data="item.data" :filter="tagValue" />
          </div>
        </n-tab-pane>
      </template>
    </n-tabs>
  </div>

  <!-- 弹框传送到 根组件 -->
  <ClientOnly>
    <Teleport to="#app-modal">
      <Modal />
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import collapseTransition from '../../component/transition/collapse-transition.vue'
import iconClose from '../../icon/icon-close.vue'
import Modal from '../ProductList/Modal.vue'
import ProductList from '../ProductList/ProductList.vue'
import useClassify from './use-classify'
export type Exhibition = {
  name: string
  name_en?: string
  introduce: string
  introduce_en?: string
  img?: string[]
  key?: symbol
  classify?: string[]
  classify_en?: string[]
  url?: string
  tag?: string[]
  tag_en?: string[]
}[]
const navRef = ref<HTMLElement>()

const { classifyExhibition, tagLabel } = useClassify()

const { locale } = useI18n()

/**当前分类标签 */
const tabvalue = ref('全部')

/**查找英文选项 */
const toEnTag = (tag: string) => {
  return locale.value === 'en'
    ? tagLabel.value.find(v => v.name == tag)?.name_en || tag
    : tag
}

/**选择的标签 */
const tagValue = ref<string[]>([])
/**控制显示和隐藏筛选项 */
const isFilter = ref(false)

onMounted(() => {
  if (!navRef.value) return
  const el = navRef.value.querySelector('.n-tabs-nav-scroll-wrapper')
  el?.addEventListener('click', () => {
    el.scrollIntoView({
      behavior: 'smooth',
    })
  })
})

/**切换分类标签 */
const changeTabs = (tag?: string) => {
  if (!tag) return
  if (navRef.value) {
    const el = navRef.value.querySelector('.n-tabs-nav-scroll-wrapper')
    el?.scrollIntoView({
      behavior: 'smooth',
    })
  }
  if (classifyExhibition.value.map(v => v.name).includes(tag)) {
    tabvalue.value = tag
  }
}

defineExpose({
  /**切换分类标签 */
  changeTabs,
})
</script>
<style lang="less" scoped>
.product-list-enter-active {
  transition: opacity 0.5s ease;
}

.product-list-enter-from,
.product-list-leave-to {
  opacity: 0;
}

.product-nav {
  position: sticky;
  width: 100%;
  padding: 0 2%;
  margin: 0 auto;
  box-sizing: border-box;
  max-width: 100%;
  background-color: #f1e1c8;
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  background-image: url('/image/njdskjndsk79ys8u2.jpg');
  background-size: 100% auto;

  &-iconfilter {
    padding: 0 0.5rem;
  }
  ::v-deep(.n-tabs-nav__suffix) {
    padding: 0;
  }

  &-checkbox {
    box-sizing: border-box;
    padding: 0 1rem;
  }
  ::v-deep(.n-tabs-nav) {
    box-sizing: border-box;
    padding: 0 0.3rem;
    .icon {
      width: 1.5rem;
      height: 1.5rem;
      fill: #525252;
      cursor: pointer;
    }
  }

  &-filter {
    box-sizing: border-box;
    padding: 0 0.5rem;
    height: fit-content;
    display: flex;
    flex-direction: column;

    .icon {
      width: 1.5rem;
      height: 1.5rem;
      fill: #525252;
      cursor: pointer;
    }
  }
  ::v-deep(.v-x-scroll) {
    max-width: 100%;
    margin: 0 auto;
    width: fit-content;
  }
  ::v-deep(.n-tabs-nav-scroll-wrapper) {
    height: 4rem;
    display: flex;
    align-items: center;
  }
  .n-checkbox-group {
    width: fit-content;
    margin: 0 auto;
  }
}

.product-nav-filter {
  span {
    background-color: #000000d6;
    color: #fff;
    display: inline-block;
    padding: 0 0.5rem;
    font-size: 0.7rem;
    border-radius: 3rem;
    margin: 0 0.2rem;
    height: 1.5rem;
    line-height: 1.5rem;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      fill: #fff;
      transform: scale(1.3);
    }
  }
}
</style>
