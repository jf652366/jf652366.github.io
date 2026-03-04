import { defineConfig } from 'vitepress';
import { nav, sidebar } from '../src/const';

export default defineConfig({
  title: '柏川知识库',
  description: '柏川知识库',
  base: '/',
  lang: 'zh-CN',
  srcDir: './src',
  cleanUrls: true,
  head: [
    ['meta', { name: 'description', content: '柏川知识库' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }]
  ],
  themeConfig: {
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    nav: nav,
    sidebar: sidebar,
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    }
  }
})




