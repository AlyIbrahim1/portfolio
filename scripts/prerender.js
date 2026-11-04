// Writes the rendered page into dist/index.html so crawlers and first paint get
// the content without running JavaScript; main.tsx then hydrates it.
import { readFile, rm, writeFile } from 'node:fs/promises'

const { render } = await import('../dist-ssr/entry-server.js')
const file = 'dist/index.html'
const html = await readFile(file, 'utf8')
const placeholder = '<div id="root"></div>'
if (!html.includes(placeholder)) throw new Error(`${file} has no ${placeholder}`)

await writeFile(file, html.replace(placeholder, () => `<div id="root">${render()}</div>`))
await rm('dist-ssr', { recursive: true })
