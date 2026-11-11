import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  // WSL doesn't deliver file events for the Windows drive (/mnt/d), so watch by polling
  server: { watch: { usePolling: true } },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    restoreMocks: true,
  },
})
