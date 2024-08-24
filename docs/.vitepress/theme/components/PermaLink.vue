<script setup lang="ts">
import type { ShikiTransformer } from 'shiki'
import { addClassToHast, getHighlighter, bundledLanguages } from 'shiki'
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import { onMounted, ref } from 'vue'
import { data } from '../data/permalink.data'
import { getLangClassIcon } from '../../content'

const props = defineProps<{
  id: string
  focus?: Array<number>
  highlights?: Array<number>
  omits?: Array<[from: string, to: string]>
}>()

const code = ref('')

const item = data[props.id]
const transformers: ShikiTransformer[] = [
  transformerNotationDiff(),
  transformerNotationFocus({
    classActiveLine: 'has-focus',
    classActivePre: 'has-focused-lines',
  }),
  transformerNotationHighlight({
    classActiveLine: 'highlighted',
  }),
  transformerNotationErrorLevel(),
  {
    pre(hast) {
      hast.properties.style = ''
      addClassToHast(hast, ['vp-code'])
      if (props.focus)
        addClassToHast(hast, 'has-focused-lines')
    },
    line(hast, number) {
      if (props.focus && props.focus.includes(number) && hast.type === 'element')
        addClassToHast(hast, 'has-focus')

      if (props.highlights && props.highlights.includes(number) && hast.type === 'element')
        addClassToHast(hast, 'highlighted')
    },
  },
]

onMounted(async () => {
  const hasDarkClass = document.documentElement.classList.contains('dark')
  const shiki = await getHighlighter({
    themes: ['vitesse-dark', 'vitesse-light'],
    langs: ['javascript', 'css', 'typescript', 'json'],
  })
  const lang = item.language in bundledLanguages ? item.language : 'typescript'
  const afterRawCode = props.omits ? omitCodeLines(item.codeRaw) : item.codeRaw
  code.value = shiki.codeToHtml(afterRawCode, { lang, theme: hasDarkClass ? 'vitesse-dark' : 'vitesse-light', transformers })
})

const linesText = ref<(string | number)[]>(
  Array.from({ length: item.endLine - item.startLine + 1 })
    .map((_, i) => i + item.startLine),
)

function omitCodeLines(codeRaw: string) {
  const omitLines = props.omits.map(([from, to = from]) => ([Number(from) - item.startLine, Number(to) - item.startLine]))
    .reduce((pre, cur) => {
      const [from, to = from] = cur
      for (let i = from; i <= to; i++)
        pre.push(i)

      return pre
    }, [])

  linesText.value = omit(linesText.value, omitLines, '...')

  return omit(codeRaw.split('\n'), omitLines).join('\n')
}

function omit(array: Array<string | number>, omitLines: Array<number>, p: string = '') {
  const placeholder = '__PLACEHOLDER__'
  let isClose = true

  return array
    .map((it, i) => omitLines.includes(i) ? placeholder : it)
    .filter((it) => {
      if (it === placeholder) {
        if (isClose) {
          isClose = false
          return true
        }
        return false
      }
      else {
        isClose = true
        return true
      }
    })
    .map(it => it === placeholder ? p : it)
}

const buttonRef = ref()
async function copyClick() {
  await navigator.clipboard.writeText(item.codeRaw)
  buttonRef.value.classList.add('copied')
  setTimeout(() => {
    buttonRef.value.classList.remove('copied')
    buttonRef.value.blur()
  }, 2000)
}
</script>

<template>
  <div class="github-permalink">
    <div class="language- vp-adaptive-theme" border="1 solid #ddd">
      <div class="px-16px py-5px github-permalink-header">
        <a text-sm :href="item.link">{{ item.fileFullPath }}</a>
        <div text-xs class="text-[#6E7781]">
          Lines {{ item.startLine }} <span v-if="item.startLine !== item.endLine">to {{ item.endLine }}</span> <a :href="item.diffLink">#{{ item.commitId.slice(0, 7) }}</a>
        </div>
      </div>
      <div flex text-sm>
        <div class="ml-20px mr-20px" flex flex-col text-right justify-around>
          <div v-for="(num, index) in linesText" :key="index" style="font-size: 12px;!important;" class="text-[#6E7781]">
            {{ num }}
          </div>
        </div>
        <div text-sm flex-1 overflow="auto" v-html="code" />
      </div>
      <button ref="buttonRef" title="Copy Code" class="copy" @click="copyClick" />
      <span class="lang icon" :class="getLangClassIcon(item.fileName)"></span>
    </div>
  </div>
</template>

<style>
.vp-doc .github-permalink [class*='language-'] code {
  min-width: 100%;
  padding-left: 0;
}

.vp-doc .github-permalink [class*='language-'] pre {
  min-width: auto;
  padding: 0;
}

.vp-doc .github-permalink [class*='language-'] pre {
  min-width: auto;
  padding: 0;
  overflow: scroll;
}

.vp-doc .github-permalink [class*='language-'] pre::-webkit-scrollbar {
  display: none;
}

.vp-doc .github-permalink [class*='language-'] {
  background-color: #fdfdfd;
}

.dark .vp-doc .github-permalink [class*='language-'] {
  background-color: #161617;
}

.github-permalink-header {
  background-color: #f2f4f6;
  border-bottom: 1px solid #ddd;
}
.dark .github-permalink-header {
  background-color: #111;
  border-bottom: 1px solid #333;
}

.dark .github-permalink-header a {
  opacity: 0.7;
}

.github-permalink [class*='language-'] {
  border: 1px solid #ddd;
}

.dark .github-permalink [class*='language-'] {
  border: 1px solid #333;
}
</style>
