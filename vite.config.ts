import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import path from 'path'
import { VueRouterAutoImports } from 'unplugin-vue-router'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    //
    VueRouter(),
    vue(),
    Components({
      dts: true,
      extensions: ['vue', 'ts'],
      dirs: ['src/components'],
    }),
    AutoImport({
      dts: true,
      imports: [VueRouterAutoImports, 'vue', '@vueuse/core', '@vueuse/head'],
      dirs: ['src/composable', 'src/constants', 'src/helpers'],
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
