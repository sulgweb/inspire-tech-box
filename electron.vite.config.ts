import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          home: resolve(__dirname, "src/preload/home.ts"),
          captureWin: resolve(__dirname, "src/preload/captureWin.ts"),
        },
      },
    },
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          home: resolve(__dirname, "src/renderer/home/index.html"),
          captureWin: resolve(__dirname, "src/renderer/captureWin/index.html"),
        },
      },
    },
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src/pages"),
        "@home": resolve("src/renderer/home/src"),
        "@captureWin": resolve("src/renderer/captureWin/src"),
      },
    },
    plugins: [react()],
  },
});
