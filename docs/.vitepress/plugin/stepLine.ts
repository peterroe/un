import type MarkdownIt from 'markdown-it'
import jsYaml from 'js-yaml'

interface StepLineItem {
  title: string
  desc: string
  code: string
}

function StepLinePlugin(md: MarkdownIt) {

  const temp = md.renderer!.rules!.fence!.bind(md.renderer.rules)
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const code = token.content
    if (token.info === 'stepline') {
      const array = jsYaml.load(code) as StepLineItem[]
      let result = ''
      array.forEach((item) => {
        const { title = '', desc = '', code = '' } = item
        const titleResult = md.renderInline(title)
        const descResult = md.render(desc)
        const codeResult = md.render(code)
        result += `<div class="step-line-item">
        <h5 class="title">${titleResult}</h5>
        <div class="desc">${descResult}</div>
        ${codeResult}</div>`
      })
      return `<div class="step-line">${result}</div>`
    }
    return temp(tokens, idx, options, env, slf)
  }
}

export default StepLinePlugin
