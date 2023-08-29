<template>
  <div class="about">
    <div class="about-introduce">
      <n-carousel
        slides-per-view="auto"
        :space-between="10"
        :loop="false"
        draggable
      >
        <n-carousel-item
          v-for="(item, index) in list"
          :key="item.src"
          class="about-introduce-item"
          :style="indeSty(index)"
          @click="onContent(index)"
        >
          <img class="carousel-img" :src="item.src" />
          <div class="carousel-content">
            <div class="carousel-title" v-show="index !== contentIndex">
              {{ item.title }}
            </div>
            <div v-show="index === contentIndex" class="content-text">
              <h2 style="font-size: 1.4em">{{ carouselContent.title }}</h2>
              <p>{{ carouselContent.content }}</p>
            </div>
          </div>
        </n-carousel-item>
      </n-carousel>
    </div>
    <div class="about-content">
      <div class="about-carousel">
        <PageModule :modules="exhibition" />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import exhibition from '../assets/about.json'
import Footer from '../views/Footer/Footer.vue'

const carouselContent = computed(() => list[contentIndex.value] || {})

const contentIndex = ref(-1)

const indeSty = (index: number) => {
  if (contentIndex.value === -1)
    return {
      width: `${100 / 3}%`,
    }
  if (contentIndex.value === index)
    return {
      width: '60%',
    }
  return {
    width: list.length > 3 ? '15%' : '20%',
  }
}

const onContent = (index: number) => {
  if (contentIndex.value === index) {
    contentIndex.value = -1
  } else {
    contentIndex.value = index
  }
}

const list = [
  {
    title: '宝姿美走出去',
    content:
      '2023年5月28日，合作伙伴请进来2023年5月28日欧洲团队一行三人到访东莞宝姿美高分子材料科技有限公司。',
    src: '/image/b305dd3cb9cece706a3a1c40ef4605c.jpg',
  },
  // {
  //   title: '抗疫',
  //   content:
  //     '东莞宝姿美高分子材料科技有限公司、积极响应光彩志愿者的号召，为桥头镇2022年轮动核酸检测工作出一份微薄之力。',
  //   src: '/image/4ec2455c82672068f70cac91caecf99.jpg',
  // },

  {
    title: '美国会展',
    content: '东莞宝姿美高分子材料科技有限公司到美国参加展览',
    src: '/image/513d87f14a474c2be6efee593578c0a.jpg',
  },
  {
    title: '法国会展',
    content: '东莞宝姿美高分子材料科技有限公司到法国参加展览',
    src: '/image/c6d69cdf03bea1cdb7e5644c465211e.jpg',
  },
]
</script>
<style lang="less" scoped>
.about {
  &-content {
    height: fit-content;
  }
  &-carousel {
    margin-top: 5rem;
    min-height: calc(100vh - 5rem);
  }
}

.about-introduce {
  width: 100%;
  position: relative;
  ::v-deep(.n-carousel__slides) {
    min-width: 100%;
  }
  &-item {
    width: 100%;
    height: 100%;
    position: relative;
    transition: width 0.4s ease-out;

    &:hover .carousel-content {
      visibility: visible;
    }
  }
  .carousel-img {
    display: block;
    width: 100%;
    height: calc(min(100vh, 100vw) - 5rem);
    object-fit: cover;
  }
  .carousel-title {
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
  .carousel-content {
    // color: aliceblue;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #008cffcb;
    background-color: #ffffffcb;
    box-sizing: border-box;
    padding: 2rem;
    font-size: 2rem;
    visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    .content-text {
      width: 80%;
      height: fit-content;
      font-size: 1.4rem;
    }
  }
}
</style>
