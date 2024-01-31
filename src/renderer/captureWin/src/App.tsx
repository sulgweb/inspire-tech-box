import React, { useEffect, useRef } from "react";
import "./app.less";
import ScreenShot from "js-web-screen-shot";

function App() {
  const screenShotRef = useRef<any>(null);
  const init = async () => {
    console.log(window.electron);
    window.electron.ipcRenderer.on("screenshot", async (event, res) => {
      const base64 = await res[0]?.thumbnail?.toDataURL();
      screenShotRef.current = new ScreenShot({
        enableWebRtc: false, // 启用webrtc
        level: 999,
        useRatioArrow: true, // 是否使用比例箭头
        imgSrc: base64,
        showScreenData: true,
        closeCallback: (e) => {
          console.log(e);
          window.api.hideWin();
        },
        cancelCallback: (e) => {
          console.log(e);
          window.api.hideWin();
        },
        completeCallback: (e) => {
          console.log(e);
          const dpr = window.devicePixelRatio || 1;
          window.api.createWin({
            config: {
              x: window.windowBounds?.x + e.cutInfo.startX,
              y: window.windowBounds?.y + e.cutInfo.startY,
              width: e.cutInfo.width * dpr,
              height: e.cutInfo.height * dpr,
              autoHideMenuBar: true,
              alwaysOnTop: true,
              frame: false,
              transparent: true,
              resizable: false,
            },
            url: "/floatWin/index.html",
            injectData: e,
          });
          window.api.hideWin();
          // window.electron.ipcRenderer.send("screenshot-recognize", e);
        },
      });
    });

    window.electron.ipcRenderer.on(
      "screenshot-recognize-result",
      async (event, res) => {
        console.log(res);
      }
    );
  };
  useEffect(() => {
    init();
    return () => {
      screenShotRef.current = null;
    };
  }, []);
  return <div className="capture-win" />;
}

export default App;
