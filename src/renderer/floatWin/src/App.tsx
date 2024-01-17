import React, { useEffect, useState } from "react";
import "./app.less";

function App() {
  const [base64, setBase64] = useState<string>("");
  const init = async () => {
    setTimeout(() => {
      console.log("init", window?.injectData?.base64);
      setBase64(window.injectData.base64);
    }, 50);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="float-win">
      <img src={base64} width="100%" height="100%" />
    </div>
  );
}

export default App;
