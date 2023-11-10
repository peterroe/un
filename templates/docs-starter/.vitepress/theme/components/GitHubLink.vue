<script setup lang="ts">
defineProps<{ repo: string }>()
</script>

<template>
  <span class="inline-flex items-center rounded border" style="vertical-align: sub;">
    <i-carbon-logo-github class="inline-block opacity-70" />
    <a
      class="ml-1"
      :href="`https://github.com/${repo}`"
      target="_blank"
    >{{ repo }}</a>
  </span>
</template>
