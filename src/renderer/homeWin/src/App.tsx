import React from "react";
import { useEffect } from "react";
import BaseRouter from "./router";
import "./app.less";

function App() {
  // const createFloatWindow = async () => {
  //   const floatWindow = new Window("test", {
  //     url: "/floatWindow",
  //     alwaysOnTop: true,
  //     decorations: false,
  //     transparent: true,
  //     resizable: false,
  //     maximizable: false,
  //     shadow: false,
  //     width: 100,
  //     height: 200,
  //   });
  // };

  const init = async () => {};
  useEffect(() => {
    init();
  }, []);
  return <BaseRouter />;
}

export default App;
