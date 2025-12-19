import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Memuat env file dari direktori saat ini.
  // Parameter ketiga '' memuat semua env (termasuk yang tidak berawalan VITE_)
  // Use type casting to avoid "Property 'cwd' does not exist on type 'Process'" error if node types are missing
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Polyfill process.env.API_KEY agar bisa dibaca di kode klien
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})