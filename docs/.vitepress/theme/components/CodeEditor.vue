<script setup lang="ts">
import { computed, watchEffect, ref, watch } from 'vue'
import { defineClientComponent, useData } from 'vitepress'
import type { ReplProps } from '@vue/repl'
import { ReplStore } from '@vue/repl'

// import Monaco from '@vue/repl/monaco-editor'
import { customAlphabet } from 'nanoid'

const { isDark } = useData()

const props = withDefaults(defineProps<{
  hash?: string
}>(), {
  hash: 'eNp9kUFLwzAUx7/KM5cqzBXZbXQDlYF6UFHBSy6je+sy0yQkL3NQ+t19SdncYezW9//9X/pL24l758a7iGIqqlB75QgCUnRzaVTrrCfowOMaelh720LB1UIaaWprAkEbGpglfl08odYWvq3Xq6viRpqqHI7jg3ggbJ1eEvIEUG3u5l2Xl/u+KnnKqTIuEuxuW7tCPZOCuRRQMqzKk30xEhT49WvVjLfBGjbv0r4UtW2d0ujfHCnWk2IKmSS2ZLvfl5yRjzg65PUG658z+TbsUybFu8eAfodSHBktfYM04MXnK+75+QjZPmpuX4AfGKyOyXGoPUSzYu2TXrZ9zt9fmeYrLPaEJhwulURTs899KfifPF64+r/uZDzJe9L0ov8DExSnNA==',
})
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)
const elementId = nanoid()
const Repl = defineClientComponent(() => {
  return import('@vue/repl').then(d => d.Repl)
})

const Monaco = defineClientComponent(() => {
  return import('@vue/repl/monaco-editor')
})

const theme = computed(() => isDark.value ? 'dark' : 'light')
const store = new ReplStore({
  serializedState: props.hash,
})
let iframe: HTMLIFrameElement

function toggleTheme() {
  iframe?.contentWindow?.postMessage(theme.value)
}

watch(() => theme.value, () => {
  if (!iframe)
    iframe = document.querySelector(`#${elementId} iframe`)
  iframe?.contentWindow?.postMessage(theme.value)
})

const previewTheme = {
  light: `
    color: rgba(60, 60, 67);
    background-color: #ffffff;
  `,
  dark: `
    color: rgba(255, 255, 245, 0.86);
    background-color: #1b1b1f;
  `,
}

const previewOptions: ReplProps['previewOptions'] = {
  // Init
  headHTML: `
      <style>
        body {
          ${previewTheme[theme.value]}
        }
      </style>
          ` + '<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></' + 'script>',
  customCode: {
    useCode: `
        window.addEventListener("message", function(event) {
          const theme = event.data
          console.log('Update theme: ' + theme)
          const body = document.body
          if(theme === 'dark') {
            body.style.color = 'rgba(255, 255, 245, 0.86)'
            body.style.backgroundColor = '#1b1b1f'
          } else {
            body.style.color = 'rgba(60, 60, 67)'
            body.style.backgroundColor = '#ffffff'
          }
        });
      `,
  },
}
const buttonRef = ref()
const showDevCopy = process.env.NODE_ENV === 'development'
async function copyHash() {
  await navigator.clipboard.writeText(store.serialize().slice(1))
  buttonRef.value.classList.add('copied')
  setTimeout(() => {
    buttonRef.value.classList.remove('copied')
    buttonRef.value.blur()
  }, 2000)
}
</script>

<template>
  <div class="code-editor position-relative language-vue">
    <Repl
      :id="elementId"
      class="repl"
      :auto-resize="true"
      :theme="theme"
      :store="store"
      :editor="Monaco"
      :show-compile-output="false"
      :show-ts-config="false"
      :show-import-map="false"
      :preview-options="previewOptions"
      @toggle-theme="toggleTheme"
      @keydown.ctrl.s.prevent
      @keydown.meta.s.prevent
    />
    <button v-if="showDevCopy" ref="buttonRef" position-absolute title="Copy Code" class="copy" @click="copyHash" />
  </div>
</template>

<style scoped>
.repl {
  width: 100%;
}
.code-editor {
  border: 1px solid var(--vp-c-divider)
}
</style>

<style>
.vue-repl .split-pane {
  flex-wrap: wrap;
}
.vue-repl .left {
  width: 100% !important;
  height: 300px !important;
  border-right: none;
}
.vue-repl .iframe-container,
.vue-repl .iframe-container iframe {
  background-color: transparent !important;
}
.vue-repl .right {
  width: 100% !important;
  height: 300px !important;
}
.vue-repl .tab-buttons {
  height: auto !important;
}
.vue-repl .tab-buttons .active {
  /* border-top: 1px solid var(--vp-c-divider) */
  display: none !important;
}
.output-container {
  height: 100% !important;
}
.vue-repl .dragger {
  display: none !important;
}
.msg {
  max-height: none !important;
}
@media (max-width: 720px) {
  .vue-repl .tab-buttons {
    border-top: none
  }
}
</style>import { watch } from 'fs'
, watchEffectcomputed, computed, , watchEffectimport { watch } from 'fs'

