export const nav = [
  {
    text: '首页',
    link: '/'
  },
  {
    text: '文档',
    items: [
      { text: '学习笔记', link: '/docs/notes' },
      { text: '技术文档', link: '/docs/tech' },
      { text: '工具介绍', link: '/docs/tools' }
    ]
  },
  {
    text: '资源',
    items: [
      { text: '常用网站', link: '/docs/notes/01-常用网站' },
      { text: '开发资源', link: '/docs/resources' }
    ]
  },
  {
    text: '简历',
    link: '/resume'
  },
  {
    text: '关于',
    link: '/about'
  }
]

export const sidebar = {
  '/docs/': [
    {
      text: '笔记分类',
      items: [
        {
          text: '📚 学习笔记',
          items: [
            { text: '常用网站', link: '/docs/notes/01-常用网站' },
            { text: '改善既有代码的设计', link: '/docs/notes/02-改善既有代码的设计' }
          ]
        },
        {
          text: '🛠️ 工具资源',
          items: [
            { text: '工具介绍', link: '/docs/tools' }
          ]
        },
        {
          text: '💼 工作相关',
          items: [
            { text: '工作经验', link: '/docs/work' }
          ]
        },
        {
          text: '🤖 AI 相关',
          items: [
            { text: 'AI 资源', link: '/docs/ai' }
          ]
        }
      ]
    }
  ]
}
