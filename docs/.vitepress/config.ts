import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '柏川记录',
  description: '柏川记录 - 个人笔记与常用资源',
  base: '/',
  cleanUrls: true,
  head: [
    ['meta', { name: 'description', content: '柏川记录 - 前端开发与常用资源整理' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }]
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
    ],
    sidebar: [
      {
        text: '文档',
        items: [
          { text: '首页', link: '/' },
          { text: '常用网站', link: '/常用网站' }
        ]
      },
    ],
    search: {
      provider: 'local'
    }
  }
})
