import type MarkdownIt from 'markdown-it'

function generateRandomLetters() {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  let randomString = ''

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length)
    randomString += letters.charAt(randomIndex)
  }

  return randomString
}

function MermaidPlugin(md: MarkdownIt) {
  const temp = md.renderer!.rules!.fence!.bind(md.renderer.rules)
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const code = token.content
    if (token.info === 'mermaid') {
      return `
                <Mermaid id="mermaid-${generateRandomLetters()}" theme="base" graph="${encodeURIComponent(code)}"></Mermaid>
            `
    }
    return temp(tokens, idx, options, env, slf)
  }
}

export default MermaidPlugin
