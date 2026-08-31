import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Lucas · GitHub Projects',
  description: 'Lucas 的 GitHub 代码与项目展示',
  head: [['meta', { name: 'theme-color', content: '#3451b2' }]],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'GitHub', link: 'https://github.com/KingofSaltyFish' }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/KingofSaltyFish' }],
    footer: { message: 'Built with VitePress', copyright: '© Lucas' },
    search: { provider: 'local' }
  }
})
