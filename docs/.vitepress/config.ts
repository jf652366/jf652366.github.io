import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '柏川记录',
  description: '柏川记录',
  base: '/',
  cleanUrls:true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '常用', link: '/常用网站' }
    ],
     search: {
      provider: 'local'
    }
  }
})
