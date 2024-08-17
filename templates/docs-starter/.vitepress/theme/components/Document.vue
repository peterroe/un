<script setup lang="ts">
defineProps<{ link?: string, name?: string }>()
</script>

<template>
  <span>
    <mdi-file-document class="inline-block opacity-70" />
    <a
      class="opacity-50 ml-1"
      :href="link"
      target="_blank"
    >{{ name || link }}</a>
  </span>
</template>
