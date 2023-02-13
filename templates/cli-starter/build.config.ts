import { builtinModules } from 'module'
import { defineBuildConfig } from 'unbuild'
import pkg from './package.json'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  externals: [...builtinModules, ...Object.keys(pkg.dependencies)],
  failOnWarn: false,
})
