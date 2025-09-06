import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./index.css";
import HomePage from "./pages/home/HomePage";
import UserRegister from "./pages/register/UserRegister";
import NotFoundPage from "./pages/NotFoundPage";

createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<div>User Login</div>} />
      <Route
        path="/food-partner/register"
        element={<div>Food Partner Register</div>}
      />
      <Route
        path="/food-partner/login"
        element={<div>Food Partner Login</div>}
      />
      <Route
        path="/food-partner/dashboard"
        element={<div>Food Partner Dashboard</div>}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);
