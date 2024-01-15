import {
  globalShortcut,
  desktopCapturer,
  screen,
  BrowserWindow,
} from "electron";

export const captureScreen = async () => {
  globalShortcut.register("F4", async () => {
    console.log("F4 is pressed");
    // 获取屏幕信息
    const res = screen.getCursorScreenPoint();
    const display = screen.getDisplayNearestPoint(res);
    const { scaleFactor } = display;
    const { width, height } = display.bounds;
    const captureWidth = Math.floor(width * scaleFactor);
    const captureHeight = Math.floor(height * scaleFactor);

    // 获取桌面截图
    desktopCapturer
      .getSources({
        types: ["screen"],
        thumbnailSize: { width: captureWidth, height: captureHeight },
      })
      .then((sources) => {
        const allWin = BrowserWindow.getAllWindows();
        allWin.map((item) => {
          if (item["tag"] === "captureWin") {
            // console.log(item);
            const currentDisplay = screen.getDisplayMatching(item.getBounds());
            item.show();
            item.webContents.send("screenshot", [
              sources.find(
                (item) => Number(item.display_id) === currentDisplay.id
              ),
            ]);
          }
        });
      })
      .catch((error) => {
        console.error("获取桌面截图失败:", error);
      });
  });
};
