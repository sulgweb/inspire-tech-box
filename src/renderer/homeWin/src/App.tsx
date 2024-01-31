import React from "react";
import { useEffect } from "react";
import BaseRouter from "./router";
import "./app.less";

function App() {
  const init = async () => {};
  useEffect(() => {
    init();
  }, []);
  return <BaseRouter />;
}

export default App;
