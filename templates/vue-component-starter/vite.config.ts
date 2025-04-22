import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      cleanVueFileName: true,
    }),
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'cjs'],
      // the name expose in umd mode
      name: pkg.name,
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies)],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
