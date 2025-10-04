import path = require('path')
import { cac } from 'cac'
import { createDevServer } from './dev'
import { ssgBuild } from './build'
const version = require('../../package.json').version

const cli = cac('sprint').version(version).help()

cli
  .command('[root]', 'start dev server')
  .alias('dev')
  .action(async (root: string) => {
    root = root ? path.resolve(root) : process.cwd()
    const server = await createDevServer(root)
    await server.listen()
    server.printUrls()
  })

cli
  .command('build [root]', 'build for production')
  .action(async (root: string) => {
    try {
      console.log('🔥🔥🔥 ssg build start 🚀🚀🚀 ')
      await ssgBuild(root)
      console.log('📦📦📦 congratulations!!! ssg build DONE 📦📦📦 ')
    } catch (e) {
      console.log(e)
    }
  })

cli.parse()
