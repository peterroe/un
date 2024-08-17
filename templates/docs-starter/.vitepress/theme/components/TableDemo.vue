<script setup lang="ts">
defineProps<{
  noAnimateBorder?: boolean
  half?: boolean
  noFixedSvgSize?: boolean
}>()
</script>

<template>
  <div class="table-demo" b="1 solid">
    <div
      :class="half ? 'w-1/2' : 'w-3/4'"
      class="fence" py-0 px-4 flex="~ items-center justify-center"
    >
      <slot name="fence" />
    </div>
    <div
      :class="[
        half ? 'w-1/2' : 'w-1/4',
        noAnimateBorder ? '' : 'animate-border',
        noFixedSvgSize ? '' : 'fix-svg-size',
      ]"
      class="play" p-2 flex="~ items-center justify-center wrap"
    >
      <slot name="play" />
    </div>
  </div>
</template>

<style scoped>
.table-demo {
  display: flex;
  border-color: var(--vp-c-divider);
}
.fence {
  border-right: 1px solid var(--vp-c-divider);
}
.fence :deep([class*='language-']){
  width: 100%;
}

.animate-border :deep(svg){
  border: 1px solid var(--vp-c-brand-1);
  box-sizing: content-box;
}

.fix-svg-size :deep(svg){
  width: 150px;
  height: 100px;
}

@media (max-width: 768px) {
  .table-demo {
    display: block;
  }
  .fence {
    border: none;
    border-bottom: 1px solid var(--vp-c-divider);
    width: 100%;
  }
  .play {
    width: 100%;
  }
}
</style>
