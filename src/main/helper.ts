import { BrowserWindow, screen, shell } from "electron";
import { join } from "path";
import { is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";

export function createCaptureWins(): void {
  let displays = screen.getAllDisplays();
  // Create the browser window.
  displays.map((item) => {
    const captureWin = new BrowserWindow({
      fullscreen: true,
      transparent: true,
      x: item.bounds.x,
      y: item.bounds.y,
      show: false,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        preload: join(__dirname, "../preload/captureWin.js"),
      },
    });
    captureWin["tag"] = "captureWin";
    if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
      captureWin.loadURL(
        `${process.env["ELECTRON_RENDERER_URL"]}/captureWin/index.html`
      );
    } else {
      captureWin.loadFile(join(__dirname, "../renderer/captureWin/index.html"));
    }
    captureWin.on("ready-to-show", () => {
      if (is.dev) {
        captureWin.webContents.openDevTools();
      }
    });
  });
}

export function createMainWin(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, "../preload/home.js"),
      sandbox: false,
      webSecurity: false,
    },
  });
  mainWindow["customId"] = "main";
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
    if (is.dev) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(
      `${process.env["ELECTRON_RENDERER_URL"]}/home/index.html`
    );
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/home/index.html"));
  }
}
