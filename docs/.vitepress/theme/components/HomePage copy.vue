<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { VPHomeContent } from 'vitepress/theme'
</script>

<template>
  <div
    ref="changelogTimeLine"
    position-relative
    mt-20
  >
    <VPHomeContent>
      <h1 text-4xl text-center>CHANGELOG</h1>
    </VPHomeContent>
  </div>
</template>

<style scoped lang="stylus">

</style>
