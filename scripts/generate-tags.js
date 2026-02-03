import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const docsDir = path.resolve(process.cwd(), 'docs')
const tagsDir = path.resolve(docsDir, 'tags')

if (!fs.existsSync(tagsDir)) fs.mkdirSync(tagsDir, { recursive: true })

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

const tagMap = new Map()
for (const file of files) {
  const rel = path.relative(docsDir, file)
  if (rel.startsWith('.vitepress')) continue
  const content = fs.readFileSync(file, 'utf8')
  const parsed = matter(content)
  const title = parsed.data.title || rel.replace(/\\.md$/, '')
  const url = '/' + rel.replace(/\\.md$/, '').replace(/index$/, '').replace(/\\/g, '/')
  const tags = parsed.data.tags || []
  for (const t of tags) {
    const arr = tagMap.get(t) || []
    arr.push({ title, url, date: parsed.data.date || null })
    tagMap.set(t, arr)
  }
}

// write tags index
const tagIndexContent = `---\ntitle: 标签\n---\n\n# 标签\n\n${[...tagMap.keys()].map(t => `- [${t}](/tags/${encodeURIComponent(t)})`).join('\n')}`
fs.writeFileSync(path.join(tagsDir, 'index.md'), tagIndexContent)

for (const [t, posts] of tagMap) {
  posts.sort((a,b) => (b.date || 0) - (a.date || 0))
  const list = posts.map(p => `- [${p.title}](${p.url})`).join('\n')
  const content = `---\ntitle: ${t}\n---\n\n# ${t}\n\n${list}`
  fs.writeFileSync(path.join(tagsDir, `${t}.md`), content)
}

console.log('tags generated', tagMap.size)
