import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite configuration — Tailwind is loaded as a Vite plugin (v4 approach)
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Handles all Tailwind processing automatically
  ],
})
