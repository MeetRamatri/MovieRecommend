import { defineConfig } from 'vite';
import terser from "@rollup/plugin-terser";


export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [terser()]
    }
  }
});
