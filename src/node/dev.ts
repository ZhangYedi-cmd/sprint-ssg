import { createServer } from 'vite';
import { indexHtmlPlugin } from './plugin-sprint/indexHtml';

/**
 * @description Dev Server
 * @param root Root path
 * @returns Server
 * **/
export async function createDevServer(root = process.cwd()) {
  const server = await createServer({
    root,
    plugins: [indexHtmlPlugin()],
  });
  return server;
}
