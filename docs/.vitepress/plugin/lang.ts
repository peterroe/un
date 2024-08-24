import type MarkdownIt from 'markdown-it'
import { getLogoTagString } from '../content'

function langPlugin(md: MarkdownIt) {
  const temp = md.renderer!.rules!.fence!.bind(md.renderer.rules)
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    if (getLogoTagString(token.info)) {
      const result = token.info.match(/^\b([\w\.]*)\b/)
      if (!result)
        return temp(tokens, idx, options, env, slf)
      const [_, lang] = result
      const content = temp(tokens, idx, options, env, slf)
      const value = getLogoTagString(lang)
      return content.replace(`<span class="lang">${lang}</span>`, `<span class="lang icon">${value}</span>`)
    }

    return temp(tokens, idx, options, env, slf)
  }

  // insert icon before
  // https://github.com/vuejs/vitepress/blob/0c434bf537a64b06fc0bc630b4ee58b9fa67309b/src/node/markdown/plugins/containers.ts#L95
  const rawCodeGroupRender = md.renderer.rules['container_code-group_open']!

  md.renderer.rules['container_code-group_open'] = (tokens, idx, options, env, slf) => {
    const content: string = rawCodeGroupRender(tokens, idx, options, env, slf)
    // match: >index.ts</label>
    return content.replace(/>(\s*[^\<\>]*\s*)\<\/label\>/g, (_, $1) => {
      return `>${getLogoTagString($1)} ${$1}</label>`
    })
  }
}

export default langPlugin
