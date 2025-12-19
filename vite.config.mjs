import { defineConfig } from "vite";
import vitePluginWC from './plugins/vite-plugin-wc.js'

export default defineConfig(({ command, mode }) => {
  const isProd = mode === 'production'
  return {
    build: {
      minify: isProd ? 'esbuild' : false,
      sourcemap: !isProd,
      lib: {
        entry: 'src/index.ts',
        name: 'Components',
        fileName: (format, entryName) => `${entryName}.${format}.js`,
        formats: ['es']
      },
      rollupOptions: {
        // external deps like lodash
        external: [],
        output: {
          preserveModules: true,
          preserveModulesRoot: 'src',
          globals: {}
        }
      }
    },
    plugins: [vitePluginWC()]
  }
})

