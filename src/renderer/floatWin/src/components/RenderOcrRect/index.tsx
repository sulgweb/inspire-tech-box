import React from "react";
import "./index.less";

interface IRenderOcrRectProps {
  coordinates: Number[][];
  text: string;
}

export default function RenderOcrRect(props: IRenderOcrRectProps) {
  const { coordinates, text } = props;
  console.log(coordinates, text);
  return (
    <span
      className="render-ocr-rect"
      style={{
        left: `${coordinates[0][0]}px`, // 左上角x坐标
        top: `${coordinates[0][1]}px`, // 左上角y坐标
        fontSize: `${(coordinates[3][1] as number) - (coordinates[0][1] as number)}px`,
      }}
    >
      {text}
    </span>
  );
}
