import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/samoed-taxi/',
  build: { assetsInlineLimit: 2048, cssCodeSplit: false },
});
