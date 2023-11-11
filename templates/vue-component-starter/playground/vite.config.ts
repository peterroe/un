import { defineConfig } from 'vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import pkg from '../package.json'

export default defineConfig({
  root: './',
  plugins: [vue(), UnoCSS({
    presets: [
      presetIcons({
        extraProperties: {
          'display': 'inline-block',
          'height': '1.2em',
          'width': '1.2em',
          'vertical-align': 'text-bottom',
        },
      }),
      presetAttributify(),
      presetUno(),
    ],
  })],
  publicDir: './public',
  // keep the same name as your github repos
  base: `/${pkg.name}/`,
  mode: 'production',
  build: {
    outDir: './docs',
  },
})
