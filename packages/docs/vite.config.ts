import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@docs': path.resolve(__dirname, './src'),
      '🦄': path.resolve(__dirname, '../strawberry-farm/src'),
      '🦄/shared': path.resolve(__dirname, '../strawberry-farm/src/shared'),
    },
  },
  server: {
    port: 8888,
  },
});
