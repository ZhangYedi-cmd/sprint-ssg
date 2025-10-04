import { createServer } from 'vite'
import { indexHtmlPlugin } from './plugin-sprint/indexHtml'
import pluginReact from '@vitejs/plugin-react'
/**
 * @description Dev Server
 * @param root Root path
 * @returns Server
 * **/
export async function createDevServer(root = process.cwd()) {
  const server = await createServer({
    root,
    plugins: [indexHtmlPlugin(), pluginReact()],
  })
  return server
}
