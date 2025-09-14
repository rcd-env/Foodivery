import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./index.css";
import HomePage from "./pages/home/HomePage";
import UserRegister from "./pages/register/UserRegister";
import NotFoundPage from "./pages/NotFoundPage";
import PartnerRegister from "./pages/register/PartnerRegister";
import PartnerLogin from "./pages/login/PartnerLogin";
import UserLogin from "./pages/login/UserLogin";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Dashboard from "./pages/partner/Dashboard";
import CreateFood from "./pages/partner/CreateFood";

createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/food-partner/register" element={<PartnerRegister />} />
      <Route path="/food-partner/login" element={<PartnerLogin />} />
      <Route path="/food-partner/dashboard" element={<Dashboard />} />
      <Route path="/food-partner/create" element={<CreateFood />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);
