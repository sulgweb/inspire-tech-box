import ElectronStore from "electron-store";
import { ipcMain } from "electron";

const store = new ElectronStore();

ipcMain.on("set-store", (_, key, value) => {
  store.set(key, value);
});

ipcMain.handle("get-store", (_, key) => {
  return store.get(key);
});
