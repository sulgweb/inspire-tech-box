import React from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Setting = lazy(() => import("@home/pages/Setting"));
const Home = lazy(() => import("@home/pages/Home"));

export default function BaseRouter() {
  return (
    <BrowserRouter basename="home/index.html">
      <Suspense fallback={<div>loading</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
