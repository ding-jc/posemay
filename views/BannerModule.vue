<template>
  <div class="bannerview">
    <n-carousel
      v-if="imgList.length > 1"
      draggable
      autoplay
      style="height: fit-content"
      :space-between="20"
      data-animated="fadeIn"
      dot-type="line"
      show-arrow
    >
      <n-carousel-item
        v-for="item in imgList"
        class="card-image-view-item-carousel"
      >
        <ImageItem v-bind="item" />
      </n-carousel-item>
    </n-carousel>

    <ImageItem v-bind="imgList[0]" v-else />
  </div>
</template>

<script setup lang="ts">
import ImageItem from '../component/ImageItem/ImageItem.vue'

type Img = {
  src: string
  text?: string
  href?: string
  buttonvalue?: string
  buttonpath?: string
}
const props = withDefaults(
  defineProps<{
    img: Img | Img[]
  }>(),
  {}
)

const imgList = computed(() =>
  Array.isArray(props.img) ? props.img : [props.img]
)
</script>

<style lang="less" scoped>
.bannerview {
  width: 100%;
  height: fit-content;
}
</style>
