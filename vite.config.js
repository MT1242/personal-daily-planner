import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Đổi base thành tên repository GitHub của bạn
export default defineConfig({
  plugins: [react()],
  base: '/personal-daily-planner/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          icons: ['lucide-react'],
        },
      },
    },
  },
})
