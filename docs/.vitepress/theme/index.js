import DefaultTheme from 'vitepress/theme'
import GitHubProjects from './GitHubProjects.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('GitHubProjects', GitHubProjects)
  }
}
