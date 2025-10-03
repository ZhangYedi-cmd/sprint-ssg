import { readFile } from 'fs/promises';

import { Plugin } from 'vite';

import { DEAFULT_HTML_PATH } from '../constants';

/**
 * parse template.html entry and return it
 */
export function indexHtmlPlugin(): Plugin {
  return {
    name: 'sprint:index-html',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (_, res, next) => {
        const html = await readFile(DEAFULT_HTML_PATH, 'utf-8');
        try {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          res.end(html);
        } catch (e) {
          return next(e);
        }
      });
    },
  };
}
