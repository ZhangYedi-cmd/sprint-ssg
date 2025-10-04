import { readFile } from 'fs/promises'
import { Plugin } from 'vite'
import { DEAFAULT_HTML_PATH, CLIENT_ENTRY_PATH } from '../constants'

/**
 * parse template.html entry and return it
 */
export function indexHtmlPlugin(): Plugin {
  return {
    name: 'sprint:index-html',
    apply: 'serve',
    // auto inject script tag for entry HTML
    transformIndexHtml(html) {
      console.log(html)
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              type: 'module',
              src: `/@fs/${CLIENT_ENTRY_PATH}`,
            },
            injectTo: 'body',
          },
        ],
      }
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let html = await readFile(DEAFAULT_HTML_PATH, 'utf-8')

          try {
            html = await server.transformIndexHtml(
              req.url,
              html,
              req.originalUrl,
            )
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(html)
          } catch (e) {
            return next(e)
          }
        })
      }
    },
  }
}
