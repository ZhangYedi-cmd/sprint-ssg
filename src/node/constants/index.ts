import { join } from 'path';

const PACKAGE_ROOT = join(__dirname, '..', '..', '..');

const DEAFAULT_HTML_PATH = join(PACKAGE_ROOT, 'template.html');

export { PACKAGE_ROOT, DEAFAULT_HTML_PATH };
