import type MarkdownIt from 'markdown-it'
import lz from 'lz-string'
import type { MarkdownItShikiOptions } from '@shikijs/markdown-it'
import type { Highlighter } from 'shiki'
import { codeToKeyedTokens } from 'shiki-magic-move/core'

const reMagicMoveBlock = /^:::magic-move(?:[ ]*(\{.*?\})?([^\n]*?))?\n([\s\S]+?)^:::$/mg
const reCodeBlock = /^```([\w'-]+?)(?:\s*\[([^\]]*)\])?(?:\s*{([\d\w*,\|-]+)}\s*?({.*?})?(.*?))?\n([\s\S]+?)^```$/mg

export function normalizeRangeStr(rangeStr = '') {
  return !rangeStr.trim() ? [] : rangeStr.trim().split(/\|/g).map(i => i.trim())
}

async function StepLinePlugin(md: MarkdownIt, shiki: Highlighter) {
  md.block.ruler.before('fence', 'magic-move', (state, startLine, endLine, silent) => {
    const start = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]
    if (state.src.slice(start, max).startsWith(':::magic-move')) {
      const [containerBlock = ''] = state.src.slice(start).match(reMagicMoveBlock) || []
      const matches = Array.from(containerBlock.matchAll(reCodeBlock))
      if (!matches.length)
        throw new Error('Magic Move block must contain at least one code block')

      const ranges = matches.map(i => normalizeRangeStr(i[3]))
      const steps = matches.map((i) => {
        return {
          ...codeToKeyedTokens(shiki, i[6].trimEnd(), {
            lang: i[1] as any,
            themes: {
              dark: 'vitesse-dark',
              light: 'vitesse-light',
            },
          } as unknown as MarkdownItShikiOptions),
          fileName: i[2] || i[1],
        }
      },
      )
      const token = state.push('magic-move_open', 'div', 1)
      token.meta = {
        stepsLz: lz.compressToBase64(JSON.stringify(steps)),
        stepRanges: JSON.stringify(ranges),
      }
      state.push('magic-move_close', 'div', -1)

      state.line = startLine + containerBlock.split('\n').length
      return true
    }
    return false
  })

  // @ts-expect-error
  function renderDefault(tokens, idx) {
    if (tokens[idx].nesting === 1) {
      const { stepsLz, stepRanges } = tokens[idx].meta
      return `<ShikiMagicMove steps-lz="${stepsLz}" :step-ranges="${stepRanges}" />`
    }

    return ''
  }

  md.renderer.rules['magic-move_open'] = renderDefault
  md.renderer.rules['magic-move_close'] = renderDefault
}

export default StepLinePlugin
