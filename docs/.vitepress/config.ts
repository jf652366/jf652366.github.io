import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'jf652366',
  description: '迁移后的 VitePress 站点',
  base: '/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '常用', link: '/常用网站' }
    ],
    sidebar: [
      {
        text: '文档',
        items: [
          { text: '常用网站', link: '/常用网站' }
        ]
      }
    ],
     search: {
      provider: 'local'
    }
  }
})