<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  source: String,
  html: String,
  css: String,
  js: String,
  height: { type: Number, default: 620 }
})

const document = ref('')
const error = ref('')

onMounted(async () => {
  try {
    const get = async url => {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`Could not load demo (${response.status})`)
      return response.text()
    }
    let html = props.source ? await get(props.source) : await get(props.html)
    if (props.css) html = html.replace(/<link[^>]+style\.css[^>]*>/i, `<style>${await get(props.css)}</style>`)
    if (props.js) html = html.replace(/<script[^>]+script\.js[^>]*><\/script>/i, `<script>${await get(props.js)}<\/script>`)
    document.value = html.replace('<head>', '<head><meta name="viewport" content="width=device-width,initial-scale=1"><style>canvas,.menu-screen{max-width:100%;height:auto}body{overflow-x:hidden}</style>')
  } catch (cause) {
    error.value = cause.message || 'The demo could not be loaded.'
  }
})
</script>

<template>
  <div class="demo-shell">
    <div class="demo-bar"><strong>{{ title }}</strong><span>Live browser demo</span></div>
    <p v-if="error" class="demo-state error">{{ error }}</p>
    <p v-else-if="!document" class="demo-state">Loading the latest version from GitHub…</p>
    <iframe v-else :title="title" :srcdoc="document" :style="{ height: `${height}px` }" sandbox="allow-scripts" loading="lazy" />
  </div>
</template>
