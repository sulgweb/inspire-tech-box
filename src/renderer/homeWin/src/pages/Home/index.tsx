import React from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import { ipcRenderer } from "electron";

function App() {
  const getScreenShot = async () => {};
  const navigate = useNavigate();

  const gotoSetting = () => {
    navigate("/setting");
  };

  useEffect(() => {
    window.electron.ipcRenderer.on("screenshot", (event, res) => {
      console.log(res);
      const stream = res[0];
      console.log(stream);
    });
  }, []);
  return (
    <div className="container">
      <div>test</div>
      <button onClick={getScreenShot}>截屏</button>
      <button onClick={gotoSetting}>goto setting</button>
    </div>
  );
}

export default App;
