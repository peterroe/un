import type MarkdownIt from 'markdown-it'

const getPmInstall = ({
  name,
  dev,
}: {
  name: string,
  dev: boolean
}) =>  `
:::magic-move
\`\`\`sh [npm]
$ npm i ${dev ? '-D ' : ''}${name}
\`\`\`
\`\`\`sh [yarn]
$ yarn add ${dev ? '-D ' : ''}${name}
\`\`\`
\`\`\`sh [pnpm]
$ pnpm i ${dev ? '-D ' : ''}${name}
\`\`\`
\`\`\`sh [bun]
$ bun i ${dev ? '-d ' : ''}${name}
\`\`\`
:::
`

const getPmRun = ({
  script,
}: {
  script: string,
}) =>  `
:::magic-move
\`\`\`sh [npm]
$ npm run ${script}
\`\`\`
\`\`\`sh [yarn]
$ yarn ${script}
\`\`\`
\`\`\`sh [pnpm]
$ pnpm ${script}
\`\`\`
\`\`\`sh [bun]
$ bun run ${script}
\`\`\`
:::
`

const getPmX = ({
  command,
}: {
  command: string
}) =>  `
:::magic-move
\`\`\`sh [npm]
$ npx ${command}
\`\`\`
\`\`\`sh [yarn]
$ yarn dlx ${command}
\`\`\`
\`\`\`sh [pnpm]
$ pnpx ${command}
\`\`\`
\`\`\`sh [bun]
$ bunx ${command}
\`\`\`
:::
`


function StepLinePlugin(md: MarkdownIt) {
  md.inline.ruler.before('emphasis', 'pm', (state, silent) => {
    let pos = state.pos;
    const max = state.posMax;
    if (state.src.charCodeAt(pos) !== 0x3A /* : */ || state.src.charCodeAt(pos + 1) !== 0x70 /* p */ || state.src.charCodeAt(pos + 2) !== 0x6D /* m */) {
      return false;
    }
    pos += 4
    // Parse attributes
    const type = state.src.slice(pos, state.src.indexOf('{'))
    const content = state.src.slice(state.src.indexOf('{'))
    if (silent) {
      return true;
    }
    const token = type === 'x'
      ? state.push('pm_x', 'div', 0)
      : type === 'run'
        ? state.push('pm_run', 'div', 0)
        : state.push('pm_install', 'div', 0)
  
    try {
      token.meta = JSON.parse(content)
    } catch {
      token.meta = {}
      throw new Error(':pm- 组件解析错误，请检查语法')
    }

    state.pos = max + 1;
    state.posMax = max;
    return true;
  });

  md.renderer.rules['pm_x'] = (tokens, idx) => {
    const token = tokens[idx]
    return md.render(getPmX(token.meta))
  }
  md.renderer.rules['pm_install'] = (tokens, idx) => {
    const token = tokens[idx]
    return md.render(getPmInstall(token.meta))
  }
  md.renderer.rules['pm_run'] = (tokens, idx) => {
    const token = tokens[idx]
    return md.render(getPmRun(token.meta))
  }
}

export default StepLinePlugin
