import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/wp-json': {
        target: 'https://green-donkey-647181.hostingersite.com',
        changeOrigin: true,
        rewrite: (path) => path,
      }
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
