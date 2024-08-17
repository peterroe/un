<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { ofetch } from 'ofetch'

const props = defineProps<{
  query?: string
  url: string
  username: string
  link: string
}>()

const info = reactive({
  url: props.url,
  username: props.username,
  link: props.link,
})

onMounted(() => {
  props.query && ofetch(`/.netlify/functions/getPhoto?query=${encodeURIComponent(props.query)}`)
    .then(res => res.json())
    .then((res) => {
      info.url = res.url
      info.username = res.username
      info.link = res.link
    })
})
</script>

<template>
  <Atropos>
    <img rounded h-100 w-full :src="info.url">
    <div text-center my-2>
      Photo by <a :href="info.link">{{ info.username }}</a> on Unsplash
    </div>
  </Atropos>
</template>
