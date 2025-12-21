import { defineConfig } from "vite";
import vitePluginWC from './plugins/vite-plugin-wc.js'

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  return {
    build: {
      minify: isProd ? 'esbuild' : false,
      sourcemap: !isProd,
      lib: {
        entry: 'src/index.ts',
        fileName: (format, entryName) => `${entryName}.${format}.js`,
        formats: ['es']
      },
      rollupOptions: {
        output: {
          preserveModules: true,
          preserveModulesRoot: 'src',
        }
      }
    },
    plugins: [vitePluginWC()]
  }
})

