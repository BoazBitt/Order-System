import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "@rollup/plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3000 },
  plugins: [
    react(),
    commonjs(), // Adding the commonjs plugin
  ],
});
