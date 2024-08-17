<template>
  <div>
    <ClientOnly>
        <img v-if="keepRaw" :src="props.src">
        <img v-if="!keepRaw" w-full v-viewer m-auto img-light :class="anti ? 'invert-90' : ''" :src="props.src" />
        <img v-if="!keepRaw" w-full v-viewer m-auto img-dark :class="anti ? '' : 'invert-90'" :src="props.src" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string
  anti: boolean
  keepRaw: boolean
}>()
</script>
