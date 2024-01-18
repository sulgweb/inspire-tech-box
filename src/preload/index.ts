import { contextBridge, BrowserWindow, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

// Custom APIs for renderer
const api = {
  createWin: (params) => {
    ipcRenderer.send("create-win", params);
  },
  hideWin: () => {
    ipcRenderer.send("hide-win");
  },
  dragWin: (data) => {
    ipcRenderer.send("drag-win", data);
  },
  getWinPosition: async () => {
    return await ipcRenderer.invoke("get-win-position");
  },
  closeWin: () => {
    ipcRenderer.send("close-win");
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
