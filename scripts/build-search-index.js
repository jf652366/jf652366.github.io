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

// Also generate a public search-index.json for the static site (from public/search.xml)
const publicXmlPath = path.resolve(process.cwd(), 'public', 'search.xml')
if (fs.existsSync(publicXmlPath)) {
  const xml = fs.readFileSync(publicXmlPath, 'utf8')
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g
  const titleRe = /<title>([\s\S]*?)<\/title>/
  const urlRe = /<url>([\s\S]*?)<\/url>/
  const contentRe = /<content><!\[CDATA\[([\s\S]*?)\]\]><\/content>/
  const tagRe = /<tag>([\s\S]*?)<\/tag>/g

  const publicIndex = []
  let m
  while ((m = entryRegex.exec(xml)) !== null) {
    const block = m[1]
    const t = (block.match(titleRe) || [])[1] || ''
    const u = (block.match(urlRe) || [])[1] || ''
    const raw = (block.match(contentRe) || [])[1] || ''
    const body = raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    const tags = []
    let tt
    while ((tt = tagRe.exec(block)) !== null) tags.push(tt[1])
    publicIndex.push({ title: t.trim(), url: u.trim(), body, tags })
  }

  const publicOut = path.resolve(process.cwd(), 'public', 'search-index.json')
  fs.writeFileSync(publicOut, JSON.stringify(publicIndex, null, 2))
  console.log('public/search-index.json generated', publicIndex.length, 'entries')
}
