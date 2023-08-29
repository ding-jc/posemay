<template>
  <div class="product no-scrollbar" ref="page">
    <Banner @classify="changeClassify" />
    <ProductContent ref="pContent" />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Banner from '../views/Banner/Banner.vue'
import Footer from '../views/Footer/Footer.vue'
import ProductContent from '../views/ProductContent/ProductContent.vue'

const pContent = ref<InstanceType<typeof ProductContent>>()
/**切换到对应类别标签 */
const changeClassify = (tag?: string) => {
  pContent.value?.changeTabs(tag)
}
</script>

<style lang="less" scoped>
.product {
  width: 100vw;
  margin: 0 auto;
  max-width: 100vw;
  box-sizing: border-box;

  height: auto;
}
</style>
