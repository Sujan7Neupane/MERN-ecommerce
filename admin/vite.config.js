import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    port: 5174,
    proxy: {
      "/api": {
        target:
          process.env.VITE_BACKEND_URL ||
          "https://nexbuy-backend.vercel.app/api/v1/admin/check-auth",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
