import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import HomePage from "./pages/home/HomePage";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<HomePage />} />
      <Route path="/login" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
);
