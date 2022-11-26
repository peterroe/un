import fs from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'url'
import { copySync } from 'fs-extra'
import prompts from 'prompts'
import {
  blue,
  green,
  red,
  reset,
  yellow,
} from 'kolorist'
const cwd = process.cwd()
const __dirname = fileURLToPath(new URL('.', import.meta.url))
interface Framework {
  title: string
  value: string
}
const FRAMEWORK: Array<Framework> = [
  {
    title: yellow('cli-starter'),
    value: 'cli-starter',
  },
  {
    title: green('vue-component-starter'),
    value: 'vue-component-starter',
  },
  {
    title: blue('ts-starter'),
    value: 'ts-starter',
  },
]

const defaultTargetDir = 'un-project'
async function init() {
  const argTargetDir = process.argv[2]
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
        type: () => !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
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
        type: 'select',
        name: 'framework',
        message: reset('Select a framework:'),
        initial: 0,
        choices: FRAMEWORK,
      },
    ],
  )
  const { framework, overwrite } = result

  const root = join(cwd, targetDir)
  if (overwrite)
    emptyDir(root)
  else if (!fs.existsSync(root))
    fs.mkdirSync(root, { recursive: true })

  const templateDir = resolve(
    __dirname, '../templates/', framework,
  )

  copySync(templateDir, root)
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
  console.log('  pnpm install')
  console.log('  pnpm run dev\n')
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
