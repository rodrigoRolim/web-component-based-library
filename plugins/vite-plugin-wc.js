function extract(src, tag) {
  const match = src.match(
    new RegExp(`<${tag}[^>]*?>([\\s\\S]*?)<\\/${tag}>`)
  )
  return match ? match[1].trim() : ''
}

export default function VitePluginWC() {
  return {
    name: 'vite-plugin-wc-template',
    enforce: 'pre',

    transform(code, id) {
      if (!id.endsWith('.template.htm')) return

      const template = extract(code, 'template')
      const style = extract(code, 'style')

      const escapedTemplate = template
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\${/g, '\\${')

      const escapedStyle = style
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\${/g, '\\${')

      const output = `
        export const template = \`${escapedTemplate}\`;

        const __style = \`${escapedStyle}\`;
        export const sheet = new CSSStyleSheet();
        sheet.replaceSync(__style);
      `

      return {
        code: output,
        map: null
      }
    }
  }
}
