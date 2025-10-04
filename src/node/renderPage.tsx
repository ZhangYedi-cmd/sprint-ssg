import * as fs from 'fs-extra'
import { RollupOutput } from 'rollup'
import { join } from 'path'

export async function renderPage(
  render: () => string,
  root: string,
  clientBundle: RollupOutput,
) {
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry,
  )
  console.log(`Rendering page in server side...`)
  const appHtml = render()
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>title</title>
      <meta name="description" content="xxx">
    </head>
    <body>
      <div id="root">${appHtml}</div>
      <script type="module" src="/${clientChunk?.fileName}"></script>
    </body>
  </html>`.trim()
  await fs.ensureDir(join(root, 'build-ssg'))
  await fs.writeFile(join(root, 'build-ssg/index.html'), html)
  await fs.remove(join(root, '.temp'))
}
