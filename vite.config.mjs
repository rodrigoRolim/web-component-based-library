import { defineConfig } from "vite";
import vitePluginWC from './plugins/vite-plugin-wc.js'

export default defineConfig(({ command, mode }) => {
  const isProd = mode === 'production'
  return {
    build: {
      minify: isProd ? 'esbuild' : false,
      sourcemap: !isProd,
      lib: {
        entry: {
          'my-button': './components/my-button.htm',
          'my-card': './components/my-card.htm'
        },
        name: 'Components',
        fileName: (format, entryName) => `${entryName}.${format}.js`,
        formats: ['es']
      },
      rollupOptions: {
        // external deps like lodash
        external: [],
        output: {
          globals: {}
        }
      }
    },
    plugins: [vitePluginWC()]
  }
})