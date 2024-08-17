<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ofetch } from 'ofetch'
import { toHtml } from 'hast-util-to-html'
import { fromHtml } from 'hast-util-from-html'
import type { Element } from 'hast'

const props = defineProps<{
  src: string
}>()

const data = ref()

onMounted(() => {
  ofetch(props.src).then(val => val.text()).then((svgString: string) => {
  if(props.src.endsWith('.excalidraw.svg')) {
    const root = fromHtml(svgString, { fragment: true })
    const svg = root.children[0] as Element
    svg.properties = {
      ...svg.properties,
      // Remove svg tag's height property
      height: '',
      // Add margin Y to better style
      style: 'margin: 16px 0'
    }
    data.value = toHtml(svg)
  } else {
    data.value = svgString
  }
})
})
</script>

<template>
  <div class="svg-wrapper" img-light v-html="data" />
  <div class="svg-wrapper" img-dark invert-90 v-html="data" />
</template>

<style scoped>
.svg-wrapper :deep(svg text) {
    font-family: MonaspaceRadon;
}
.svg-wrapper :deep(svg) {
    width: 100%;
}

.svg-wrapper :deep(text) {
    transform: translateY(3px);
}
</style>
