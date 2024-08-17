<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  id: string
}>()

const mdn_url = ref('')
const chromeState = ref(false)
const edgeState = ref(false)
const firefoxState = ref(false)
const safariState = ref(false)
const nodejsState = ref(false)

const show = ref(false)
const t = ref()
const wrapper = ref()
const isActive = ref(false)

function watchWrapper() {
  wrapper.value?.addEventListener('mouseenter', () => {
    isActive.value = true
  })
  wrapper.value?.addEventListener('mouseleave', () => {
    isActive.value = false
  })
}

onMounted(async () => {
  watchWrapper()
  const link = `https://cdn.jsdelivr.net/gh/mdn/browser-compat-data/${props.id}.json`
  const json = await fetch(link).then(data => data.json())
  const objPathKey = props.id.split('/').filter(path => path !=='_globals')
  let target = json
  for(let key of objPathKey) {
    if(key in target) {
      target = target[key]
    }
  }
  target = target.__compat
  t.value = target
  console.log({json, target})
  mdn_url.value = target.mdn_url

  if(typeof target.support.chrome === 'string' || target.support.chrome?.version_added)
    chromeState.value = true
  if(typeof target.support.edge === 'string' || target.support.edge?.version_added)
    edgeState.value = true
  if(typeof target.support.firefox === 'string' || target.support.firefox?.version_added)
    firefoxState.value = true
  if(typeof target.support.safari === 'string' || target.support.safari?.version_added)
    safariState.value = true
  if(typeof target.support.nodejs === 'string' || target.support.nodejs?.version_added)
    nodejsState.value = true
  
  show.value = true
})
// https://github.com/mdn/browser-compat-data
</script>

<template>
  <a :href="mdn_url" class="link" :class="{ 'active': isActive }" ref="wrapper">
    <Transition>
      <span v-if="show && (chromeState || edgeState || firefoxState || safariState || nodejsState)">
        <div inline-flex>
            <div class="icon-box" v-if="chromeState">
              <LogosChrome/>
              <span class="icon-text">{{ t.support.safari?.version_added || t.support.safari }}</span>
            </div>
          <div class="icon-box" v-if="edgeState">
            <LogosMicrosoftEdge/>
            <span class="icon-text">{{ t.support.edge?.version_added || t.support.edge }}</span>
          </div>
          <div class="icon-box" v-if="firefoxState">
            <LogosFirefox/>
            <span class="icon-text">{{ t.support.firefox?.version_added || t.support.firefox }}</span>
          </div>
          <div class="icon-box" v-if="safariState">
            <LogosSafari/>
            <span class="icon-text">{{ t.support.safari?.version_added || t.support.safari }}</span>
          </div>
          <div class="icon-box" v-if="nodejsState">
            <LogosNodejsIconAlt/>
            <span class="icon-text">{{ t.support.nodejs?.version_added || t.support.nodejs }}</span>
          </div>
        </div>
        <MaterialSymbolsCheckCircleOutlineRounded class="check" ml-3 mr-2 text-green/>
      </span>
    </Transition>
    <Transition>
      <span v-if=" show && (!chromeState || !edgeState || !firefoxState || !safariState || !nodejsState)" class="unsupported">
        <div inline-flex>
          <div w-4 v-if="!chromeState"><LogosChrome/></div>
          <div w-4 v-if="!edgeState"><LogosMicrosoftEdge/></div>
          <div w-4 v-if="!firefoxState"><LogosFirefox/></div>
          <div w-4 v-if="!safariState"><LogosSafari/></div>
          <div w-4 v-if="!nodejsState"><LogosNodejsIconAlt/></div>
        </div>
        <MaterialSymbolsCancelOutlineRounded ml-3 text-red/>
      </span>
      </Transition>
  </a>
</template>

<style scoped>
.link .icon-box {
  width: 1rem;
}
.link svg {
  vertical-align: middle !important;
}
.link .icon-text {
  font-size: 14px;
  vertical-align: middle;
  padding: 0 6px;
  /* background-color: #ddd; */
  border-radius: 4px;
  display: none;
}
.link.active .icon-box {
  width: inherit;
}
.link.active .icon-text {
  display: inline-block;
}

.link.active .unsupported,
.link.active .check {
  display: none;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
