import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: 'one-ring-log',
    plugins: [react()],
    define: {
      'process.env': JSON.stringify(env)
    },
  }
})
