import { app, BrowserWindow, ipcMain } from "electron";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import { captureScreen } from "./plugin/captureScreen";
import { Escape } from "./plugin/Escape";
import "./plugin/paddleOCR";
import { createWin, createMainWin, createCaptureWins } from "./helper";

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
app.commandLine.appendSwitch("disable-web-security");
app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors"); // 允许跨域
app.commandLine.appendSwitch("--ignore-certificate-errors", "true"); // 忽略证书相关错误

app.whenReady().then(() => {
  electronApp.setAppUserModelId("com.electron");
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createMainWin();
  createCaptureWins();

  captureScreen();
  Escape();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createMainWin();
  });

  ipcMain.on("create-win", (e, data) => {
    createWin(data);
  });

  ipcMain.on("hide-win", (e, data) => {
    BrowserWindow.fromWebContents(e.sender)?.hide();
  });

  ipcMain.on("drag-win", (e, data) => {
    BrowserWindow.fromWebContents(e.sender)?.setPosition(data.x, data.y);
  });

  ipcMain.handle("get-win-position", (e, data) => {
    BrowserWindow.fromWebContents(e.sender)?.getPosition();
  });

  ipcMain.on("close-win", (e, data) => {
    BrowserWindow.fromWebContents(e.sender)?.close();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
