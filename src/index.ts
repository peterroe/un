import fs from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import fse, { cpSync } from 'fs-extra'
import {
  blue,
  green,
  magenta,
  red,
  reset,
  yellow,
} from 'kolorist'
import minimist from 'minimist'
import ora from 'ora'
import prompts from 'prompts'

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
const colorPreset = [yellow, magenta, blue, red, green]
const templateNames = [
  'cli-starter',
  'docs-starter',
  'ts-starter',
  'ts-starter-vite',
  'vue-component-starter',
]

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
        onState: (state: { value: string, aborted: string, exited: string }) => {
          if (state.exited || state.aborted)
            process.exit(0)

          targetDir = state.value
        },
      },
      {
        type: () => (!fs.existsSync(targetDir) || isEmpty(targetDir)) ? null : 'confirm',
        name: 'overwrite',
        message: `Target directory "${targetDir}" is not empty. Remove existing files and continue?`,
        onState: (state: { value: string, aborted: string, exited: string }) => {
          if (state.exited || state.aborted)
            process.exit(0)
        },
      },
      {
        type: (_, { overwrite }: any) => {
          if (overwrite === false)
            throw new Error(`${red('✖')} Operation cancelled`)
          return null
        },
        name: 'overwriteChecker',
        onState: (state: { value: string, aborted: string, exited: string }) => {
          if (state.exited || state.aborted)
            process.exit(0)
        },
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
        onState: (state: { value: string, aborted: string, exited: string }) => {
          if (state.exited || state.aborted)
            process.exit(0)
        },
      },
    ],
  )
  const { framework = argTemplate, overwrite } = result

  const root = resolve(cwd, targetDir)

  if (overwrite)
    emptyDir(root)

  const spinner = ora('Download template...').start()

  const targetTemplateDir = resolve(__dirname, `../builds/${framework}`)
  try {
    cpSync(targetTemplateDir, root, {
      recursive: true,
    })
  }
  catch (e) {
    console.error(e)
  }

  spinner.succeed()

  const dirName = root.split('/').pop() || ''

  replacePkgName(root, dirName)

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
      resolve(dir, file),
      { recursive: true, force: true },
    )
  }
}

function replacePkgName(root: string, target: string) {
  // foreach root subfile
  const files = fs.readdirSync(root)
  for (const file of files) {
    const filePath = resolve(root, file)

    if (fs.statSync(filePath).isDirectory()) {
      replacePkgName(filePath, target)
    }
    else {
      const content = fs.readFileSync(filePath, 'utf8')
      fs.writeFileSync(filePath, content.replaceAll('__pkg_name_placeholder__', target))
    }
  }
}
