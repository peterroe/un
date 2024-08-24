import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import Inspect from 'vite-plugin-inspect'

export default defineConfig({
  optimizeDeps: {
    // exclude: [
    //   // 'vitepress',
    //   // '@vue/repl',
    // ],
    // include: [
    //   '@vue/repl',
    // ]
  },
  ssr: {
    noExternal: ['@vue/repl'],
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    Inspect(),
    UnoCSS(),
    Components({
      dirs: [
        '.vitepress/theme/components',
      ],
      include: [
        /\.vue$/,
        /\.vue\?vue/,
        /\.md$/,
      ],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),
    Icons({
      defaultClass: 'inline',
      defaultStyle: 'vertical-align: sub;',
    }),
  ],
})
