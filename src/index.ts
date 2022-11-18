import { cac } from 'cac'
import pkg from '../package.json'
const cli = cac(pkg.name)

interface optionType { [k: string]: any }

cli
  .command('lint [...args]', 'Lint files')
  .option('--type <type>', 'Choose a project type', { // demo usage
    default: 'node',
  })
  .option('--name <name>', 'Provide your name')
  .action((args: Array<string>, options: optionType) => {
    console.log({ args, options })
  })

cli.help()

cli.version(pkg.version)

cli.parse()
