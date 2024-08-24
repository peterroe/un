<script setup lang="ts">
defineProps<{ repo: string, name?: string, link?: string }>()
</script>

<template>
  <span>
    <carbon-logo-github class="inline-block opacity-70" />
    <a
      class="opacity-50 ml-1"
      :href="link || `https://github.com/${repo}`"
      target="_blank"
    >{{ name || repo }}</a>
  </span>
</template>
