<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<template>
  <span>
    <LogosNpmIcon class="inline-block opacity-70" />
    <a
      class="opacity-50 ml-1"
      :href="`https://www.npmjs.com/package/${name}`"
      target="_blank"
    >{{ name }}</a>
  </span>
</template>
