import React from "react";
import { useEffect } from "react";
import "./app.less";
import ScreenShot from "js-web-screen-shot/dist/screenShotPlugin.esm";

function App() {
  const screenShotRef = React.useRef<ScreenShot>(null);
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

          window.api.createWin({
            config: {
              x: window.windowBounds?.x + e.cutInfo.startX,
              y: window.windowBounds?.y + e.cutInfo.startY,
              width: e.cutInfo.width,
              height: e.cutInfo.height,
              autoHideMenuBar: true,
              frame: false,
              transparent: true,
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
  return <div className="capture-win">111</div>;
}

export default App;
