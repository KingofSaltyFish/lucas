import DefaultTheme from 'vitepress/theme'
import GitHubProjects from './GitHubProjects.vue'
import DemoFrame from './DemoFrame.vue'
import KalmanDemo from './KalmanDemo.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('GitHubProjects', GitHubProjects)
    app.component('DemoFrame', DemoFrame)
    app.component('KalmanDemo', KalmanDemo)
  }
}
