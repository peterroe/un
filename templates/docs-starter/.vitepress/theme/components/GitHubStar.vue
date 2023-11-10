<script setup lang="ts">
defineProps<{ repo: string }>()
</script>

<template>
  <a :href="`https://github.com/${repo}`">
    <img inline-block :src="`https://badgen.net/github/stars/${repo}?icon=github&color=4ab8a1`">
  </a>
</template>
