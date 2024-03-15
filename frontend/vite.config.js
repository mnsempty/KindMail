import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, //? note cambiado a 3000, 5173? are u ok vite??
    //todo with.env
    proxy: {
      //* note Redirige todas las solicitudes que comienzan con /backend a localhost:5000
      '/backend': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, '')
      }
    }
 }
})
