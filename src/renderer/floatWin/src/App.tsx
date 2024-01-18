import React, { useEffect, useRef, useState } from "react";
import "./app.less";
import RenderOcrResult from "./components/RenderOrcResult";
import { useElectronDrag } from "../../hooks/useElectronDrag";
interface IOcrResult {
  box: number[][];
  score: number;
  text: string;
}

function App() {
  const [base64, setBase64] = useState<string>("");
  const [ocrResult, setOcrResult] = useState<IOcrResult[]>([]);
  const domRef = useRef<HTMLDivElement>(null);

  useElectronDrag();

  const init = async () => {
    setTimeout(() => {
      setBase64(window.injectData.base64);
    }, 50);
  };

  const addContentMenu = (e) => {
    console.log("addContentMenu");
    if (e.button === 2) {
      e.preventDefault();
      window.electron.ipcRenderer.send("context-menu");
    }
  };
  useEffect(() => {
    init();
    // window.addEventListener("contextmenu", addContentMenu);
    window.addEventListener("mouse", addContentMenu);
    domRef.current?.addEventListener("mouse", addContentMenu);

    window.electron.ipcRenderer.on("ocr-base64", async (e) => {
      const res = await e.sender.invoke(
        "ocr-base64-reply",
        window.injectData.base64
      );
      setOcrResult(res.data);
      console.log(res);
    });

    // return () => {
    //   window.removeEventListener("contextmenu", addContentMenu);
    // };
  }, []);
  return (
    <div className="float-win">
      {base64 && <img src={base64} width="100%" height="100%" />}
      {ocrResult?.length > 0 && <RenderOcrResult data={ocrResult} />}
    </div>
  );
}

export default App;
