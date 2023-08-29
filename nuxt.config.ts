// https://nuxt.com/docs/api/configuration/nuxt-config
// import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import AutoImport from 'unplugin-auto-import/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
export default defineNuxtConfig({
  routeRules: {
    '/': { ssr: true, },
    '/index': { ssr: true },
    '/product': { ssr: true },
    '/about': { ssr: true },
  },
  router: { options: {} },
  css: [
    '~/assets/style/reset.css',
    '~/assets/style/root.css',
    'animate.css'
  ],
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
          'naive-ui',
          'vueuc',
          '@css-render/vue3-ssr',
          '@juggle/resize-observer'
        ]
        : ['@juggle/resize-observer']
  },
  devtools: {
    enabled: true,
  },
  vite: {

    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : []
    },
    resolve: {
      alias: {
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    plugins: [
      // viteCommonjs(),
      AutoImport({
        imports: ["vue"], dts: 'types/auto-import.d.ts'
      }),
      Components({
        resolvers: [NaiveUiResolver()], // Automatically register all components in the `components` directory
      }),
    ],
  },

})
