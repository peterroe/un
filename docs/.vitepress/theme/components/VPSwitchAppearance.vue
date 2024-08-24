<script lang="ts" setup>
// reference: https://github.com/antfu/antfu.me/blob/8fcf1ae2636f79836e84ac2772251ce841765020/src/logics/index.ts
import { inject, computed } from 'vue'
import VPSwitch from './VPSwitch.vue'
import { nextTick } from 'vue'
import { useData } from 'vitepress'

const { isDark, theme } = useData()

const toggleAppearance = inject('toggle-appearance', (event) => {
  // @ts-expect-error experimental API
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    isDark.value = !isDark.value
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })
  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: isDark.value
            ? [...clipPath].reverse()
            : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement: isDark.value
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
})

const switchTitle = computed(() => {
  return isDark.value
    ? theme.value.lightModeSwitchTitle || 'Switch to light theme'
    : theme.value.darkModeSwitchTitle || 'Switch to dark theme'
})
</script>

<template>
  <div class="custom-appearance">
    <VPSwitch
      :title="switchTitle"
      class="VPSwitchAppearance custom-switch"
      :aria-checked="isDark"
      @click="toggleAppearance"
    >
      <span class="vpi-sun sun" />
      <span class="vpi-moon moon" />
    </VPSwitch>
  </div>
</template>

<style scoped lang="stylus">
.sun
  opacity 1

.moon
  opacity 0

.dark
  .sun
    opacity 0
  .moon
    opacity 1
  .custom-switch :deep(.check)
    transform: translateX(18px)
</style>
<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 9999;
}
.dark::view-transition-old(root) {
  z-index: 9999;
}
.dark::view-transition-new(root) {
  z-index: 1;
}
</style>
