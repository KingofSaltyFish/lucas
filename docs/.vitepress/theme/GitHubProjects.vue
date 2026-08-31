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
    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`)
    repos.value = await response.json()
  } catch (cause) {
    error.value = cause.message || 'Projects are temporarily unavailable'
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
        <h2 id="projects-title">GitHub projects</h2>
      </div>
      <a :href="`https://github.com/${username}?tab=repositories`">View all →</a>
    </div>

    <p v-if="loading" class="state">Loading GitHub projects…</p>
    <p v-else-if="error" class="state error">{{ error }}. Please refresh later.</p>
    <p v-else-if="!projects.length" class="state">No public repositories are available yet.</p>

    <div v-else class="grid">
      <a v-for="repo in projects" :key="repo.id" :href="repo.html_url" class="card">
        <div class="card-top">
          <h3>{{ repo.name }}</h3>
          <span aria-hidden="true">↗</span>
        </div>
        <p>{{ repo.description || 'No project description has been added yet.' }}</p>
        <div class="meta">
          <span v-if="repo.language"><i />{{ repo.language }}</span>
          <span>★ {{ repo.stargazers_count }}</span>
          <span>⑂ {{ repo.forks_count }}</span>
        </div>
      </a>
    </div>
  </section>
</template>
