
import PageModule from '../component/PageModule/PageModule.vue';
import Scrollbar from '../component/scrollbar/Scrollbar.vue';
import BannerView from '../component/show/BannerView.vue';
import BannerModule from '../views/BannerModule.vue';
import CardModule from '../views/CardModule.vue';
import SlideshowModule from '../views/SlideshowModule.vue';
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Scrollbar', Scrollbar)
  nuxtApp.vueApp.component('SlideshowModule', SlideshowModule)
  nuxtApp.vueApp.component('PageModule', PageModule)
  nuxtApp.vueApp.component('CardModule', CardModule)
  nuxtApp.vueApp.component('BannerModule', BannerModule)
  nuxtApp.vueApp.component('BannerView', BannerView)



})


