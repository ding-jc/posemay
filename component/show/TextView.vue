<template>
  <div
    class="card-text-view"
    :style="{
      '--card-text-column':
        100 / (config.list.length === 1 ? 1 : config.column || 1) + '%',
    }"
  >
    <div
      class="card-text-view-item"
      v-for="item in config.list || []"
      :style="{ '--fsize': `calc(${item.size || 1} * 1rem)` }"
      :data-animated="item.animated || 'fadeIn'"
    >
      <div>
        <h3 v-if="item.title">{{ item.title }}</h3>
        <h4 v-if="item.subhead">{{ item.subhead }}</h4>
        <pre class="pre">
          {{ $lang(item).introductory }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TextConfig } from '../../config'
defineProps<{
  config: TextConfig
}>()
</script>
<style lang="less" scoped>
.card-text-view {
  width: 100%;
  height: fit-content;
  display: flex;

  flex-wrap: wrap;
  &-item {
    width: var(--card-text-column);
    box-sizing: border-box;
    padding: 0.5rem 1.2rem;
    height: fit-content;
    &-text {
      overflow: hidden;
    }
    h3 {
      font-size: calc(var(--fsize) * 1.4);
      padding: 0.5rem 0;
    }
    h4 {
      font-size: calc(var(--fsize) * 1.2);
      padding-bottom: 0.3rem;
    }
    pre {
      font-size: var(--fsize);
      padding: 0.2rem 0;
      // text-indent: 1em;
      line-height: 1.7em;
    }
  }
  .n-carousel {
    width: 100%;
    height: fit-content;
  }
}

.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
@media screen and (max-width: 750px) {
  .card-text-view {
    &-item {
      width: 100%;
    }
  }
}
</style>
