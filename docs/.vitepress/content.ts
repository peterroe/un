export const iconMapRegex: Array<[RegExp, string]> = [
  [/\b[mc]?jsx?\b/, '<LogosJavascript/>'],
  [/\bjsx\b/, '<FileIconsJsxAlt color="#007acc"/>'],
  [/\btsx\b/, '<FileIconsTsxAlt color="#007acc"/>'],
  [/\b[mc]?ts\b/, '<LogosTypescriptIcon/>'],
  [/\b(bash|shell|sh)\b/, '<LogosBashIcon/>'],
  [/\bhtml\b/, '<LogosHtml5/>'],
  [/\bvue\b/, '<LogosVue/>'],
  [/\bsvelte\b/, '<LogosSvelteIcon/>'],
  [/\btoml\b/, '<LogosToml/>'],
  [/\bproto\b/, '<VscodeIconsFileTypeProtobuf/>'],
  [/\bDockerfile\b/, '<LogosDockerIcon/>'],
  [/\bdiff\b/, '<VscodeIconsFileTypeDiff/>'],
  [/\bjson\b/, '<LogosJson/>'],
  [/\bgit/, '<LogosGitIcon/>'],
  [/\bvim\b/, '<LogosVim/>'],
  [/\bya?ml\b/, '<LogosYaml/>'],
  [/\bc(pp|c)\b/, '<LogosCPlusplus/>'],
  [/\b(py|gyp)\b/, '<LogosPython/>'],
  [/\bnpm(rc|ignore)\b/, '<LogosNpmIcon/>'],
  [/\bcss\b/, '<LogosCss3/>'],
  [/\b(md|markdown)\b/, '<LogosMarkdown/>'],
  [/\bjsonnet\b/, '<VscodeIconsFileTypeJsonnet/>'],
  [/\b(ini|conf|config)\b/, '<CarbonSettings/>'],
  [/\bastro\b/, '<LogosAstroIcon/>'],
  [/\b(mp4|m3u8|m3u)\b/, '<VscodeIconsFileTypeVideo/>'],
  // pure extension
  [/\bnpm\b/, '<LogosNpmIcon/>'],
  [/\byarn\b/, '<LogosYarn/>'],
  [/\bpnpm\b/, '<LogosPnpm/>'],
  [/\bbun\b/, '<LogosBun/>'],
]
export const iconSpecialMapRegex: Array<[RegExp, string]> = [
  [/package\.json/, '<LogosNodejsIcon/>'],
  [/tsconfig\.json/, '<VscodeIconsFileTypeTsconfig/>'],
  [/vite\.config\.m?(t|j)s/, '<LogosVitejs/>'],
  [/vitest\.config\.m?(t|j)s/, '<LogosVitest/>'],
  [/.*\.component\.ts\b/, '<LogosAngularIcon/>'],
]

/**
 * 传入文件名或者扩展名
 */
export function getLogoTagString(str: string) {
  for (const [reg, logo] of iconSpecialMapRegex) {
    if (reg.test(str))
      return logo
  }

  const lang = str.includes('.') ? str.slice(str.lastIndexOf('.') + 1) : str
  for (const [reg, logo] of iconMapRegex) {
    if (reg.test(lang))
      return logo
  }
  return '<CarbonDocument/>'
}

export const iconSafeList = [
  ...iconMapRegex,
  ...iconSpecialMapRegex,
].map(([_, label]) => {
  return transformTagToClass(label)
})

export function transformTagToClass(tag: string) {
  return `i${tag
    .replace(/[<\/>]/g, '')
    .replace(/([A-Z])/g, (_, p) => `-${p.toLowerCase()}`)}`
}

export function getLangClassIcon(lang: string) {
  return transformTagToClass(
    getLogoTagString(lang),
  )
}
