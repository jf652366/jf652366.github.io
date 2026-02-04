import fs from 'fs'
import path from 'path'
import { nameMap } from './const'

const docsRoot = path.resolve(__dirname, '..')

function getItems(dir: string) {
  const full = path.join(docsRoot, dir)

  return fs.readdirSync(full)
    .filter(f => f.endsWith('.md') && f.toLowerCase() !== 'index.md'   )
    .sort((a, b) => a.localeCompare(b, 'zh'))
    .map(file => ({
      text: file.replace(/^\d+-/, '').replace('.md', ''),
      link: `/${dir}/${file.replace('.md', '')}`
    }))
}

export function generateSidebar() {
  const sections = fs.readdirSync(docsRoot)
    .filter(name =>
      fs.statSync(path.join(docsRoot, name)).isDirectory() &&
      !name.startsWith('.') &&
      name !== 'public'
    )

  const sidebar: any = {}

  sections.forEach(section => {
    sidebar[`/${section}/`] = [
      {
        text: nameMap[section] || section,
        link: `/${section}/`,
        collapsed: false,
        items: getItems(section)
      }
    ]
  })

  sidebar['/'] = [
    {
      text: '开始',
      items: [
        { text: '首页', link: '/' }
      ]
    }
  ]

  return sidebar
}
