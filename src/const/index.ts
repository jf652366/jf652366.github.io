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
            { text: '前端开发', link: '/docs/notes/frontend' },
            { text: '编程基础', link: '/docs/notes/basics' }
          ]
        },
        {
          text: '🛠️ 工具资源',
          items: [
            { text: '在线工具', link: '/docs/tools/online' },
            { text: '开发工具', link: '/docs/tools/dev' },
            { text: '设计工具', link: '/docs/tools/design' }
          ]
        },
        {
          text: '💼 工作相关',
          items: [
            { text: '项目管理', link: '/docs/work/project' },
            { text: '团队协作', link: '/docs/work/collaboration' },
            { text: '开发流程', link: '/docs/work/process' }
          ]
        },
        {
          text: '🤖 AI 相关',
          items: [
            { text: 'AI 工具', link: '/docs/ai/tools' },
            { text: 'AI 学习', link: '/docs/ai/learning' }
          ]
        }
      ]
    }
  ]
}
