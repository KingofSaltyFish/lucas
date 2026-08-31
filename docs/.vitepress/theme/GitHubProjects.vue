<script setup>
import { computed, onMounted, ref } from 'vue'

const username = import.meta.env.VITE_GITHUB_USER || 'KingofSaltyFish'
const repos = ref([])
const loading = ref(true)
const error = ref('')

const projects = computed(() => repos.value
  .filter(repo => !repo.fork && !repo.archived)
  .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at)))

onMounted(async () => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
    if (!response.ok) throw new Error(`GitHub API 返回 ${response.status}`)
    repos.value = await response.json()
  } catch (cause) {
    error.value = cause.message || '暂时无法读取项目'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section id="projects" class="projects" aria-labelledby="projects-title">
    <div class="heading">
      <div>
        <p class="eyebrow">OPEN SOURCE</p>
        <h2 id="projects-title">GitHub 项目</h2>
      </div>
      <a :href="`https://github.com/${username}?tab=repositories`">查看全部 →</a>
    </div>

    <p v-if="loading" class="state">正在读取 GitHub 项目…</p>
    <p v-else-if="error" class="state error">{{ error }}，请稍后刷新。</p>
    <p v-else-if="!projects.length" class="state">还没有可展示的公开仓库。</p>

    <div v-else class="grid">
      <a v-for="repo in projects" :key="repo.id" :href="repo.html_url" class="card">
        <div class="card-top">
          <h3>{{ repo.name }}</h3>
          <span aria-hidden="true">↗</span>
        </div>
        <p>{{ repo.description || '这个项目还没有添加简介。' }}</p>
        <div class="meta">
          <span v-if="repo.language"><i />{{ repo.language }}</span>
          <span>★ {{ repo.stargazers_count }}</span>
          <span>⑂ {{ repo.forks_count }}</span>
        </div>
      </a>
    </div>
  </section>
</template>
