import { globalShortcut, BrowserWindow } from "electron";

export const Escape = () => {
  globalShortcut.register("Escape", () => {
    console.log("Escape is pressed");
    const allWin = BrowserWindow.getAllWindows();
    allWin.forEach((win) => {
      if (win["tag"] === "captureWin") {
        win.hide();
      }
    });
  });
};
