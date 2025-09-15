import { readFileSync } from 'fs'

function extract(src, tag) {
  const match = src.match(new RegExp(`<${tag}[^>]*?>([\\s\\S]*?)<\\/${tag}>`))
  return match ? match[1].trim() : '';
}


export default function VitePluginWC() {
  return {
    name: 'vite-plugin-wc',
    enforce: 'pre',
    transform(code, url) {
      const filename = url.split('?')[0];
      if (!filename.split('?')[0].endsWith('.htm')) return;
      const template = extract(code, 'template')
      const style = extract(code, 'style')
      const script = extract(code, 'script')

      const escapedTemplate = template
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\${/g, '\\${')

      const output = `
        const __style = \`${style}\`;
        const __template = \`${escapedTemplate}\`;
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(__style);

        ${script.replace('TEMPLATE_HTML', '__template')}
      `

      return { code: output, map: null }
    }
  }
}