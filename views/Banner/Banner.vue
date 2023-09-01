<template>
  <div class="banner-view">
    <div class="image">
      <div
        class="image-item"
        :class="{ 'image-show': imageShow === index }"
        v-for="(item, index) in imglist"
        :key="item.url + index"
        @click="emit('classify', item.to)"
        :title="item.to"
      >
        <img :src="item.url" :alt="item.name" />

        <pre class="pre">
           <p>{{ item.name }}</p>
          {{ item.intro }}</pre>
      </div>
    </div>
    <div class="text">{{ dtoItemRef.length }}</div>

    <div class="dto no-scrollbar" ref="dto">
      <div
        class="content"
        :style="{ width: `calc(100% / 3 * ${imglist.length})` }"
      >
        <div
          class="dtoimg"
          v-for="(item, index) in imglist"
          :key="item.url + index"
          @click="
            () => {
              imageShow = index
              scrollToMiddle(index)
            }
          "
          :ref="(el:any)=>{dtoItemRef[index]=(el)}"
        >
          <img :src="item.url" :class="{ selsect: imageShow === index }" />
          <span
            class="state"
            @transitionend="imageNext"
            :class="{
              'state-show': oprnShoe && imageShow === index,
              'state-transition': imageShow === index,
            }"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ClassifyExhibition } from '../ProductContent/use-classify'
const props = defineProps<{
  data: ClassifyExhibition
}>()
const emit = defineEmits<{ (e: 'classify', tag?: string): void }>()

const imglist = computed(() => {
  const li = props.data

    .filter(v => v.name !== '全部')
    .map(v => {
      const data = v.data?.[0] || {}
      return {
        name: v.name,
        to: v.name,
        url: data.img?.[0] || '',
        intro: data.introduce || '',
      }
    })
  return li
})

const imageShow = ref(0)
const stateShow = ref(0)
const oprnShoe = ref(false) //允许过渡动画
const dtoItemRef = ref<HTMLElement[]>([])
const dto = ref<HTMLElement>()

// 过渡结束时切换下一个
const imageNext = () => {
  oprnShoe.value = false
  imageShow.value = imageShow.value + 1
  if (imageShow.value >= imglist.value.length) {
    imageShow.value = 0
  }
  nextTick(() => {
    oprnShoe.value = true
  })
  scrollToMiddle(imageShow.value)
}

// 页面首次打开和路由切换时立刻触发过渡动画
onMounted(() => {
  oprnShoe.value = false
  nextTick(() => {
    oprnShoe.value = true
  })
})

/**切换时 滚动到容器中间 */
const scrollToMiddle = (index: number) => {
  if (!dto.value || !dtoItemRef.value) return
  const { width } = dto.value.getBoundingClientRect()
  const { width: w = 0 } = dtoItemRef.value[index]?.getBoundingClientRect()
  const l = dtoItemRef.value[index].offsetLeft
  dto.value.scrollTo({
    behavior: 'smooth',
    left: l + w / 2 - width / 2,
  })
}
</script>

<style lang="less" scoped>
@h: calc(100vh - 9rem);
.banner-view {
  width: 100vw;
  height: @h;
  max-height: 100vw;
  position: relative;
  overflow: hidden;
  .image {
    width: 100vw;
    max-height: 100vw;
    height: @h;
    position: absolute;
    top: 0;
    &-item {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: all 2s;
      cursor: pointer;
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      object-fit: cover;
      display: block;
      filter: brightness(90%);
    }
    pre {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      font-size: 1.4rem;
      box-sizing: border-box;
      padding: 2rem;
      color: #303030;
    }
    .image-show {
      opacity: 1;
      z-index: 3;
    }
  }
  .dto {
    width: 400px;
    height: 20%;
    min-width: calc(100vw / 4);
    max-width: 100vw;
    position: absolute;
    right: 0;
    bottom: 10px;
    z-index: 5;
    overflow-x: auto;
    box-sizing: border-box;

    .content {
      width: fit-content;
      min-width: 100%;
      border-radius: 2rem;
      height: 100%;
      display: flex;
      padding: 0 0.5rem;
    }

    .dtoimg {
      width: 100%;
      height: 100%;
      float: left;
      overflow: hidden;
      box-sizing: border-box;
      // padding-right: 0.5rem;
      margin-right: 10px;
      position: relative;
      border-radius: 0.5rem;
      img {
        float: left;
        height: 100%;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        object-fit: cover;
        display: block;
        transition: all 0.5s ease;
        transform: scale(1.1);
        &.selsect {
          transform: scale(1);
        }
        &:hover {
          transform: scale(1);
        }
      }

      .state {
        position: absolute;
        height: 100%;
        height: 4px;
        background-color: #00000040;
        background-color: #000000;
        width: 100%;
        bottom: 0;
        z-index: 1;
        left: 0;
        transform: translateX(-100%);
      }
      .state-transition {
        transition: transform 8s linear;
      }
      .state-show {
        transform: translateX(0);
      }
    }
  }
}
</style>
