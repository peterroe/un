<script setup lang="ts">
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { h } from 'hastscript'
import { CONTINUE, visit } from 'unist-util-visit'
import type { Element } from 'hast'
import lz from 'lz-string'
import { getLangClassIcon } from '../../content'

const props = defineProps<{
  content: string
  isOpen: boolean
}>()

const content = JSON.parse(lz.decompressFromBase64(props.content))

function makeSVGIcon(icon: string) {
  return h('div', {
    class: `tree-icon ${icon} w-1.3em h-1.3em`
  })
}

const data = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(() => (tree) => {
    visit(tree, 'element', (node: Element) => {
      // Delete text node
      node.children = node.children.filter(
        child => child.type === 'comment' || child.type !== 'text' || !/^\n+$/.test(child.value),
      )
      if (node.tagName !== 'li')
        return CONTINUE

      const [fistChild, ...otherChildren] = node.children
      const isDirectory = node.children.some(node => node.type === 'element' && node.tagName === 'ul')
      const hasContents = otherChildren.length > 0

      // Render icon and comment
      function fileNameRender(filaNameAndComment: string) {
        const [fileName, ...restStr] = filaNameAndComment.split(/(#)/)
        const lang = fileName.slice(fileName.lastIndexOf('.') + 1).trim()
        const content = h('span', {
          class: 'vp-code',
        }, [fileName, h('span', { // comment
          style: '--shiki-light:#A0ADA0;--shiki-dark:#758575DD;',
        }, restStr.join(''))])
        return {
          content,
          lang,
          fileName,
        }
      }

      if (isDirectory) {
        const title = fistChild.type === 'text' ? fistChild.value : fistChild

        if (typeof title !== 'string')
          return

        const { content } = fileNameRender(title)

        const dirNameRender = h('span', {
          class: 'title',
          // 需要大一些
        }, [makeSVGIcon('i-material-symbols-folder-rounded text-[#8699a3] h-1.5em w-1.5em'), content])
        node.children = [
          h('details', { open: hasContents && props.isOpen }, [
            h('summary', dirNameRender),
            ...(hasContents ? otherChildren : [h('ul', h('li', '…'))]),
          ]),
        ]

        return CONTINUE
      }
      else {
        if (fistChild.type !== 'text')
          return

        const { content, fileName } = fileNameRender(fistChild.value)
        node.properties.className = 'sub-li'
        node.children = [
          makeSVGIcon(getLangClassIcon(fileName) || getLangClassIcon('ts')),
          h('span', { class: 'vp-code' }, content),
        ]

        return CONTINUE
      }
    })
  })
  .use(rehypeStringify)
  .processSync(content)

</script>

<template>
  <div class="file-tree language-tree" v-html="data" />
</template>

<style>
.file-tree {
  padding: 16px 0;
  font-size: 14px;
}
.file-tree .sub-li {
  padding-left: 6px;
}
.file-tree .title {
  vertical-align: top;
  display: inline-flex;
  margin-left: 5px;
  align-items: center;
}
.file-tree .tree-icon {
  margin-right: 8px;
}
.file-tree .tree-icon path {
  width: 18px;
  height: 18px;
}
.file-tree li {
  cursor: pointer;
  list-style: none;
  font-family: 'MonaspaceNeon';
  display: flex;
  align-items: center;
  margin-top: 4px;
  margin-bottom: 4px;
  margin-left: 5px;
}
.file-tree ul {
  padding-left: 30px !important;
  margin: 0 !important;
}
.file-tree details ul {
  margin-left: -10px !important;
}
.file-tree > ul ul {
  border-inline-start: 1px solid var(--vp-c-brand-1);
}
.file-tree details summary {
  margin: 0 0 0 -14px;
}
</style>
