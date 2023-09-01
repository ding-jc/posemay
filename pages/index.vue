<template>
  <div class="index-view no-scrollbar" ref="page">
    <div class="guidance">
      <div class="slogan">
        <div class="introduce">
          <h3 style="font-size: 4em">
            {{ onlang(titleData).title }}
          </h3>
          <h3 style="font-size: 3em">
            {{ onlang(titleData).subhead }}
          </h3>
          <h3 style="font-size: 1.5em">
            {{ $t('company') }}
            <!-- {{ onlang(titleData).introductory }} -->
          </h3>
        </div>
        <div class="more">
          <!-- <n-button round strong>
            <div style="color: #fff" @click="goPurchase">
              {{ $t('goPurchase') }} →
            </div>
          </n-button> -->
          <div class="toproducts" @click="toProducts">
            {{ $t('knowProduct') }}
          </div>
        </div>
      </div>
    </div>
    <div class="isproducts"></div>
    <PageModule :modules="exhibition" />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import exhibition from '../assets/index.json'
import { config } from '../config'
import { useToKey } from '../hooks/use-lang'
import Footer from '../views/Footer/Footer.vue'

const { index } = config

// 介绍
const titleData = index.text

const onlang = useToKey((key, lang) => key + '_' + lang)
const page = ref<HTMLElement>()
const goPurchase = () => {
  process.client &&
    window.open(
      'https://posemay.1688.com/?spm=0.0.wp_pc_common_topnav_38229151.0'
    )
}

const toProducts = () => {
  document.querySelector('.isproducts')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  })
}
</script>

<style lang="less" scoped>
.divs {
  width: 2rem;
  height: 100%;
  background: #000;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 1rem;
}

.divdowns {
  width: 100%;
  height: 100%;
  transform: translateY(var(--scroll-ph));
  background: #00000037;
  .btn {
    background: #fff;
    width: 100%;
    // height: var(--scroll-btnh);
    height: 2rem;
    transform: translateY(calc(var(--scroll-ph) * -1));
  }
}

.guidance {
  width: 100vw;
  height: calc(100vh - 5rem);

  .introduce {
    position: absolute;
    box-sizing: border-box;
    height: 100%;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    h3 {
      margin: 0.5rem 0;
    }
  }
  .more {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    position: absolute;
    bottom: 0;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 50%;
    right: 0;

    .toproducts {
      font-size: 1.7em;
      color: #fff;
      position: relative;
      height: 2rem;
      padding-bottom: 2rem;
      cursor: pointer;
      &::after {
        content: ')';
        display: block;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 120%) rotate(90deg);
      }
    }
  }
}

.slogan {
  height: 100%;
  width: 100%;
  position: relative;
  inset: 0;
  box-sizing: border-box;
  padding: 0 1rem;
  opacity: 0.9;
  font-size: 1vw;
  color: #ffffffea;
  display: flex;
  .hr {
    height: 0.4em;
    background: #ffffff9a;
    margin: 0.8em 0;
  }
}

@media screen and (max-width: 750px) {
  .guidance {
    width: 100vw;
    height: calc(min(100vh, 100vw * 2) - 5rem);
    .introduce {
    }
  }
  .slogan {
    flex-direction: column;
    font-size: 2vw;
  }
}
</style>
