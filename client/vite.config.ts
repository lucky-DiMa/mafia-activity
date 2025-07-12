import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['hostilely-conquering-whydah.cloudpub.ru','arduously-enriching-beta.cloudpub.ru', 'obsessively-concise-mayfly.cloudpub.ru', 'vainly-cherished-pomfret.cloudpub.ru'],
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/hmr': {
        target: 'ws://localhost:5173/', // Forward to real endpoint
        ws: true, // WebSocket support
        rewrite: (path) => path.replace(/^\/hmr/, '/.proxy/hmr'),
        changeOrigin: true,
        secure: false,
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    },
    hmr: {
      path: '/.proxy/hmr',
    }
  }
})
