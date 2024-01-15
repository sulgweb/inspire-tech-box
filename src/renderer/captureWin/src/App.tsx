import React from "react";
import { useEffect } from "react";
import "./app.less";
import ScreenShot from "js-web-screen-shot/dist/screenShotPlugin.esm";

function App() {
  const init = async () => {
    console.log(window.electron);
    window.electron.ipcRenderer.on("screenshot", async (event, res) => {
      const base64 = await res[0]?.thumbnail?.toDataURL();
      new ScreenShot({
        enableWebRtc: false, // 启用webrtc
        level: 999,
        useRatioArrow: true, // 是否使用比例箭头
        imgSrc: base64,
        showScreenData: true,
        cancelCallback: (e) => {
          console.log(e);
        },
        completeCallback: (e) => {
          console.log(e);
          window.electron.ipcRenderer.send("screenshot-recognize", e);
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
  }, []);
  return <div className="capture-win">111</div>;
}

export default App;
