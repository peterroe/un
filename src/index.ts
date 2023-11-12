import fs from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'url'
import fse from 'fs-extra'
import minimist from 'minimist'
import prompts from 'prompts'
import {
  blue,
  cyan,
  green,
  magenta,
  red,
  reset,
  yellow,
} from 'kolorist'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const argv = minimist<{
  t?: string
  template?: string
  h?: string
  help?: string
  v?: string
  version?: string
}>(process.argv.slice(2), { string: ['_'] })

if (argv.h || argv.help) {
  console.log(`creaet-un/${fse.readJsonSync(resolve(__dirname, '../package.json')).version}`)
  console.log()
  console.log('Usage:')
  console.log('   $ pnpm create un [<projectName>]')
  process.exit(0)
}

if (argv.v || argv.version) {
  console.log(`creaet-un/${fse.readJsonSync(resolve(__dirname, '../package.json')).version}`)
  process.exit(0)
}

const cwd = process.cwd()

interface Framework {
  title: string
  value: string
}
const colorPreset = [yellow, magenta, cyan, blue, red, green]
const templateNames = fse.readdirSync(resolve(__dirname, '../templates'))

const FRAMEWORK: Array<Framework> = templateNames.map((t, i) => ({
  title: colorPreset[i](t),
  value: t,
}))

const defaultTargetDir = 'un-project'
async function init() {
  const argTargetDir = argv._[0]
  const argTemplate = argv.template || argv.t
  let targetDir = argTargetDir || defaultTargetDir
  const result = await prompts(
    [
      {
        type: argTargetDir ? null : 'text',
        name: 'projectName',
        message: reset('Project name:'),
        initial: defaultTargetDir,
        onState: (state: any) => {
          targetDir = state.value
        },
      },
      {
        type: () => (!fs.existsSync(targetDir) || isEmpty(targetDir)) ? null : 'confirm',
        name: 'overwrite',
        message: `Target directory "${targetDir}" is not empty. Remove existing files and continue?`,
      },
      {
        type: (_, { overwrite }: any) => {
          if (overwrite === false)
            throw new Error(`${red('✖')} Operation cancelled`)
          return null
        },
        name: 'overwriteChecker',
      },
      {
        type: argTemplate ? null : 'select',
        name: 'framework',
        message: (typeof argTemplate === 'string' && !FRAMEWORK.some(it => it.value === argTemplate))
          ? reset(
            `"${argTemplate}" isn't a valid template. Please choose from below: `,
          )
          : reset('Select a framework:'),
        initial: 0,
        choices: FRAMEWORK,
      },
    ],
  )
  const { framework = argTemplate, overwrite } = result

  const root = join(cwd, targetDir)
  if (overwrite)
    emptyDir(root)
  else if (!fs.existsSync(root))
    fs.mkdirSync(root, { recursive: true })

  const templateDir = resolve(
    __dirname, '../templates/', framework,
  )

  fse.copySync(templateDir, root, {
    filter: (src: string) => {
      if (src.endsWith('node_modules') || src.endsWith('pnpm-lock.yaml'))
        return false
      return true
    },
  })
  const pkg = pkgRead(templateDir)
  pkg.name = targetDir
  switch (framework) {
    case 'cli-starter':
      pkg.bin = {
        [targetDir]: './bin/index.mjs',
      }
      break
    case 'vue-component-starter':
      break
    case 'ts-starter':
      break
  }
  pkgWrite(root, pkg)

  console.log('\nDone. Now run:\n')
  console.log(`  cd ${targetDir}`)
  console.log('  pnpm install\n')
}

init().catch((e) => {
  console.error(e)
})

function isEmpty(path: string) {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir))
    return
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git')
      continue
    fs.rmSync(
      resolve(dir, file), { recursive: true, force: true },
    )
  }
}

function pkgRead(path: string) {
  const pkg = JSON.parse(
    fs.readFileSync(resolve(path, 'package.json'), 'utf-8'),
  )
  return pkg
}
function pkgWrite(root: string, pkg: any) {
  fs.writeFileSync(resolve(root, 'package.json'), JSON.stringify(pkg, null, 2))
}
