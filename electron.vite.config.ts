import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    // build: {
    //   rollupOptions: {
    //     input: {
    //       home: resolve(__dirname, "src/preload/index.ts"),
    //       captureWin: resolve(__dirname, "src/preload/index.ts"),
    //     },
    //   },
    // },
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          home: resolve(__dirname, "src/renderer/home/index.html"),
          captureWin: resolve(__dirname, "src/renderer/captureWin/index.html"),
          floatWin: resolve(__dirname, "src/renderer/floatWin/index.html"),
        },
      },
    },
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer"),
        "@home": resolve("src/renderer/home/src"),
        "@captureWin": resolve("src/renderer/captureWin/src"),
        "@floatWin": resolve("src/renderer/floatWin/src"),
      },
    },
    plugins: [react()],
  },
});
