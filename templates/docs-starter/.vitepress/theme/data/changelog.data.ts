import { defineLoader } from 'vitepress'
import { DefaultLogFields, LogResult, simpleGit } from 'simple-git'
import { resolve } from 'path'

export type dataType = LogResult<DefaultLogFields & {
  commitLink: string
}>['all']

declare const data: dataType
export { data }

const git = simpleGit({
  baseDir: resolve(__dirname, '../../../')
})

export default defineLoader({
  async load() {
    const result = await git.log({ maxCount: 10 })
    
    return result.all.map(item => {
      return  {
        ...item,
        commitLink: `https://github.com/peterroe/fe-book/commit/${item.hash}`,
        date: item.date.slice(0, 10)
      }
    })
  },
})

