// vite.config.ts
import { defineConfig } from "file:///Users/peterroe/Desktop/vscode/i/un/node_modules/.pnpm/vite@4.5.2_@types+node@18.18.9_stylus@0.62.0/node_modules/vite/dist/node/index.js";
import UnoCSS from "file:///Users/peterroe/Desktop/vscode/i/un/node_modules/.pnpm/unocss@0.61.9_postcss@8.4.41_rollup@2.79.1_vite@4.5.2/node_modules/unocss/dist/vite.mjs";
import Icons from "file:///Users/peterroe/Desktop/vscode/i/un/node_modules/.pnpm/unplugin-icons@0.17.3_@vue+compiler-sfc@3.4.38/node_modules/unplugin-icons/dist/vite.mjs";
import IconsResolver from "file:///Users/peterroe/Desktop/vscode/i/un/node_modules/.pnpm/unplugin-icons@0.17.3_@vue+compiler-sfc@3.4.38/node_modules/unplugin-icons/dist/resolver.mjs";
import Components from "file:///Users/peterroe/Desktop/vscode/i/un/node_modules/.pnpm/unplugin-vue-components@0.25.2_rollup@2.79.1_vue@3.3.8/node_modules/unplugin-vue-components/dist/vite.mjs";
import Inspect from "file:///Users/peterroe/Desktop/vscode/i/un/node_modules/.pnpm/vite-plugin-inspect@0.7.42_rollup@2.79.1_vite@4.5.2/node_modules/vite-plugin-inspect/dist/index.mjs";
var vite_config_default = defineConfig({
  optimizeDeps: {
    // exclude: [
    //   // 'vitepress',
    //   // '@vue/repl',
    // ],
    include: [
      "lz-string",
      "shiki-magic-move/vue",
      "nanoid",
      "unified",
      "remark-parse",
      "remark-rehype",
      "rehype-stringify",
      "hastscript",
      "unist-util-visit",
      "ofetch",
      "shiki",
      "mermaid",
      "@shikijs/transformers",
      "hast-util-to-html",
      "hast-util-from-html",
      "@vue/repl",
      "@vue/repl/monaco-editor",
      "filesize"
    ]
  },
  ssr: {
    noExternal: ["@vue/repl"]
  },
  server: {
    hmr: {
      overlay: false
    }
  },
  plugins: [
    Inspect(),
    UnoCSS(),
    Components({
      dirs: [
        ".vitepress/theme/components"
      ],
      include: [
        /\.vue$/,
        /\.vue\?vue/,
        /\.md$/
      ],
      resolvers: [
        IconsResolver({
          componentPrefix: ""
        })
      ]
    }),
    Icons({
      defaultClass: "inline",
      defaultStyle: "vertical-align: sub;"
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcGV0ZXJyb2UvRGVza3RvcC92c2NvZGUvaS91bi9kb2NzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvcGV0ZXJyb2UvRGVza3RvcC92c2NvZGUvaS91bi9kb2NzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9wZXRlcnJvZS9EZXNrdG9wL3ZzY29kZS9pL3VuL2RvY3Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJ1xuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IEluc3BlY3QgZnJvbSAndml0ZS1wbHVnaW4taW5zcGVjdCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgLy8gZXhjbHVkZTogW1xuICAgIC8vICAgLy8gJ3ZpdGVwcmVzcycsXG4gICAgLy8gICAvLyAnQHZ1ZS9yZXBsJyxcbiAgICAvLyBdLFxuICAgIGluY2x1ZGU6IFtcbiAgICAgICdsei1zdHJpbmcnLFxuICAgICAgJ3NoaWtpLW1hZ2ljLW1vdmUvdnVlJyxcbiAgICAgICduYW5vaWQnLFxuICAgICAgJ3VuaWZpZWQnLFxuICAgICAgJ3JlbWFyay1wYXJzZScsXG4gICAgICAncmVtYXJrLXJlaHlwZScsXG4gICAgICAncmVoeXBlLXN0cmluZ2lmeScsXG4gICAgICAnaGFzdHNjcmlwdCcsXG4gICAgICAndW5pc3QtdXRpbC12aXNpdCcsXG4gICAgICAnb2ZldGNoJyxcbiAgICAgICdzaGlraScsXG4gICAgICAnbWVybWFpZCcsXG4gICAgICAnQHNoaWtpanMvdHJhbnNmb3JtZXJzJyxcbiAgICAgICdoYXN0LXV0aWwtdG8taHRtbCcsXG4gICAgICAnaGFzdC11dGlsLWZyb20taHRtbCcsXG4gICAgICAnQHZ1ZS9yZXBsJyxcbiAgICAgICdAdnVlL3JlcGwvbW9uYWNvLWVkaXRvcicsXG4gICAgICAnZmlsZXNpemUnXG4gICAgXVxuICB9LFxuICBzc3I6IHtcbiAgICBub0V4dGVybmFsOiBbJ0B2dWUvcmVwbCddLFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBobXI6IHtcbiAgICAgIG92ZXJsYXk6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBJbnNwZWN0KCksXG4gICAgVW5vQ1NTKCksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICBkaXJzOiBbXG4gICAgICAgICcudml0ZXByZXNzL3RoZW1lL2NvbXBvbmVudHMnLFxuICAgICAgXSxcbiAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgL1xcLnZ1ZSQvLFxuICAgICAgICAvXFwudnVlXFw/dnVlLyxcbiAgICAgICAgL1xcLm1kJC8sXG4gICAgICBdLFxuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICAgIGNvbXBvbmVudFByZWZpeDogJycsXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICB9KSxcbiAgICBJY29ucyh7XG4gICAgICBkZWZhdWx0Q2xhc3M6ICdpbmxpbmUnLFxuICAgICAgZGVmYXVsdFN0eWxlOiAndmVydGljYWwtYWxpZ246IHN1YjsnLFxuICAgIH0pLFxuICBdLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFMsU0FBUyxvQkFBb0I7QUFDdlUsT0FBTyxZQUFZO0FBQ25CLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGFBQWE7QUFFcEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFLWixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILFlBQVksQ0FBQyxXQUFXO0FBQUEsRUFDMUI7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxJQUNYO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBLFFBQ0o7QUFBQSxNQUNGO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsV0FBVztBQUFBLFFBQ1QsY0FBYztBQUFBLFVBQ1osaUJBQWlCO0FBQUEsUUFDbkIsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxNQUNKLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxJQUNoQixDQUFDO0FBQUEsRUFDSDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
