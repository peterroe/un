<script setup lang="ts">
defineProps<{ repo: string, link?: string, noGit?: boolean, vm: boolean }>()
</script>

<template>
  <div class="-m-t-[3px] ml-2 inline-flex github-star" :class="{ 'vertical-middle' : vm }">
    <a mr-2 target="_blank" :href="link || `https://github.com/${repo}`" class="inline-flex vertical-middle">
      <img inline-block v-lazy="`https://badgen.net/github/stars/${repo}?icon=github&color=4ab8a1&label=`">
    </a>
    <a v-if="!noGit" target="_blank" :href="link || `https://github.com/${repo}/commits`" class="inline-flex vertical-middle">
    <img  inline-block v-lazy="`https://badgen.net/github/last-commit/${repo}?color=4ab8a1&icon=git&label=`">
    </a>
  </div>
</template>
