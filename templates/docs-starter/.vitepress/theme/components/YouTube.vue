<script setup lang="ts">
defineProps<{ v: string }>()
</script>

<template>
  <span>
    <LogosYoutubeIcon class="inline-block opacity-70" />
    <a
      class="opacity-50 ml-1"
      :href="`https://www.youtube.com/watch?v=${v}`"
      target="_blank"
    >{{ v }}</a>
  </span>
</template>
