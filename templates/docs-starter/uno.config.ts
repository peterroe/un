import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss'
import { iconSafeList } from './.vitepress/content'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
  ],
  rules: [
    ['bg-var-band', { 'background-color': 'var(--vp-c-brand-1)' }],
    ['border-var-band', { border: '1px solid var(--vp-c-brand-1)' }],
  ],
  safelist: [
    ...iconSafeList,
    ...Array.from({ length: 20 }, (_, i) => `delay-${i * 80}`),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
