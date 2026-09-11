import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./auth/AuthProvider.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import AppLayout from "./components/AppLayout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import TemporaryProtectedPage from "./pages/TemporaryProtectedPage.jsx";
import ThemeProvider from "./theme/ThemeProvider.jsx";

export default function App() {
  return <ThemeProvider><BrowserRouter><AuthProvider><Routes><Route path="/" element={<Navigate to="/dashboard" replace />} /><Route path="/login" element={<LoginPage />} /><Route path="/register" element={<RegisterPage />} /><Route element={<ProtectedRoute />}><Route element={<AppLayout />}><Route path="/dashboard" element={<DashboardPage />} /><Route path="/tasks" element={<TemporaryProtectedPage />} /><Route path="/tasks/new" element={<TemporaryProtectedPage />} /><Route path="/tasks/:id/edit" element={<TemporaryProtectedPage />} /></Route></Route><Route path="*" element={<NotFoundPage />} /></Routes></AuthProvider></BrowserRouter></ThemeProvider>;
}
