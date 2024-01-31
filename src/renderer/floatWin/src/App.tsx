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
  const imgRef = useRef<HTMLImageElement>(null);

  useElectronDrag(imgRef.current);

  const init = async () => {
    setTimeout(() => {
      setBase64(window.injectData.base64);
    }, 50);
  };
  useEffect(() => {
    init();
    window.electron.ipcRenderer.on("ocr-base64", async (e) => {
      const res = await e.sender.invoke(
        "ocr-base64-reply",
        window.injectData.base64
      );
      setOcrResult(res.data);
    });

    window.electron.ipcRenderer.on("ocr-translate", async (e, data) => {
      const res = await e.sender.invoke("ocr-translate-reply", {
        ...data,
        base64: window.injectData.base64,
      });
      console.log(res);
    });
  }, []);
  return (
    <div className="float-win">
      {base64 && <img ref={imgRef} src={base64} width="100%" height="100%" />}
      {ocrResult?.length > 0 && <RenderOcrResult data={ocrResult} />}
    </div>
  );
}

export default App;
