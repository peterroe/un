import { builtinModules } from 'module'
import { defineConfig } from 'tsup'
import pkg from './package.json'

const external = [
  ...builtinModules,
  ...Object.keys(pkg.dependencies),
]
export default defineConfig({
  entry: ['src/rpc/client.ts', 'src/rpc/server.ts', 'src/index.ts'],
  splitting: false,
  external,
  clean: true,
})
