import { builtinModules } from 'node:module'
import { defineConfig } from 'tsup'

import pkg from './package.json'

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  minify: true,
  format: ['esm', 'cjs'],
  external: [...builtinModules, ...Object.keys(pkg.dependencies || {})],
  dts: true,
})
