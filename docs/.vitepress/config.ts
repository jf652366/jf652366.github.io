import { defineConfig } from 'vitepress'
import { generateSidebar } from './sidebar'
import { generateNav } from './nav'

import fs from 'fs'
import path from 'path'

function getAutoSidebar(dir: string) {
  const fullPath = path.resolve(__dirname, '..', dir)

  return [
    {
      text: dir,
      collapsed: false,
      items: fs.readdirSync(fullPath)
        .filter(f => f.endsWith('.md'))
        .map(file => ({
          text: file.replace('.md', ''),
          link: `/${dir}/${file.replace('.md', '')}`
        }))
    }
  ]
}


export default defineConfig({
  title: '知识系统',
  description: '柏川知识系统',
  base: '/',
  lang: 'zh-CN', 
  cleanUrls: true,
  head: [
    ['meta', { name: 'description', content: '柏川记录 - 前端开发与常用资源整理' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }]
  ],
  themeConfig: {
    outlineTitle: '目录',        // 右侧 TOC
    lastUpdatedText: '最后更新',
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    returnToTopLabel: '回到顶部',
    nav: generateNav(),
    sidebar: generateSidebar(),
    search: {
      provider: 'local',
      options:{
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '没有结果',
            resetButtonTitle: '清除',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
      
    }
  }
})




