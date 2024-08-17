<script setup lang="ts">
import lz from 'lz-string'
import { ref } from 'vue'
import { ShikiMagicMovePrecompiled } from 'shiki-magic-move/vue'
import { getLangClassIcon } from '../../content'
import type { KeyedTokensInfo } from 'shiki-magic-move/types'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)
const elementId = nanoid()
const id = 'id'
const props = defineProps<{
  stepsLz: string
  stepRanges: string[][]
}>()

const content = JSON.parse(lz.decompressFromBase64(props.stepsLz))

console.log({content})

const step = ref(0)

const toggle = (i: number) => {
  step.value = i
}

</script>

<template>
  <div class="magic-move vp-code-group">
    <div class="tabs">
      <template v-for="(item, index) in content">
        <input :name="elementId" @click="toggle(index)" :checked="index === 0" type="radio" :id="elementId + index">
        <label :for="elementId + index" flex items-center>
          <div inline-block align-middle w-1.2em h-1.2em class="lang-icon" :class="getLangClassIcon(item.fileName)"></div>
          {{ item.fileName }}
        </label>
      </template>
    </div>
    <div class="block">
      <div class="language">
        <ShikiMagicMovePrecompiled :steps="content" :step="step"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (min-width: 640px) {
  .language {
    margin: 0 0 !important;
  }
}

.language {
  position: relative;
  margin: 0 -24px;
  background-color: var(--vp-code-block-bg);
  overflow-x: auto;
  transition: background-color 0.5s;
  border-radius: 0 0 8px 8px;
  font-size: var(--vp-code-font-size);
}

.magic-move :deep(pre) {
  padding-left: 24px;
  padding-right: 24px;
  overflow-y: hidden !important;
  overflow-x: hidden !important;
}
</style>
