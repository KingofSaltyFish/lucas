<script setup>
import { onMounted, ref, watch } from 'vue'

const canvas = ref()
const noise = ref(24)
const response = ref(18)

function draw() {
  const el = canvas.value
  if (!el) return
  const ctx = el.getContext('2d')
  const ratio = devicePixelRatio
  const w = el.clientWidth
  const h = 320
  el.width = w * ratio
  el.height = h * ratio
  ctx.scale(ratio, ratio)
  let estimate = h / 2
  const series = [[], [], []]
  ctx.clearRect(0, 0, w, h)
  ctx.strokeStyle = '#c7b9b4'
  ctx.lineWidth = 1
  for (let y = 40; y < h; y += 60) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
  }
  for (let i = 0; i < 100; i++) {
    const truth = h / 2 + Math.sin(i / 12) * 78
    const measured = truth + Math.sin(i * 3.7) * noise.value
    estimate += (measured - estimate) * (response.value / 100)
    series[0].push(truth); series[1].push(measured); series[2].push(estimate)
  }
  ;['#735c51', '#c7b9b4', '#b55a27'].forEach((color, index) => {
    ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = index === 2 ? 4 : 2
    series[index].forEach((y, x) => x ? ctx.lineTo(x * w / 99, y) : ctx.moveTo(0, y))
    ctx.stroke()
  })
}

onMounted(draw)
watch([noise, response], draw)
</script>

<template>
  <div class="demo-shell kalman-demo">
    <div class="demo-bar"><strong>Kalman Filter Playground</strong><span>Interactive simulation</span></div>
    <canvas ref="canvas" aria-label="Graph comparing true, noisy, and filtered angles" />
    <div class="demo-controls">
      <label>Sensor noise <input v-model.number="noise" type="range" min="4" max="55"></label>
      <label>Filter response <input v-model.number="response" type="range" min="4" max="50"></label>
    </div>
    <div class="demo-legend"><span>True angle</span><span>Noisy reading</span><span>Filtered estimate</span></div>
  </div>
</template>
