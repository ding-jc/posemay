<template>
  <div
    class="scrollbar-view"
    v-bind="$attrs"
    :style="{
      '--scroll-size': `var(--size,${size || '0.5rem'})`,
      '--scroll-px': scrollpx + 'px',
      '--scroll-ph': scrollph + '%',
      '--scroll-btnh': scrollh + 'px',
    }"
  >
    <div class="scrollbar-container" ref="container">
      <div ref="content" class="scrollbar-content">
        <slot />
      </div>
    </div>
    <div class="scrolltrack" ref="scrolltrack">
      <div class="scrollbtn_">
        <div class="scrollbtn">
          <div class="sbtn" @mousedown.stop="mousedown" ref="sbtn"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'scrollbar',
}
</script>

<script setup lang="ts">
import useMouse from './use-mouse'
import useScrollbar from './use-scrollbar'

export type Props = {
  size?: number
}
const props = defineProps<Props>()

const { container, content, scrollpx, scrollph, scrollh } = useScrollbar()
const { mousedown, down, scrolltrack, sbtn } = useMouse(container)

defineExpose({
  mousedown,
  down,
  scrolltrack,
  sbtn,
})
</script>
<style lang="less" scoped>
@size: var(--scroll-size);
.scrollbar-view {
  position: relative;
  top: 0;
  overflow: hidden;
}
.scrollbar {
  &-container {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  &-container::-webkit-scrollbar {
    width: 0 !important;
    display: none;
  }
  &-content {
    height: fit-content;
  }
}
.scrollbtn_ {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  transform: translateY(var(--scroll-ph));
}
.scrollbtn {
  width: 100%;
  min-height: calc(@size * 2);
  height: var(--scroll-btnh);
  border-radius: inherit;
  transform: translateY(calc(var(--scroll-ph) * -1));
  display: flex;
  justify-content: center;
  align-items: center;
  .sbtn {
    width: calc(100% - @size / 5.5);
    height: calc(100% - @size / 5.5);
    background: #00000066;
    border-radius: inherit;
  }
}
.scrolltrack {
  background: #ffffffac;
  width: @size;
  height: calc(100% - @size);
  position: absolute;
  top: 0;
  right: 0;
  border-radius: @size;
  box-sizing: border-box;
  margin: calc(@size / 2);
  overflow: hidden;
}
</style>
