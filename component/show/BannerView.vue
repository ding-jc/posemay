<template>
  <div
    class="card-image-view"
    :style="{
      '--card-image-column':
        100 / (config.card.length === 1 ? 1 : config.column || 1) + '%',
    }"
  >
    <div
      class="card-image-view-item"
      v-for="cardItem in config.card || []"
      :style="{ '--card-image-padding': config.padding }"
      :data-animated="config.animated || 'fadeIn'"
    >
      <n-carousel
        v-if="cardItem?.img.length > 1"
        :centered-slides="config.effect"
        :slides-per-view="config.effect ? 'auto' : 1"
        draggable
        autoplay
        style="height: fit-content"
        :space-between="20"
        dot-type="line"
        show-arrow
        :class="{
          'card-radius': config.radius,
        }"
      >
        <n-carousel-item
          v-for="item in cardItem?.img || []"
          class="card-image-view-item-carousel"
        >
          <img class="carousel-img" :src="item.url" />
          <div class="carousel-text" v-show="item.text">
            <template v-for="tagItem in carouselText(item.text)">
              <component
                :is="tagItem.tag"
                :style="{ textAlign: tagItem.algin }"
                >{{ $lang(tagItem).value }}</component
              >
            </template>
          </div>
          <a :href="item.href" v-show="item.href"></a>
        </n-carousel-item>
      </n-carousel>

      <ImageItem
        v-else
        class="card-image-view-item-carousel"
        :src="cardItem?.img[0].url"
        :href="cardItem?.img[0].href"
      />
      <div class="carousel-img-title" v-if="cardItem.title">
        {{ $lang(cardItem).title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ImageConfig, TextList } from '../../config'
import ImageItem from '../ImageItem/ImageItem.vue'
defineProps<{
  config: ImageConfig
}>()

const tag = ['h1', 'p']
const carouselText = (value: string | TextList) => {
  if (Array.isArray(value)) {
    return value.map(item =>
      tag.includes(item.tag) ? item : { ...item, tag: 'p' }
    )
  }
  return [
    {
      tag: 'p',
      value,
      algin: 'left',
    },
  ]
}
</script>
<style lang="less" scoped>
.carousel-img-title {
  margin: 0.2rem 0;
  line-height: 1rem;
  box-sizing: border-box;
  padding: 0.3rem;
  width: fit-content;
  border-radius: 0.5rem;
  background: #ededed81;
}
.card-image-view {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  &-item {
    width: var(--card-image-column);
    box-sizing: border-box;
    height: fit-content;
    padding: var(--card-image-padding, 0);
    &-image {
      overflow: hidden;
    }
    &-carousel {
      width: 100%;
      position: relative;
      a {
        display: block;
        position: absolute;
        inset: 0;
      }
      .carousel-text {
        position: absolute;
        inset: 0;
        box-sizing: border-box;
        padding: 2rem;
        color: #ffffffaf;
        background-color: #00000037;
        line-height: 2rem;
        h1 {
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 0.8rem;
          margin-bottom: 1rem;
        }
      }
    }
  }
  .n-carousel {
    width: 100%;
    height: fit-content;
  }
}

.card-radius {
  border-radius: 0.5rem;
}

.card-shadow {
  box-shadow: 0 0 12px #0000004d;
}

.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
// @media screen and (max-width: 500px) {
//   .card-image-view {
//     &-item {
//       width: 100%;
//       padding-left: 0;
//       padding-right: 0;
//     }
//   }
// }
</style>
