import { build as viteBuild, InlineConfig } from 'vite'
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH, SERVER_OUTPUT_FOLDER, CLIENT_OUTPUT_FOLDER} from '../node/constants'
import pluginReact from '@vitejs/plugin-react';
import { join } from 'path'
import { renderPage } from './renderPage';
import { RollupOutput } from 'rollup'

export const ssgBuild = async (root: string) => {
    // get csr and ssr common vite configs
    const resolveViteConfig = (isServer: boolean) => ({
        mode: "production",
        root,
        plugins: [pluginReact()],
        build: {
          ssr: isServer,
          outDir: isServer ? SERVER_OUTPUT_FOLDER : CLIENT_OUTPUT_FOLDER,
          rollupOptions: {
            input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
            output: {
              format: isServer ? "cjs" : "esm",
            },
          },
        },
    });

  // get hydrate scripts
  const clientBuild = () => viteBuild(resolveViteConfig(false) as InlineConfig)
  // get html Doms rendered by server 
  const serverBuild = () => viteBuild(resolveViteConfig(true) as InlineConfig)

  const [clientBundle] = await Promise.all([clientBuild(), serverBuild()]) as RollupOutput[]

  const serverEntryPath = join(SERVER_OUTPUT_FOLDER, "server-entry.js");

  const { renderSSRPage } = require(serverEntryPath)

  // geneate final pages:  combine script and doms 
  await renderPage(renderSSRPage, root, clientBundle)
}


