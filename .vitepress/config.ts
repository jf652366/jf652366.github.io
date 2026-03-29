import { defineConfig } from 'vitepress';
import { nav, sidebar } from '../src/const';

export default defineConfig({
  title: '柏川知识库',
  description: '系统整理和分享学习、工作中积累的知识和资源',
  base: '/',
  lang: 'zh-CN',
  srcDir: './src',
  cleanUrls: true,
  head: [
    ['meta', { name: 'description', content: '柏川知识库 - 个人知识管理系统' }],
    ['meta', { name: 'keywords', content: '知识库,前端开发,技术文档,在线工具,学习资源' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
  ],
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true,
    config: async (md) => {
      const { default: footnote } = await import('markdown-it-footnote')
      md.use(footnote)
    }
  },
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '柏川知识库',
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    outlineTitle: '页面目录',
    nav: nav,
    sidebar: sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jf652366' },
      { icon: 'twitter', link: 'https://twitter.com/jf652366' },
      { icon: 'linkedin', link: 'https://linkedin.com/in/jf652366' },
      { icon: 'mail', link: 'mailto:your@email.com' }
    ],
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
    },
    editLink: {
      pattern: 'https://github.com/jf652366/jf652366.github.io/edit/main/src/:path',
      text: '在 GitHub 上编辑此页'
    },
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }
    },
    footer: {
      message: '由 VitePress 驱动',
      copyright: '© 2026 柏川知识库'
    }
  }
})




