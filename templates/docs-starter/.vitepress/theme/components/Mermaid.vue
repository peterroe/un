<script setup lang="ts">
import { watch, ref } from 'vue'
import { useData } from 'vitepress'
import type { MermaidConfig } from 'mermaid'
import mermaid from 'mermaid'

const props = defineProps({
  graph: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
})

const { isDark } = useData()
const svg = ref('')

watch(() => isDark.value, async () => {
  await renderChart()
}, {
  immediate: true
})

const themeCSS = `
// .cluster rect {
//     stroke: var(--vp-c-brand-1) !important;
// }
.edgeLabel {
    background: transparent
}
.marker, .flowchart-link {
    stroke: var(--vp-c-brand-1);
    fill: var(--vp-c-brand-1);
}
`

async function renderChart() {
  const mermaidConfig: MermaidConfig = {
    securityLevel: 'loose',
    startOnLoad: false,
    theme: isDark.value ? 'dark' : 'base',
    themeCSS,
    themeVariables: {
      // primaryColor: '#a9c729',
      // mainBkg: '#fff',
      // secondColor: '#008269'
      noteBkgColor: 'red',
      labelBoxBkgColor: 'blue',
      // edgeLabelBackground: '#fff',
      // lineColor: '#00a98e',
      tertiaryColor: '#fff',
      tertiaryBorderColor: '#ddddde',
    },
  }

  mermaid.initialize(mermaidConfig)
  const code = decodeURIComponent(props.graph)
  svg.value = (await mermaid.render(props.id, code)).svg
}
</script>

<template>
  <div :class="isDark ? 'vp-code-dark' : 'vp-code-light'" class="my-mermaid text-center">
    <div v-html="svg" />
  </div>
</template>
