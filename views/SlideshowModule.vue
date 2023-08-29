<template>
  <n-carousel
    :key="effectRef"
    :effect="config.effect || 'slide'"
    :centered-slides="isCard"
    :slides-per-view="isCard ? 'auto' : 1"
    draggable
    autoplay
    style="height: fit-content"
    :space-between="20"
    :class="{ 'slideshow-module': config.radius }"
    data-animated="fadeIn"
    dot-type="line"
    show-arrow
  >
    <n-carousel-item
      v-for="item in config.img"
      :style="{ width: isCard ? '60%' : '100%' }"
    >
      <a :href="item.href"><img class="carousel-img" :src="item.url" /></a>
    </n-carousel-item>
  </n-carousel>
</template>

<script lang="ts" setup>
import { Slideshow } from '../config'
defineProps<{
  config: Slideshow
}>()
const effectRef = ref<'slide' | 'fade' | 'card'>('slide')
const isCard = computed(() => effectRef.value === 'card')
const effects = ['slide', 'fade', 'card']
</script>
<style lang="less" scoped>
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slideshow-module {
  border-radius: 1rem;
  overflow: hidden;
  a {
    display: block;
  }
}
</style>
