import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import pluginImport from 'eslint-plugin-import'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'

export default defineConfig([
  {
    ignores: ['dist', 'node_modules', 'bin/*.js'],
  },

  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node, // add nodejs env variables
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: pluginImport,
    },
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-var-requires': 'off',
    },
  },

  eslintPluginPrettierRecommended,
])
