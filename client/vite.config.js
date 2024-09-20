import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    '/api': {
      target: 'http://localhost:8000',  // Backend server
      changeOrigin: true,  // Ensure the 'Host' header is updated
      rewrite: (path) => path.replace(/^\/api/, '/api'),
    },
  },
})
