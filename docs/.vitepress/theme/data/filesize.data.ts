import { defineLoader } from 'vitepress'
import path from 'path'
import fs from 'fs'

type LocalFile = {
    size: number
}

export type Data = LocalFile[]

declare const data: Record<string, LocalFile>
export { data }

export default defineLoader({
  async load() {
    const fileMap: Record<string, LocalFile> = {}
    function recurse(dir: string) {
      const files = fs.readdirSync(dir)
      files.forEach(file => {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)
        if (stat.isDirectory()) {
          recurse(filePath)
        } else {
          const size = fs.statSync(filePath).size
          const key = path.join('/', path.relative('./public', filePath))
          fileMap[key] = {
            size
          }
        }
      })
    }
    recurse(path.resolve(__dirname, '../../../public'))
    return fileMap
  }
})

