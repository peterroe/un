import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

export default defineConfig({
  plugins: [
    dts(),
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'umd'],
      // the name expose in umd mode
      name: pkg.name,
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies)],
    },
  },
})
