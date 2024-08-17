import { fetch } from 'ofetch'
import { defineLoader } from 'vitepress'

import { parseURL } from 'ufo'

export type Data = permaLinkType[]

declare const data: Record<string, Required<permaLinkType>>
export { data }

export interface permaLinkType {
  id: string
  link: string
  startLine?: number
  endLine?: number
  commitId?: string
  rawLink?: string
  // 容灾兜底
  rawLinkBack?: string
  diffLink?: string
  fileFullPath?: string
  fileName?: string
  codeRaw?: string
  language?: string
}

const permaLinkList = [
  {
    id: 'UNPLUGIN_AUTO_IMPORT',
    link: 'https://github.com/unplugin/unplugin-auto-import/blob/196055bfbfa56123378e2b7df09ea27280a1624a/src/core/unplugin.ts#L15-L17',
  },
  {
    id: 'VITE_PLUGIN_JSON5',
    link: 'https://github.com/timyourivh/vite-plugin-json5/blob/f8243271347c1db91677426cd19313bc511bf72f/src/index.ts#L9-L17',
  },
  {
    id: 'GET_PORT',
    link: 'https://github.com/sindresorhus/get-port/blob/85c18678143f2c673bdaf5307971397b29ddf28b/index.js#L42-L54',
  },
  {
    id: 'NODE_STREAM_READABLE_EMIT',
    link: 'https://github.com/nodejs/node/blob/main/lib/internal/streams/readable.js#L559',
  },
  {
    id: 'NODE_STREAM_READABLE_HANDLE',
    link: 'https://github.com/nodejs/node/blob/4e713a3930b0758231ebaf6debbf30bb18eec920/deps/npm/node_modules/events/events.js#L152',
  },
  {
    id: 'NODE_STREAM_READABLE_RESUME',
    link: 'https://github.com/nodejs/node/blob/main/lib/internal/streams/readable.js#L1138',
  },
  {
    id: 'NODE_CANVAS_PACKAGE_JSON',
    link: 'https://github.com/Automattic/node-canvas/blob/a5b379bbc241d2731c2a4f8d4410f71f123dd1ee/package.json#L25-L36',
  },
  {
    id: 'UNPLUGIN_ICONS_VITE_RESOLVE_ID',
    link: 'https://github.com/unplugin/unplugin-icons/blob/50225129272e6da3d15955d6543ec093db38a075/src/index.ts#L9-L20',
  },
  {
    id: 'UNPLUGIN_ICONS_VITE_LOAD',
    link: 'https://github.com/unplugin/unplugin-icons/blob/50225129272e6da3d15955d6543ec093db38a075/src/index.ts#L51-L60',
  },
  {
    id: 'UNPLUGIN_ICONS_LOAD_NODE_ICON',
    link: 'https://github.com/unplugin/unplugin-icons/blob/50225129272e6da3d15955d6543ec093db38a075/src/core/loader.ts#L89',
  },
  {
    id: 'ICONIFY_ICONIFY_NODE_LOADER',
    link: 'https://github.com/iconify/iconify/blob/f4930a5ff7d89c01d205171ab6a73ae2cf43563d/packages/utils/src/loader/node-loader.ts#L7-L20',
  },
  {
    id: 'UNPLUGIN_ICONS_COMPILER_VUE3',
    link: 'https://github.com/unplugin/unplugin-icons/blob/50225129272e6da3d15955d6543ec093db38a075/src/core/compilers/vue3.ts#L5-L21',
  },
  {
    id: 'VITE_PLUGIN_PAGES_ROUTE_MAP',
    link: 'https://github.com/hannoeru/vite-plugin-pages/blob/a638fe3a340c0bc768409ebcfd9799582eb0fd4e/src/context.ts#L45-L90',
  },
  {
    id: 'VITE_PLUGIN_PAGES_VUE_COMPILER',
    link: 'https://github.com/hannoeru/vite-plugin-pages/blob/a638fe3a340c0bc768409ebcfd9799582eb0fd4e/src/resolvers/vue.ts#L63-L159',
  },
  {
    id: 'VITE_PLUGIN_PAGES_RESOLVE',
    link: 'https://github.com/hannoeru/vite-plugin-pages/blob/a638fe3a340c0bc768409ebcfd9799582eb0fd4e/src/resolvers/vue.ts#L161-L219',
  },
  {
    id: 'VITE_PLUGIN_PAGES_LOAD',
    link: 'https://github.com/hannoeru/vite-plugin-pages/blob/a638fe3a340c0bc768409ebcfd9799582eb0fd4e/src/index.ts#L50-L67',
  },
  {
    id: 'MARKDOWN_MARKED_RULES',
    link: 'https://github.com/markedjs/marked/blob/60626572f1e16d256317b40f9472faa6b5a02352/src/rules.ts#L9-L15',
  },
  {
    id: 'MARKDOWN_MARKED_LEXER_BLOCK',
    link: 'https://github.com/markedjs/marked/blob/60626572f1e16d256317b40f9472faa6b5a02352/src/Lexer.ts#L119-L232',
  },
  {
    id: 'MARKDOWN_MARKED_PARSER_BLOCK',
    link: 'https://github.com/markedjs/marked/blob/60626572f1e16d256317b40f9472faa6b5a02352/src/Parser.ts#L60-L127'
  },
  {
    id: 'MARKDOWN_MARKED_RENDER_BLOCK',
    link: 'https://github.com/markedjs/marked/blob/60626572f1e16d256317b40f9472faa6b5a02352/src/Renderer.ts#L42-L57'
  }
].map(parseLink) as Required<permaLinkType>[]

export default defineLoader({
  async load() {
    try {
      const res = await Promise.all(permaLinkList.map(
        item => fetch(item.rawLink)
          .then((val: any) => val.text())
          .catch(_ => {
            return fetch(item.rawLinkBack)
          })
      ))
      permaLinkList.forEach((item, i) => item.codeRaw = getLines(res[i], item.startLine, item.endLine))
      return permaLinkList.reduce((pre, cur) => {
        const id = cur.id
        pre[id] = cur
        return pre
      }, {} as Record<string, permaLinkType>)
    } catch {
      return null
    }
  },
})

function parseLink(item: permaLinkType) {
  const { hash, pathname } = parseURL(item.link)
  const paths = pathname.split('/')
  const userName = paths[1]
  const repoName = paths[2]
  const filePath = paths.slice(5).join('/')
  const commitId = paths[4]
  item.commitId = commitId
  const [s, e = s] = hash.replace(/[#L]/g, '').split('-')
  item.startLine = Number(s)
  item.endLine = Number(e)
  // item.rawLink = `https://raw.githubusercontent.com/${userName}/${repoName}/${commitId}/${filePath}`
  item.rawLink = `https://cdn.jsdelivr.net/gh/${userName}/${repoName}@${commitId}/${filePath}`
  item.rawLinkBack = `https://raw.githubusercontent.com/${userName}/${repoName}/${commitId}/${filePath}`
  item.diffLink = `https://github.com/${userName}/${repoName}/commit/${commitId}`
  item.fileFullPath = `${userName}/${repoName}/${filePath}`
  item.fileName = filePath.split('/').pop()
  item.language = pathname.match(/.*\.([a-z]*)$/)![1]
  return item
}

function getLines(str: string, startLine: number, endLine: number) {
  const lines = str.split('\n')
  const selectedLines = lines.slice(startLine - 1, endLine).join('\n')
  return selectedLines
}
