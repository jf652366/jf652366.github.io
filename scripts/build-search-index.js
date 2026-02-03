import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const docsDir = path.resolve(process.cwd(), 'docs')
const outDir = path.resolve(process.cwd(), 'docs/public')

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

const index = []

for (const file of files) {
  const rel = path.relative(docsDir, file)
  if (rel.startsWith('.vitepress')) continue
  const content = fs.readFileSync(file, 'utf8')
  const parsed = matter(content)
  const title = parsed.data.title || parsed.data.name || rel.replace(/\.md$/, '')
  const url = '/' + rel.replace(/\\.md$/, '').replace(/index$/, '').replace(/\\/g, '/')
  const body = parsed.content.replace(/[#>*`\[\]]/g, ' ')
  index.push({ title, url, body, tags: parsed.data.tags || [] })
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'search-index.json'), JSON.stringify(index, null, 2))
console.log('search-index.json generated', index.length, 'entries')
