<script setup lang="ts">
import { useData } from 'vitepress'
import { onMounted } from 'vue'
const { isDark } = useData()
defineProps<{
  conversation?: 'none'
}>()

onMounted(() => {
  // @ts-expect-error cdn
  // window.twttr.widgets.load()
})
</script>

<template>
  <div class="tweet">
    <div v-show="isDark" flex items-center justify-center>
      <blockquote
        class="twitter-tweet"
        data-theme="dark"
        :data-conversation="conversation ? conversation : undefined"
      >
        <slot />
      </blockquote>
    </div>
    <div v-show="!isDark" flex items-center justify-center>
      <blockquote
        class="twitter-tweet"
        data-theme="light"
        :data-conversation="conversation ? conversation : undefined"
      >
        <slot />
      </blockquote>
    </div>
  </div>
</template>

<style>
.tweet .twitter-tweet-rendered {
  overflow: hidden;
  padding: 3px;
}
.tweet iframe {
  border-radius: 11px;
}
</style>
