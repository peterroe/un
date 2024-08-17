<script setup lang="ts">
import { filesize } from 'filesize'
import { computed, ref } from 'vue'
import { data } from '../data/filesize.data'
const props = defineProps<{
  src: string;
  rawSize: string;
}>()

const size = ref('- px')
const fileName = computed(() => {
  const paths = props.src.split('/')
  const result = paths.pop()
  return result
})

async function handleDownload() {
  if(!props.src) return
  // const blob = await (await fetch(props.src)).blob()
  // const downloadUrl = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = props.src;
  downloadLink.download = props.src;
  downloadLink.click();
}

if(/^(http|https):\/\//i.test(props.src) && !props.rawSize) {
  fetch(props.src).then(val => val.blob()).then(blob => {
    size.value = filesize(blob.size)
  })
} else if(!props.rawSize){
  if(props.src in data) {
    size.value = filesize(data[props.src].size)
  }
}
</script>

<template>
  <button @click="handleDownload" class="downloadButton" h-15 rounded py-2 px-3>
    <div  text-left text-base>{{ fileName }}</div>
    <div class="size" text-sm>
      <span>{{ props.rawSize ?? size }}</span>
      <MaterialSymbolsDownload2/>
    </div>
  </button>
</template>

<style>
.downloadButton {
  min-width: 30%;
  width: fit-content;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  margin-right: 8px;
}
.size {
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
