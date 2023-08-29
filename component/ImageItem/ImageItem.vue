<template>
  <div class="imageview" v-if="src">
    <img class="imageview-img" :src="src" />
    <div class="imageview-text" v-html="text" v-if="text"></div>
    <a class="imageview-" :href="href" v-if="href"></a>
    <div class="imageview-button" v-if="buttonvalue">
      <n-button dashed @click="click(buttonpath)">
        {{ buttonvalue }} >></n-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string
    text?: string
    href?: string
    buttonvalue?: string
    buttonpath?: string
  }>(),
  {}
)

const router = useRouter()

const click = (href: string = '') => {
  if (href.startsWith('http')) {
    window.open(href)
  } else if (href.startsWith('/')) {
    router.push(href)
  }
}
</script>

<style lang="less" scoped>
.imageview {
  position: relative;
  width: 100%;
  height: fit-content;
  border: 1px solid #ededed;
  box-sizing: border-box;
  &-img {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  &-text {
    position: absolute;
    inset: 0;
    box-sizing: border-box;
    padding: 1.2rem;
    background-color: #0000002d;
    color: #ffffffd6;
  }
  &-href {
    display: block;
    position: absolute;
    inset: 0;
  }
  &-button {
    position: absolute;
    right: 1.2rem;
    box-sizing: border-box;
  }
}
</style>
