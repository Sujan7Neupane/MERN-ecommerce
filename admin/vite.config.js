import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_BACKEND_URL,
        changeOrigin: true,
        secure: false,
      },
    },
    historyApiFallback: true,
  },
  plugins: [react(), tailwindcss()],
  port: 5174,
});
