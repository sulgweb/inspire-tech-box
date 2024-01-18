import React from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Setting = lazy(() => import("@homeWin/pages/Setting"));
const Home = lazy(() => import("@homeWin/pages/Home"));

export default function BaseRouter() {
  return (
    <BrowserRouter basename="homeWin/index.html">
      <Suspense fallback={<div>loading</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
