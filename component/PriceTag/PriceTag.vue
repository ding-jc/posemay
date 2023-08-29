<template>
  <span class="price-tag" :class="{ 'price-tag-en': locale === 'en' }"
    ><slot
  /></span>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
</script>

<style lang="less" scoped>
@color: red;
@font-size: 0.7em;

.price-tag {
  color: @color;
  &::before {
    content: '≈￥';
    font-size: @font-size;
    color: @color;
  }
}
// .price-tag-en {
//   &::before {
//     content: '$';
//     font-size: @font-size;
//     color: @color;
//   }
// }
</style>
