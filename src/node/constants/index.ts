import { join } from 'path'

const PACKAGE_ROOT = join(__dirname, '..', '..', '..')

const DEAFAULT_HTML_PATH = join(PACKAGE_ROOT, 'template.html')

const CLIENT_ENTRY_PATH = join(
  PACKAGE_ROOT,
  'src',
  'runtime',
  'client-entry.tsx',
)

const SERVER_ENTRY_PATH = join(
  PACKAGE_ROOT,
  'src',
  'runtime',
  'server-entry.tsx',
)

const COMMON_OUTPUT_FOLDER = join(PACKAGE_ROOT,'build-ssg')
const SERVER_OUTPUT_FOLDER = join(COMMON_OUTPUT_FOLDER, '.temp')
const CLIENT_OUTPUT_FOLDER = join(COMMON_OUTPUT_FOLDER, 'build')

export {
  PACKAGE_ROOT,
  DEAFAULT_HTML_PATH,
  CLIENT_ENTRY_PATH,
  SERVER_ENTRY_PATH,
  COMMON_OUTPUT_FOLDER,
  SERVER_OUTPUT_FOLDER,
  CLIENT_OUTPUT_FOLDER
}
