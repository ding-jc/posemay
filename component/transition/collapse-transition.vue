<template>
  <div>
    <div>
      <slot name="prefix" />
    </div>
    <div
      class="collapse-transition-default"
      :class="{ 'collapse-transition': istransition }"
      :style="{
        height: show ? getH() + 'px' : 0,
      }"
    >
      <div ref="defaultRef">
        <slot />
      </div>
    </div>
    <div><slot name="suffix" /></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
  disabled: boolean
}>()

const defaultRef = ref<HTMLDivElement>()
const show = ref(false)
const istransition = ref(false)

const toTransitionend = () => {
  istransition.value = false
}

onMounted(() => {
  show.value = props.disabled
  defaultRef.value?.addEventListener('transitionend', toTransitionend)
})
onUnmounted(() => {
  defaultRef.value?.removeEventListener('transitionend', toTransitionend)
})

const getH = () => {
  return defaultRef.value?.getBoundingClientRect()?.height || 0
}

watch(
  () => props.disabled,
  value => {
    nextTick(() => {
      istransition.value = true
      nextTick(() => {
        show.value = value
      })
    })
  }
)
</script>

<style lang="less" scoped>
.collapse-transition-default {
  overflow: hidden;
}
.collapse-transition {
  transition: all 0.2s;
}
</style>
