import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Feed } from 'feed'

const docsDir = path.resolve(process.cwd(), 'docs')
const outDir = path.resolve(process.cwd(), 'docs/public')

const site = {
  title: 'jf652366',
  description: '迁移后的 VitePress 站点',
  id: 'https://jf652366.github.io',
  link: 'https://jf652366.github.io'
}

const files = []

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const res = path.resolve(dir, entry.name)
    if (entry.isDirectory()) walk(res)
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(res)
  }
}

walk(docsDir)

const posts = []
for (const file of files) {
  const rel = path.relative(docsDir, file)
  if (rel.startsWith('.vitepress')) continue
  const content = fs.readFileSync(file, 'utf8')
  const parsed = matter(content)
  const title = parsed.data.title || rel
  const date = parsed.data.date ? new Date(parsed.data.date) : null
  const url = site.link + '/' + rel.replace(/\\.md$/, '').replace(/index$/, '').replace(/\\/g, '/')
  posts.push({ title, date, url, excerpt: parsed.data.description || '', content: parsed.content })
}

posts.sort((a, b) => (b.date || 0) - (a.date || 0))

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

// RSS
const feed = new Feed({
  title: site.title,
  description: site.description,
  id: site.id,
  link: site.link
})

for (const p of posts) {
  feed.addItem({
    title: p.title,
    id: p.url,
    link: p.url,
    description: p.excerpt,
    content: p.content,
    date: p.date || new Date()
  })
}

fs.writeFileSync(path.join(outDir, 'rss.xml'), feed.rss2())
console.log('rss.xml generated')

// sitemap
const urls = posts.map(p => p.url)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map(u => `  <url>\n    <loc>${u}</loc>\n  </url>`)
  .join('\n')}\n</urlset>`
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap)
console.log('sitemap.xml generated')
