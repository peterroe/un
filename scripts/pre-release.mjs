import { readdirSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { execa } from 'execa'
import * as tar from 'tar'
import { moveSync } from 'fs-extra/esm'

const buildsPath = resolve('builds')

async function run() {
  const templatesDir = readdirSync('./templates')
    .filter(fileName => fileName !== '.DS_Store')
    .map(fileName => resolve('templates', fileName))

  for (let i = 0; i < templatesDir.length; i++) {
    const path = templatesDir[i];
    const { stdout } = await execa({
      preferLocal: true,
      cwd: path
    })`pnpm pack --pack-destination ${buildsPath}`
    console.log('Generating:', resolve(stdout, '../', basename(path)))
    await tar.x({
      f: stdout,
      C: resolve(stdout, '../')
    })
    moveSync(resolve(buildsPath, 'package'), resolve(buildsPath, basename(path)), {
      overwrite: true
    })
    await execa`rm -rf ${stdout}`
  }
  
}

// clean
await execa`rm -rf builds`

run()
