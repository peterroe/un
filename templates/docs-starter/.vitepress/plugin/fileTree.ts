import lz from 'lz-string'
import MarkdownIt from 'markdown-it';

function generateRandomLetters() {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  let randomString = ''

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length)
    randomString += letters.charAt(randomIndex)
  }

  return randomString
}

function FileTreePlugin(md: MarkdownIt) {
  const temp = md.renderer!.rules!.fence!.bind(md.renderer.rules)
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const code = token.content
    if (token.info === 'filetree') {
      const attrs = token.attrs || []
      const isOpen = attrs.some(attr => attr.includes('open'))
      const content = lz.compressToBase64(JSON.stringify(code))
      return `
          <FileTree :isOpen="${isOpen}" id="mermaid-${generateRandomLetters()}" theme="base" content="${content}"></FileTree>
      `
    }
    return temp(tokens, idx, options, env, slf)
  }
}

export default FileTreePlugin
