import React, { useEffect, useState } from "react";
import "./index.less";

interface IRenderOcrRectProps {
  coordinates: Number[][];
  text: string;
}

export default function RenderOcrRect(props: IRenderOcrRectProps) {
  const { coordinates, text } = props;
  const [fontSize, setFontSize] = useState("auto");
  const init = async () => {
    const defaultFontSize = await window.api.getStore("ocrFontSize");
    if (defaultFontSize) {
      setFontSize(defaultFontSize);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <span
      className="render-ocr-rect"
      style={{
        left: `${coordinates[0][0]}px`, // 左上角x坐标
        top: `${coordinates[0][1]}px`, // 左上角y坐标
        fontSize:
          fontSize === "auto"
            ? `${(coordinates[3][1] as number) - (coordinates[0][1] as number) - 2}px`
            : fontSize,
      }}
    >
      {text}
    </span>
  );
}
