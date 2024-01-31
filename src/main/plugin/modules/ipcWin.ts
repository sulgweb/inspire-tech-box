import { ipcMain, BrowserWindow } from "electron";
import { createWin } from "../../helper";

ipcMain.on("create-win", (e, data) => {
  createWin(data);
});

ipcMain.on("hide-win", (e, data) => {
  BrowserWindow.fromWebContents(e.sender)?.hide();
});

ipcMain.on("drag-win", (e, data) => {
  if (e?.sender && !isNaN(data.x) && !isNaN(data.y)) {
    BrowserWindow.fromWebContents(e.sender)?.setPosition(data.x, data.y);
  }
});

ipcMain.handle("get-win-position", (e, data) => {
  return BrowserWindow.fromWebContents(e.sender)?.getPosition();
});

ipcMain.on("close-win", (e, data) => {
  BrowserWindow.fromWebContents(e.sender)?.close();
});
