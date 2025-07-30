import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/sotherma-contracts/",
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
      "@lib": path.resolve(__dirname, "./app/lib"),
      "@components": path.resolve(__dirname, "./app/components"),
      "@pages": path.resolve(__dirname, "./app/pages"),
      "@hooks": path.resolve(__dirname, "./app/hooks"),
      "@data": path.resolve(__dirname, "./app/data"),
    },
  },
  optimizeDeps: {
    include: ["msw"],
  },
});
