<template>
  <div class="product-list">
    <TransitionGroup name="list-group">
      <div
        class="product-list-item"
        v-click="item"
        v-for="item in listData"
        :style="{
          opacity: isOpacity === item.key ? 0 : 1,
        }"
        :key="item.key"
        :title="$lang(item).name"
      >
        <div class="product-list-box">
          <div class="product-list-item-content_">
            <div class="product-list-item-content">
              <img
                :src="item?.img?.[0]"
                class="product-list-item-content-image"
              />
              <h2 class="product-list-item-content-title">
                {{ $lang(item).name }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import type { Exhibition } from '../ProductContent/ProductContent.vue'
import { vClick } from './use-directive'
import { itemKey } from './use-store'
const props = defineProps<{
  data: Exhibition
  filter: string[]
}>()

const isOpacity = itemKey()

const listData = computed(() => {
  return props.data.filter(item => {
    if (props.filter.length === 0) return true
    if (props.filter.includes('其它') && !item.tag?.length) {
      return true
    }
    let is = false
    for (const t of item.tag || []) {
      if ([...props.filter].includes(t)) {
        is = true
        break
      }
    }
    return is
  })
})
</script>

<style lang="less" scoped>
@product-item-padding: 0.5rem;
.product-list {
  --product-item-width: calc(100% / 5);
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: fit-content;

  box-sizing: border-box;
  padding: calc(@product-item-padding / 2);
  position: relative;
  &-item {
    width: var(--product-item-width);
    box-sizing: border-box;
    height: fit-content;
    // position: relative;
    &-content_ {
      position: absolute;
      padding: @product-item-padding;
      inset: 0;
    }
    &-content {
      box-sizing: border-box;
      background-color: #fff;
      height: 100%;
      // padding: 0.5rem;
      border: 1px solid #ededed;
      border-radius: @product-item-padding;
      cursor: pointer;
      overflow: hidden;
      transition: border 0.3s;
      // &:hover {
      //   border-style: dashed;
      //   border-color: #000;
      // }
      &-image {
        width: 100%;
        height: 70%;
        margin: 0 auto;
        object-fit: cover;
        display: block;
        border-radius: 3px;
      }
      &-title {
        margin-top: 1rem;
        height: 2rem;
        font-size: 1rem;
        background-color: #fff;
        margin: 0.5rem;
      }
    }
  }
  &-box {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 130%;
  }
}
@media screen and(max-width:900px) {
  .product-list {
    --product-item-width: calc(100% / 4);
  }
}

@media screen and(max-width:750px) {
  .product-list {
    --product-item-width: calc(100% / 3);
  }
}

@media screen and(max-width: 550px) {
  .product-list {
    --product-item-width: calc(100% / 2);
  }
}
</style>
