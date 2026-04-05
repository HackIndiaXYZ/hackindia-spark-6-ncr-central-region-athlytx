import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      process: path.resolve(__dirname, 'node_modules/process/browser'),
      stream: path.resolve(__dirname, 'node_modules/stream-browserify'),
      zlib: path.resolve(__dirname, 'node_modules/browserify-zlib'),
      util: path.resolve(__dirname, 'node_modules/util'),
    }
  }
})
