import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  base: '',
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  plugins: [
    vue(),
  ],
})
