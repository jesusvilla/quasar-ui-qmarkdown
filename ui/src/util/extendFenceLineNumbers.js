// 'use strict'

export default function extendFenceLineNumbers (md, alt) {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const rawCode = fence(...args)
    const code = rawCode.slice(
      rawCode.indexOf('<code>') + 6,
      rawCode.indexOf('</code>')
    )

    const lines = code.trim().split('\n')
    if (lines.length < 3) {
      return rawCode
    }

    const lineNumbersCode = [...Array(lines.length)]
      .map((line, index) => `<div class="q-markup--line-number">${alt === void 0 ? index + 1 : alt}</div>`).join('')

    const lineNumbersWrapperCode =
      `<div class="q-markdown--line-numbers non-selectable">${lineNumbersCode}</div><div class="q-markdown--code-wrapper">${rawCode}</div>`

    const finalCode =
      `<div class="q-markdown--line-numbers-wrapper">${lineNumbersWrapperCode}</div>`

    return finalCode
  }
}

// if (typeof module !== 'undefined' && module.exports) {
//   module.exports = extendFenceLineNumbers
//   export default extendFenceLineNumbers
// }

// // hack for components to work correctly in node.js
// if (typeof global !== 'undefined') {
//  global.extendFenceLineNumbers = extendFenceLineNumbers
// }
