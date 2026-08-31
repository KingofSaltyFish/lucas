import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Lucas · Developer & Maker',
  description: 'A high school developer portfolio exploring code, physics, games, and engineering.',
  head: [['meta', { name: 'theme-color', content: '#3451b2' }]],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Projects',
        items: [
          { text: 'Kalman Filter Research', link: '/projects/kalman-filter-research' },
          { text: 'Showdown Arena', link: '/projects/showdown-arena' },
          { text: 'Block Clash', link: '/projects/block-clash' },
          { text: 'Royale Impostor', link: '/projects/royale-impostor' }
        ]
      },
      { text: 'GitHub', link: 'https://github.com/KingofSaltyFish' }
    ],
    sidebar: {
      '/projects/': [
        {
          text: 'Selected Projects',
          items: [
            { text: 'Kalman Filter Research', link: '/projects/kalman-filter-research' },
            { text: 'Showdown Arena', link: '/projects/showdown-arena' },
            { text: 'Block Clash', link: '/projects/block-clash' },
            { text: 'Royale Impostor', link: '/projects/royale-impostor' }
          ]
        }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/KingofSaltyFish' }],
    footer: { message: 'Designed and built with VitePress', copyright: '© Lucas' },
    search: { provider: 'local' }
  }
})
