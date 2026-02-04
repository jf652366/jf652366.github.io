import fs from 'fs'
import path from 'path'
import { nameMap } from './const'
const docsRoot = path.resolve(__dirname, '..')

export function generateNav() {
  return fs.readdirSync(docsRoot)
    .filter(name =>
      fs.statSync(path.join(docsRoot, name)).isDirectory() &&
      !name.startsWith('.') &&
      name !== 'public'
    )
    .map(name => ({
      text: nameMap[name] || name,
      link: `/${name}/`
    }))
}
