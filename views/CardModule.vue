<template>
  <div
    class="card-view"
    :class="{
      'card-radius': config.radius,
    }"
  >
    <n-divider
      dashed
      v-if="config.title"
      class="card-title"
      data-animated="fadeIn"
    >
      <div>
        {{ $lang(config).title }}
      </div>
    </n-divider>

    <div class="card-view-content">
      <div
        class="card-view-item"
        v-for="cardItem in config.cardlist || []"
        :style="{ '--card-column': 100 / (config.column || 1) + '%' }"
      >
        <imageView v-if="cardItem.type === 'image'" :config="cardItem" />
        <TextView v-if="cardItem.type === 'text'" :config="cardItem" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import imageView from '../component/show/BannerView.vue'
import TextView from '../component/show/TextView.vue'
import { Card } from '../config'
const props = defineProps<{
  config: Card
}>()
</script>

<style lang="less" scoped>
.card-view {
  width: 100%;
  background-color: #ffffff;
  overflow: hidden;
  &-content {
    max-width: 100%;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
  }
  &-item {
    width: var(--card-column);
    height: fit-content;
    // inset: 0;
    box-sizing: border-box;
    &-image {
      overflow: hidden;
    }
  }
  .n-carousel {
    flex: 1;
    width: 100%;
  }
}
@media screen and (max-width: 750px) {
  .card-view {
    &-content {
      flex: 1;
    }
    &-item {
      width: 100%;
    }
  }
}
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
