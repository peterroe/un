import { builtinModules } from 'module'
import { defineBuildConfig } from 'unbuild'
import pkg from './package.json'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  declaration: true,
  clean: true,
  externals: [...builtinModules, ...Object.keys(pkg.dependencies || {})],
  rollup: {
    emitCJS: true,
  },
})
