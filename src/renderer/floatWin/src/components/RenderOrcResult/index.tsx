import React from "react";
import "./index.less";
import RenderOcrRect from "../RenderOcrRect";

export default function RenderOcrResult(props) {
  const { data } = props;
  console.log("data", data);
  return (
    <div className="render-ocr-result">
      <div className="render-ocr-result-content">
        {data?.map((item, index) => (
          <RenderOcrRect key={index} text={item.text} coordinates={item.box} />
        ))}
      </div>
    </div>
  );
}
