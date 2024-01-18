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
    const sources = await desktopCapturer
      .getSources({
        types: ["screen"],
        thumbnailSize: { width: captureWidth, height: captureHeight },
      })
      .then((sources) => {
        return sources;
      })
      .catch((error) => {
        console.error("获取桌面截图失败:", error);
      });

    const curSource = sources?.find(
      (item) => Number(item.display_id) === display.id
    );
    const allWin = BrowserWindow.getAllWindows();
    allWin.map((item) => {
      if (item["tag"] === "captureWin") {
        if (isWindowInScreen(item, display)) {
          item.webContents.send("screenshot", [curSource]);
          item.show();
        } else {
          item.hide();
        }
      }
    });
  });
};

// 判断窗口是否在指定屏幕中
function isWindowInScreen(window, targetScreen) {
  const windowBounds = window.getBounds();
  const targetBounds = targetScreen.bounds;

  return (
    windowBounds.x >= targetBounds.x &&
    windowBounds.x + windowBounds.width - 1 <=
      targetBounds.x + targetBounds.width &&
    windowBounds.y >= targetBounds.y &&
    windowBounds.y + windowBounds.height <= targetBounds.y + targetBounds.height
  );
}
