// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
//   root: './frontend',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});

//added this and vercel.json i also put main in frontend when it was in src when i had this web app in local.