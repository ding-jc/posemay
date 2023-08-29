<template>
  <footer class="footer">
    <div class="footer-content">
      <div>
        <h2>
          <p>东莞宝姿美高分子材料科技有限公司</p>
          <p v-for="item in footerConfig.list1 || []">
            {{ $lang(item).name }} ：
            <a :href="'http://' + item.url" v-if="item.url" target="_">
              {{ $lang(item).text }}
            </a>
            <span v-else>
              {{ $lang(item).text }}
            </span>
          </p>
        </h2>
      </div>
      <div class="footericon">
        <div v-for="item in footerConfig.list2 || []">
          <a :href="item.url" v-if="item.url">{{ $lang(item).name }}</a>
          <span v-else>{{ $lang(item).name }}</span>
          <img
            :src="item.icon"
            v-if="!item.show || item.show === 'icon'"
            :alt="$lang(item).name"
          />
          <img
            class="hover"
            v-if="(!item.show || item.show === 'img') && item.hover"
            :src="item.img"
            :alt="$lang(item).name"
          />
        </div>
      </div>
    </div>
    <div class="footer-end">
      @2023-2023 xxx.com 版权所有 著作权与商标声明 | 法律声明 | 服务条款 |
      联系我们
    </div>
  </footer>
</template>

<script setup lang="ts">
import { config } from '../../config'

const footerConfig = config.footer
</script>
<style lang="less" scoped>
.footer {
  display: block;
  width: 100%;
  background-color: #2e2e2e;
  height: fit-content;
  padding: 0.5rem 0;
  box-sizing: border-box;
  font-size: 0.8rem;
  a {
    color: #ffffff;
    &:hover {
      text-decoration: underline;
    }
  }
  &-content {
    width: 1200px;
    max-width: 100%;
    height: fit-content;
    box-sizing: border-box;
    padding: 1rem;
    color: #ffffff;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    line-height: 2em;
    padding-top: 1rem;
  }
  &-end {
    width: 100%;
    height: fit-content;
    padding-top: 1.5rem;
    box-sizing: border-box;
    color: #ffffffd3;
    text-align: center;
    font-size: 1vw;
  }
}
@media screen and (max-width: 750px) {
  .footer {
    &-content {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }
  }
}
.footericon {
  img {
    width: 2rem;
    height: 2rem;
  }
}
</style>
