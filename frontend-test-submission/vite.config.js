import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@log': path.resolve(__dirname, '../logging-middleware/log.js'),
    },
  },
})
