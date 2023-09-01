<template>
  <div
    class="product-modal"
    :style="[rectStyle, newStyle, { '--boxwidth': boxwidth + 'px' }]"
    v-show="isshow"
  >
    <div
      class="product-modal-body"
      @click.stop="close"
      v-show="isanimation"
    ></div>
    <div
      class="product-content"
      ref="content"
      :class="{ stand: isStand }"
      :style="{ opacity: contentShow ? 1 : 0 }"
    >
      <div class="img">
        <div class="img-content">
          <div class="product-content-image" ref="image">
            <n-carousel
              :draggable="pItem?.img && pItem?.img.length > 1"
              :touchable="pItem?.img && pItem?.img.length > 1"
              :space-between="20"
              :show-arrow="pItem?.img && pItem?.img.length > 1"
            >
              <img
                v-for="item in pItem?.img || []"
                :src="item"
                class="carousel-img"
              />
            </n-carousel>
          </div>
        </div>
      </div>

      <div class="product-content-particulars">
        <div>
          <div class="product-content-title" ref="title">
            {{ $lang(pItem).name }}
          </div>
          <!-- 标签 -->
          <!-- <div class="product-content-tag">
            <span v-for="item in $lang(pItem).tag || []">{{ item }}</span>
          </div> -->
          <div class="product-content-pre">
            <pre>{{ $lang(pItem).introduce }}</pre>
          </div>
        </div>

        <div v-if="pItem.url">
          <div>
            <n-button
              strong
              secondary
              type="tertiary"
              :disabled="!pItem.url"
              @click="open(pItem.url)"
            >
              {{ pItem.url ? $t('gotobuy') : $t('none') }}
            </n-button>
          </div>
        </div>
      </div>
      <div class="product-content-close" @click.stop="close"><iconClose /></div>
    </div>
    <div
      class="product-skeleton"
      :class="{ 'product-skeleton-animation': isanimation }"
      :style="{ opacity: skeletonShow ? 1 : 0 }"
    >
      <div class="product-box">
        <div></div>
      </div>
      <div class="product-image" ref="skeletonimage">
        <img :src="pItem?.img?.[0]" alt="" />
      </div>
      <div class="product-title">
        {{ $lang(pItem).name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import iconClose from '../../icon/icon-close.vue'
import useModal from './use-modal'
import { prductItem } from './use-store'
defineProps<{
  show?: boolean
}>()

const {
  content,
  image,
  title,
  skeletonimage,
  newStyle,
  rectStyle,
  isshow,
  isanimation,
  boxwidth,
  isStand,
  contentShow,
  skeletonShow,
  close,
} = useModal()
const pItem = prductItem()

const route = useRoute()

watch(
  () => route.path,
  v => {
    isshow.value = false
    isanimation.value = false
  },
  {
    immediate: true,
  }
)

const open = (url?: string) => {
  url && window.open(url)
}
</script>

<style lang="less" scoped>
@import url('./modal.less');

.stand {
  display: block;
  // flex-direction: column;

  .img {
    display: flex;
    height: var(--boxwidth);
    width: var(--boxwidth);
    overflow: hidden;
    margin: 0 auto;
    position: relative;
    .img-content {
      top: 0;
      position: absolute;
      width: 100%;
      padding-top: 100%;
      overflow: hidden;
      position: absolute;
      height: 0;
      padding-left: 0;

      .product-content-image {
        margin: 0 auto;
      }
    }
  }

  .product-content-particulars {
    height: calc(100% - var(--boxwidth));
    width: 100%;
    align-items: center;
    display: flex;
  }
  .product-content {
    &-pre {
      box-sizing: border-box;
      padding: 0.3rem;
      height: fit-content;
      width: 100%;
      display: flex;
      justify-content: center;
      pre {
        align-items: center;
        width: fit-content;
        font-size: 0.5rem;
        line-height: 1rem;
        white-space: pre-wrap;
        word-wrap: break-word;
        height: 5rem;
        overflow: hidden;
        text-overflow: clip;
      }
    }
  }
}
</style>
