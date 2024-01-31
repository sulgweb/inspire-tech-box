import React, { useEffect, useState } from "react";
import { Select } from "antd";

const fontSizeOptions = [
  { value: "auto", label: "自动" },
  { value: "8px", label: "8px" },
  { value: "10px", label: "10px" },
  { value: "12px", label: "12px" },
  { value: "14px", label: "14px" },
  { value: "16px", label: "16px" },
  { value: "18px", label: "18px" },
  { value: "20px", label: "20px" },
  { value: "22px", label: "22px" },
  { value: "24px", label: "24px" },
  { value: "26px", label: "26px" },
  { value: "28px", label: "28px" },
  { value: "30px", label: "30px" },
  { value: "32px", label: "32px" },
];

export default function Setting() {
  const [fontSize, setFontSize] = useState(fontSizeOptions[0].value);
  const init = async () => {
    // 获取当前设置
    const fontSize = await window.api.getStore("ocrFontSize");
    console.log(fontSize);
    // 设置默认值
    if (fontSize) {
      setFontSize(fontSize);
    }
  };
  useEffect(() => {
    init();
  }, []);

  const onSizeChange = (size: string) => {
    setFontSize(size);
    window.api.setStore("ocrFontSize", size);
  };
  return (
    <div className="setting">
      <div>设置</div>
      <Select
        style={{ width: 120 }}
        value={fontSize}
        options={fontSizeOptions}
        onChange={onSizeChange}
      ></Select>
    </div>
  );
}
