// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This allows access from other devices on the network
  },
  proxy: {
    "/goals": "http://127.0.0.1:5000",
  },
});
